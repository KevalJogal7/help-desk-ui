import { store } from "../store";
import { setLoading } from "../store/slices/loadingSlice";
import { api } from "./axios";
import { authStorage } from "../services/storage.service";

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
        (error) => {
            store.dispatch(setLoading(false));
            return Promise.reject(error);
        }
    );
};
