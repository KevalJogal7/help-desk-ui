export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Ticket {
  ticketId: string;
  ticketNumber: string;
  title: string;
  description: string;
  createdBy: string;
  createdOn: string;
  priority: string;
  status: string;
  category: string;
  subCategory: string;
}

export interface TicketPageRequest {
    page: number;
    pageSize: number;
    search: string;
    category: number;
    subCategory: number;
    sortBy: string;
    sortDirection: string;
}

export interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SubCategory extends Category {
  categoryId: number;
}
