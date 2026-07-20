import { http } from '../api/http';
import type { DashboardResponse } from '../models/dashboard'

export const getDashboard = async (): Promise<DashboardResponse> => {
  return http.get<DashboardResponse>("/dashboard");
}
