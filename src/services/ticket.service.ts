import { http } from "../api/http";
import type { PagedResponse } from "../models/common";
import type { CreateTicketRequest, DropdownOption, SubCategory, Ticket, TicketPageRequest, UpdateTicketRequest } from "../models/ticket";

export const getTickets = async (params: TicketPageRequest): Promise<PagedResponse<Ticket>> => {
    return http.post<PagedResponse<Ticket>>("/ticket/list", params);
};

export const getTicketById = async (id: string): Promise<Ticket> => {
    return http.get<Ticket>(`/ticket/${id}`);
};

export const createTicket = async (data: CreateTicketRequest): Promise<Ticket> => {
    return http.post<Ticket>("/ticket", data);
};

export const updateTicket = async (data: UpdateTicketRequest): Promise<Ticket> => {
    return http.put<Ticket>(`/ticket/${data.ticketId}`, data);
};

export const getCategories = async (): Promise<DropdownOption[]> => {
    return http.get<DropdownOption[]>("/ticket/category-list");
};

export const getSubCategories = async (): Promise<SubCategory[]> => {
    return http.get<SubCategory[]>("/ticket/sub-category-list");
};

export const getStatusList = async (): Promise<DropdownOption[]> => {
    return http.get<DropdownOption[]>("/ticket/status-list");
};

export const getPriorities = async (): Promise<DropdownOption[]> => {
    return http.get<DropdownOption[]>("/ticket/priority-list");
};
