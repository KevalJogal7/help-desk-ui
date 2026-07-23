import type { LoginResponse } from "../models/auth";

const KEY = "auth";

export const authStorage = {
    setAuth(data: LoginResponse, remember = false): void {
        const raw = JSON.stringify(data);
        if (remember) {
            localStorage.setItem(KEY, raw);
        } else {
            sessionStorage.setItem(KEY, raw);
        }
    },

    getAuth(): LoginResponse | null {
        const raw = sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY);
        if (!raw) return null;
        return JSON.parse(raw) as LoginResponse;
    },

    clearAuth(): void {
        sessionStorage.removeItem(KEY);
        localStorage.removeItem(KEY);
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

    getRole(): string | null {
        return this.getAuth()?.role ?? null;
    },

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
};
