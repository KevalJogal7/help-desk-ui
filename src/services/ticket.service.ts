import { http } from "../api/http";
import type { PagedResponse } from "../models/common";
import type { DropdownOption, SubCategory, Ticket, TicketAssignRequest, TicketPageRequest, UpsertTicketRequest } from "../models/ticket";

export const getTickets = async (params: TicketPageRequest): Promise<PagedResponse<Ticket>> => {
    return http.post<PagedResponse<Ticket>>("/ticket/list", params);
};

export const getTicketById = async (id: string): Promise<Ticket> => {
    return http.get<Ticket>(`/ticket/${id}`);
};

export const upsertTicket = async (data: UpsertTicketRequest) => {
    http.post<Ticket>("/ticket/upsert", data);
};

export const deleteTicket = async (id: string) => {
    return http.delete<Ticket>(`/ticket/delete/${id}`);
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

export const assignTicket = async (data: TicketAssignRequest): Promise<void> => {
    return http.post<void>("/ticket/assign", data);
};
