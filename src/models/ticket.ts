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
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: number;
  categoryId: number;
  subCategoryId: number;
}

export interface CreateTicketRequest extends TicketFormData {}

export interface UpdateTicketRequest extends TicketFormData {
  ticketId: string;
}

export interface TicketPageRequest {
  page: number;
  pageSize: number;
  search: string;
  category: number;
  subCategory: number;
  status: number;
  priority: number;
  sortBy: string;
  sortDirection: string;
}

export interface DropdownOption {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SubCategory extends DropdownOption {
  categoryId: number;
}
