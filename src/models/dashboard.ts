import type { Ticket } from './ticket'

export interface DashboardStats {
  totalTickets: number
  openTickets: number
  resolvedToday: number
  overdueTickets: number
}

export interface DashboardStatusCount {
  status: string
  count: number
}

export interface DashboardPriorityCount {
  priority: string
  count: number
}

export interface DashboardResponse {
  stats: DashboardStats
  statusBreakdown: DashboardStatusCount[]
  priorityBreakdown: DashboardPriorityCount[]
  highPriorityTickets: Ticket[]
  recentTickets: Ticket[]
}
