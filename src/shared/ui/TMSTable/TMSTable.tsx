import { useCallback, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { GridAlignment } from '@mui/x-data-grid/models/colDef/gridColDef'
import { AxiosResponse } from 'axios'

import { Page } from 'shared/types/api'

export interface ColumnDefinition<T> {
  field: keyof T
  headerName: string
  align?: GridAlignment
  displayType?: 'main' | 'collapse'
  getCellText?: (val: T[keyof T]) => string
}

export interface TMSTableProps<T> {
  pageSize: number
  columns: ColumnDefinition<T>[]
  loadData: (page: number, pageSize: number) => Promise<AxiosResponse<Page<T>>>
  getRowId: (row: T) => string | number
}

export function TMSTable<T>(props: TMSTableProps<T>) {
  const { pageSize, columns, loadData, getRowId } = props

  const [rows, setRows] = useState<T[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchRows = useCallback(
    async (_: unknown, newPage: number) => {
      setPage(newPage)
      setLoading(true)
      const { data } = await loadData(newPage, pageSize)
      setRows(data.data)
      setTotal(data.totalCount)
      setLoading(false)
    },
    [pageSize],
  )

  const createRow = useCallback(
    (rowItem: T) => {
      return (
        <TableRow key={getRowId(rowItem)}>
          {columns
            .filter((c) => c.displayType !== 'collapse')
            .map((c) => {
              return (
                <TableCell align={c.align}>
                  {c.getCellText
                    ? c.getCellText(rowItem[c.field])
                    : String(rowItem[c.field])}
                </TableCell>
              )
            })}
        </TableRow>
      )
    },
    [columns, getRowId],
  )

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns
                .filter((c) => c.displayType !== 'collapse')
                .map((c) => (
                  <TableCell align={c.align}>{c.headerName}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>{rows.map((r) => createRow(r))}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={total}
        page={page}
        rowsPerPage={pageSize}
        onPageChange={fetchRows}
      />
    </>
  )
}
