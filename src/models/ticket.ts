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
  assignedToName: string | null;
  isEditable: boolean;
  canUpdateStatus: boolean;
  isDeleted: boolean;
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

export interface StatusUpdateRequest {
    ticketId: string;
    statusId: number;
}

export const TicketStatus = {
    NEW: 1,
    ASSIGNED: 2,
    IN_PROGRESS: 3,
    PENDING_CUSTOMER: 4,
    RESOLVED: 5,
    CLOSED: 6
} as const;

export type TicketStatus =
    typeof TicketStatus[keyof typeof TicketStatus];