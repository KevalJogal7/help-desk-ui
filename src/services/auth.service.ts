import { http } from "../api/http";
import type { LoginRequest, LoginResponse, SSOLoginRequest } from "../models/auth";
import { authStorage } from "./storage.service";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {

    const response = await http.post<LoginResponse>("/auth/login",request);
    
    authStorage.setAuth(response);
    return response;
};

export const ssoLogin = async (request: SSOLoginRequest): Promise<LoginResponse> => {

    const response = await http.post<LoginResponse>("/auth/sso-login", request);
    authStorage.setAuth(response);
    return response;
};