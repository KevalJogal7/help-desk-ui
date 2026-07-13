import type { ReactNode } from "react"

export interface ColumnDef<T> {
  key: string
  label: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sticky?: boolean
  tooltip?: boolean | ((row: T) => string)
  hide?: boolean
  render?: (row: T) => ReactNode
  headerClassName?: string
  cellClassName?: string
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  page: number
  pageSize: number
  showAction: boolean
  totalCount: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  emptyMessage?: string
}