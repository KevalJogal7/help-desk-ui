import type { PagedRequest } from "./common";

export interface UserResponse {
  userId: string;
  name: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  roleId: number;
  role: string;
}

export interface UserListRequest extends PagedRequest {
  role: number;
}

export interface UpsertUserRequest {
  userId?: string | null;
  name: string;
  email: string;
  password?: string | null;
  roleId: number;
  isActive: boolean;
}
