import type { ReactNode } from "react"

export interface ColumnDef<T> {
  key: string;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
  tooltip?: boolean | ((row: T) => string);
  hide?: boolean;
  render?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
}

export interface TableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  hidden?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  page: number;
  pageSize: number;
  showAction: boolean;
  totalCount: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  emptyMessage?: string;
  actions?: TableAction<T>[];
  sortBy?: string;
  sortDescending?: boolean;
  onSort?: (field: string) => void;
}