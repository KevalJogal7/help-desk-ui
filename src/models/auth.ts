export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userName: string;
    role: string;
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
    ADMIN: "ADMIN",
    SUPPORT_AGENT: "SUPPORT_AGENT",
    USER: "USER",
};

export type Props = {
    allowedRoles?: string[];
};