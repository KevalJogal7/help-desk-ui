import { store } from "../store";
import { setLoading } from "../store/slices/loadingSlice";
import { api } from "./axios";
import { authStorage } from "../services/storage.service";
import { router } from "../routes/AppRoutes";
import { ROUTES } from "../routes/routeConstants";
import { withRefreshToken } from "../services/auth.service";

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const allowedUrls: Set<string> = new Set([
    "/auth/refresh-token",
    "/auth/login",
    "/auth/sso-login",
    "/auth/forgot-password",
    "/auth/reset-password"
])

const processQueue = (error: any, token?: string) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token!);
        }
    });

    failedQueue = [];
};

export const setupInterceptors = () => {
    api.interceptors.request.use((config) => {
        store.dispatch(setLoading(true));
        const token = authStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            store.dispatch(setLoading(false));
            return response;
        },
        async (error) => {
            store.dispatch(setLoading(false));

            const originalRequest = error.config;
            const status = error.response?.status;

            // Don't refresh if these endpoints fails
            if (
                status === 401 &&
                !originalRequest._retry &&
                !allowedUrls.has(originalRequest.url)
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                resolve(api(originalRequest));
                            },
                            reject,
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const response = await withRefreshToken();

                    const { accessToken } = response;

                    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

                    processQueue(null, accessToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);

                    authStorage.clearAuth();
                    router.navigate(ROUTES.LOGIN);

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            if (status === 403 && !allowedUrls.has(originalRequest.url)) {
                router.navigate(ROUTES.UNAUTHORIZED);
            }

            return Promise.reject(error);
        }
    );
};
