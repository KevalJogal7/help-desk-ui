import { http } from "../api/http";
import type { ForgotPasswordRequest, LoginRequest, LoginResponse, ResetPasswordRequest, SSOLoginRequest } from "../models/auth";
import type { ChangePasswordRequest, ProfileResponse, UpdateProfileRequest } from "../models/profile";
import { authStorage } from "./storage.service";

export const login = async (request: LoginRequest, remember = false): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>("/auth/login", request);
    authStorage.setAuth(response, remember);
    return response;
};

export const ssoLogin = async (request: SSOLoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>("/auth/sso-login", request);
    authStorage.setAuth(response, false); // SSO never persists — tab-scoped only
    return response;
};

export const withRefreshToken = async (): Promise<LoginResponse> => {
   const refreshToken = authStorage.getRefreshToken();
    const response = await http.post<LoginResponse>("/auth/refresh-token", {refreshToken: refreshToken});
    authStorage.setAuth(response);
    return response;
};

export const forgotPassword = async (request: ForgotPasswordRequest): Promise<void> => {
    await http.post("/auth/forgot-password", request);
};

export const resetPassword = async (request: ResetPasswordRequest): Promise<void> => {
    await http.post("/auth/reset-password", request);
};

export const getProfile = async (): Promise<ProfileResponse> => {
  return http.get<ProfileResponse>('/auth/profile')
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
  return http.put<ProfileResponse>('/auth/update-profile', data, undefined, true)
}

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  return http.put<void>('/auth/change-password', data, undefined, true)
}