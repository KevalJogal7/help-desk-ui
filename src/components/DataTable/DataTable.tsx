import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import './DataTable.css'
import type { ColumnDef, DataTableProps } from '../../models/dataTable'

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

  const handlePageChange = (_: unknown, newPage: number) => {
    onPageChange(newPage)
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(e.target.value, 10))
  }

  const getCellContent = (col: ColumnDef<T>, row: T) => {
    if (col.render) {
      return col.render(row)
    }

    const value = (row as any)[col.key]
    return value ?? ''
  }

  const renderCell = (col: ColumnDef<T>, row: T) => {
    const content = getCellContent(col, row)

    if (!col.tooltip) {
      return content
    }

    const tooltipTitle = typeof col.tooltip === 'function' ? col.tooltip(row) : String(content)

    return (
      <Tooltip title={tooltipTitle}>
        <span>{content}</span>
      </Tooltip>
    )
  }

  return (
    <>
      <TableContainer className="datatable-scroll">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align}
                  className={`${col.sticky ? 'col-sticky' : ''} ${col.headerClassName ?? ''}`}
                  sx={{
                    fontWeight: 700,
                    width: col.width,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {showAction && <TableCell className='col-sticky'></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={rowKey(row)} hover>
                  {visibleColumns.map((col) => (
                    <TableCell
                      key={col.key}
                      align={col.align}
                      className={`${col.sticky ? 'col-sticky' : ''} ${col.cellClassName ?? ''}`}
                    >
                      {renderCell(col, row)}
                    </TableCell>
                  ))}
                  {showAction && <TableCell className='col-sticky'>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="datatable-pagination">
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={pageSizeOptions}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
        />
      </div>
    </>
  )
}

export default DataTable
