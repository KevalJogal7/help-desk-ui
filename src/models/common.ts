export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors: string[] | null;
    statusCode: number;
    timestamp: string;
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