import { http } from "../api/http";
import type { PagedResponse } from "../models/common";
import type { Category, SubCategory, Ticket, TicketPageRequest } from "../models/ticket";

export const getTickets = async (params: TicketPageRequest): Promise<PagedResponse<Ticket>> => {
    return http.post<PagedResponse<Ticket>>("/ticket/list", params);
};

export const getCategories = async (): Promise<Category[]> => {
    return http.get<Category[]>("/ticket/category-list");
};

export const getSubCategories = async (): Promise<SubCategory[]> => {
    return http.get<SubCategory[]>("/ticket/sub-category-list");
};
