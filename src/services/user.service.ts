import { http } from "../api/http";
import type { PagedResponse } from "../models/common";
import type { UserListRequest, UserResponse } from "../models/user";

export const getUsers = async (params: UserListRequest): Promise<PagedResponse<UserResponse>> => {
    return http.post<PagedResponse<UserResponse>>("/user/list", params);
};

