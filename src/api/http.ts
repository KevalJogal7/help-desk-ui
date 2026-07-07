import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { api } from "./axios";
import type { BaseResponse } from "../models/common";
import { toast } from "../utils/toastHelper";

export const http = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return request<T>(() => api.get<BaseResponse<T>>(url, config));
    },

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return request<T>(() => api.post<BaseResponse<T>>(url, data, config));
    },

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return request<T>(() => api.put<BaseResponse<T>>(url, data, config));
    },

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return request<T>(() => api.patch<BaseResponse<T>>(url, data, config));
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return request<T>(() => api.delete<BaseResponse<T>>(url, config));
    },
};

async function request<T>(apiCall: () => Promise<{ data: BaseResponse<T> }>): Promise<T> {
    try {
        const response = await apiCall();

        const result = response.data;

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