export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors: string[] | null;
    statusCode: number;
    timestamp: string;
}

export interface PagedRequest {
    page: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
}

export interface LoadingState {
    loading: boolean;
}

export type ToastSeverity = "success" | "error" | "warning" | "info";

export interface ToastMessage {
    id: string;
    message: string;
    severity: ToastSeverity;
    duration?: number;
}

export interface ToastState {
    toasts: ToastMessage[];
}