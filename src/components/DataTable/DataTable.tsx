import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { ColumnDef, DataTableProps } from '../../models/dataTable'
import { DisabledTableRow, PaginationBar, ScrollableTableContainer, StickyCell } from './DataTable.styles'
import { useState } from 'react'

function DataTable<T>({
  columns,
  data,
  rowKey,
  page,
  pageSize,
  showAction,
  totalCount,
  pageSizeOptions = [10, 25, 50],
  onPageChange,
  onPageSizeChange,
  emptyMessage = 'No data found',
  actions,
  sortBy,
  sortDescending,
  onSort,
  isRowDisabled,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hide)

  const getCellContent = (col: ColumnDef<T>, row: T) => {
    if (col.render) return col.render(row)
    const value = (row as any)[col.key]
    return value ?? ''
  }

  const renderCell = (col: ColumnDef<T>, row: T) => {
    const content = getCellContent(col, row)
    if (!col.tooltip) return content
    const tooltipTitle = typeof col.tooltip === 'function' ? col.tooltip(row) : String(content)
    return <Tooltip title={tooltipTitle}><span>{content}</span></Tooltip>
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    row: T
  ) => {
    if (actions && actions?.length > 0) {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <>
      <ScrollableTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) =>
                col.sticky ? (
                  <StickyCell
                    key={col.key}
                    align={col.align}
                    className={col.headerClassName}
                    sx={{ fontWeight: 700, width: col.width, whiteSpace: 'nowrap' }}
                  >
                    {col.sortable ? (
                    <TableSortLabel
                        active={sortBy === col.key}
                        direction={sortDescending ? "desc" : "asc"}
                        onClick={() =>onSort?.(col.key)}
                    >
                        {col.label + (sortDescending ? "desc" : "asc")}
                    </TableSortLabel>
                  ) : (
                      col.label
                  )}
                  </StickyCell>
                ) : (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    className={col.headerClassName}
                    sx={{ fontWeight: 700, width: col.width, whiteSpace: 'nowrap' }}
                  >
                    {col.sortable ? (
                      <TableSortLabel
                          active={sortBy === col.key}
                          direction={sortDescending ? "desc" : "asc"}
                          onClick={() =>onSort?.(col.key)}
                      >
                          {col.label}
                      </TableSortLabel>
                    ) : (
                        col.label
                    )}
                  </TableCell>
                )
              )}
              {showAction && <StickyCell sx={{ padding: 0 }} />}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + (showAction ? 1 : 0)} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => {
                const disabled = isRowDisabled?.(row) ?? false
                const RowComponent = disabled ? DisabledTableRow : TableRow
                return (
                  <RowComponent key={rowKey(row)} hover={!disabled}>
                    {visibleColumns.map((col) =>
                      col.sticky ? (
                        <StickyCell key={col.key} align={col.align} className={col.cellClassName}>
                          {renderCell(col, row)}
                        </StickyCell>
                      ) : (
                        <TableCell key={col.key} align={col.align} className={col.cellClassName}>
                          {renderCell(col, row)}
                        </TableCell>
                      )
                    )}
                    {showAction && (
                      <StickyCell sx={{ padding: 0 }}>
                        <IconButton
                          size="small"
                          disabled={disabled}
                          onClick={(e) => handleMenuOpen(e, row)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </StickyCell>
                    )}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      {selectedRow &&
                        actions
                          ?.filter((action) => !action.hidden?.(selectedRow))
                          .map((action) => (
                            <MenuItem
                              key={action.label}
                              disabled={action.disabled?.(selectedRow)}
                              onClick={() => {
                                action.onClick(selectedRow)
                                handleMenuClose()
                              }}
                              sx={{ minWidth: 180, py: 1, px: 1.5, gap: 1 }}
                            >
                              {action.icon && (
                                <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                                  {action.icon}
                                </ListItemIcon>
                              )}
                              <ListItemText primary={action.label} />
                            </MenuItem>
                          ))}
                    </Menu>
                  </RowComponent>
                )
              })
            )}
          </TableBody>
        </Table>
      </ScrollableTableContainer>

      <PaginationBar>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={pageSizeOptions}
          onPageChange={(_, p) => onPageChange(p)}
          onRowsPerPageChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
        />
      </PaginationBar>
    </>
  )
}

export default DataTable
