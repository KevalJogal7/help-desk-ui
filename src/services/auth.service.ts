import { api } from "../services/axios";
import type { LoginRequest, LoginResponse, SSOLoginRequest } from "../models/auth";
import { authStorage } from "./storage.service";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>("/auth/login",request);

    authStorage.setAuth(response.data);
    return response.data;
};

export const ssoLogin = async (request: SSOLoginRequest): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>("/auth/sso-login", request);
    authStorage.setAuth(response.data);
    return response.data;
};