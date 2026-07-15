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

