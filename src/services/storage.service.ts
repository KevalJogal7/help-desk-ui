import type { LoginResponse } from "../models/auth";

const STORAGE_KEY = "auth";

export const authStorage = {
    setAuth(data: LoginResponse): void {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    getAuth(): LoginResponse | null {
        const data = sessionStorage.getItem(STORAGE_KEY);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as LoginResponse;
    },

    clearAuth(): void {
        sessionStorage.clear();
    },

    getAccessToken(): string | null {
        return this.getAuth()?.accessToken ?? null;
    },

    getRefreshToken(): string | null {
        return this.getAuth()?.refreshToken ?? null;
    },

    getUserName(): string | null {
        const name = this.getAuth()?.userName ?? null;
        return name;
    },

    getRole(): string | null {
        return this.getAuth()?.role ?? null;
    },

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
};