import type { LoginResponse } from "../models/auth";

const STORAGE_KEY = "auth";

export const authStorage = {
    setAuth(data: LoginResponse): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    getAuth(): LoginResponse | null {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as LoginResponse;
    },

    clearAuth(): void {
        localStorage.removeItem(STORAGE_KEY);
    },

    getAccessToken(): string | null {
        return this.getAuth()?.accessToken ?? null;
    },

    getRefreshToken(): string | null {
        return this.getAuth()?.refreshToken ?? null;
    },

    getUserName(): string | null {
        return this.getAuth()?.userName ?? null;
    },

    getRoleId(): number | null {
        return this.getAuth()?.roleId ?? null;
    },

    isAuthenticated(): boolean {
        console.log("auth.....", this.getAccessToken())
        return !!this.getAccessToken();
    }
};