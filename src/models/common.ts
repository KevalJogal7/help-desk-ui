export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors: string[] | null;
    statusCode: number;
    timestamp: string;
}