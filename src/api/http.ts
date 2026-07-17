import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { api } from "./axios";
import type { BaseResponse } from "../models/common";
import { toast } from "../utils/toastHelper";

export const http = {
    async get<T>(url: string, config?: AxiosRequestConfig, showSuccess: boolean = false): Promise<T> {
        return request<T>(() => api.get<BaseResponse<T>>(url, config), showSuccess);
    },

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig, showSuccess: boolean = false): Promise<T> {
        return request<T>(() => api.post<BaseResponse<T>>(url, data, config), showSuccess);
    },

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig, showSuccess: boolean = false): Promise<T> {
        return request<T>(() => api.put<BaseResponse<T>>(url, data, config), showSuccess);
    },

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig, showSuccess: boolean = false): Promise<T> {
        return request<T>(() => api.patch<BaseResponse<T>>(url, data, config), showSuccess);
    },

    async delete<T>(url: string, config?: AxiosRequestConfig, showSuccess: boolean = false): Promise<T> {
        return request<T>(() => api.delete<BaseResponse<T>>(url, config), showSuccess);
    },
};

async function request<T>(apiCall: () => Promise<{ data: BaseResponse<T> }>, showSuccess: boolean): Promise<T> {
    try {
        const response = await apiCall();

        const result = response.data;

        if(showSuccess && result.success) {
            toast.success(result.message);
        }

        if (!result.success) {
            throw new Error(result.message);
        }

        if (result.data == null) {
            throw new Error("Server returned an empty response.");
        }

        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<BaseResponse<unknown>>;

            const message =
                axiosError.response?.data?.message ??
                axiosError.message ??
                "Something went wrong.";

            toast.error(message);
            throw new Error(message);
        }

        const message = error instanceof Error ? error.message : "Something went wrong.";
        toast.error(message);
        throw error;
    }
}