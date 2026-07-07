export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userName: string;
    roleId: number;
}

export interface SSOLoginRequest {
    token: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export const Role = {
    ADMIN: 1,
    SUPPORT_AGENT: 2,
    USER: 3,
} as const;

export type Role = typeof Role[keyof typeof Role];

export type Props = {
    allowedRoles?: number[];
};