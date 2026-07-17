export interface ProfileResponse {
  userId: string
  name: string
  email: string
  role: string
  isActive: boolean
}

export interface UpdateProfileRequest {
  name: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
