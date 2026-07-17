import { http } from "../api/http";
import type { PagedResponse } from "../models/common";
import type { UpsertUserRequest, UserListRequest, UserResponse } from "../models/user";

export const getUsers = async (params: UserListRequest): Promise<PagedResponse<UserResponse>> => {
    return http.post<PagedResponse<UserResponse>>("/user/list", params);
};

export const getUserById = async (id: string): Promise<UserResponse> => {
    return http.get<UserResponse>(`/user/${id}`);
};

export const upsertUser = async (data: UpsertUserRequest): Promise<UserResponse> => {
    return http.post<UserResponse>("/user/upsert", data);
};

export const deleteUser = async (id: string): Promise<void> => {
    return http.delete<void>(`/user/delete/${id}`);
};

export const toggleStatus = async (id: string): Promise<void> => {
    return http.patch<void>(`/user/${id}/toggle-status`, undefined, undefined, true);
};
