import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { ColumnDef, DataTableProps } from '../../models/dataTable'
import { PaginationBar, ScrollableTableContainer, StickyCell } from './DataTable.styles'

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
                    {col.label}
                  </StickyCell>
                ) : (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    className={col.headerClassName}
                    sx={{ fontWeight: 700, width: col.width, whiteSpace: 'nowrap' }}
                  >
                    {col.label}
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
              data.map((row) => (
                <TableRow key={rowKey(row)} hover>
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
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </StickyCell>
                  )}
                </TableRow>
              ))
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
