import type { PagedRequest } from "./common";

export interface Ticket {
  ticketId: string;
  ticketNumber: string;
  title: string;
  description: string;
  createdBy: string;
  createdOn: string;
  priority: string;
  priorityId: number;
  statusId: number;
  status: string;
  category: string;
  categoryId: number;
  subCategory: string;
  subCategoryId: number;
  assignedTo: string | null;
  isEditable: boolean;
}

export interface UpsertTicketRequest {
  ticketId?: string | null;
  title: string;
  description: string;
  priorityId: number;
  categoryId: number;
  subCategoryId: number;
  statusId?: number;
  assignedTo?: string | null;
}

export interface TicketPageRequest extends PagedRequest {
  category: number;
  subCategory: number;
  status: number;
  priority: number;
}

export interface DropdownOption {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SubCategory extends DropdownOption {
  categoryId: number;
}

export interface TicketAssignRequest {
    ticketId: string;
    assignedTo: string;
}
