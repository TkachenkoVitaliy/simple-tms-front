import React, { useCallback, useEffect, useMemo, useState } from 'react'

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

import { Page } from 'shared/types/api'
import { TMSTableRow } from 'shared/ui/TMSTable/TMSTableRow'

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
  // loadData: (page: number, pageSize: number) => Promise<AxiosResponse<Page<T>>>
  loadData: (page: number, pageSize: number) => Promise<Page<T>>
  getRowId: (row: T) => string | number
  selectColumnName?: string
}

export function TMSTable<T>(props: TMSTableProps<T>) {
  const { pageSize, columns, loadData, getRowId, selectColumnName } = props

  const [rows, setRows] = useState<T[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchRows = useCallback(
    async (_: unknown, newPage: number) => {
      setPage(newPage)
      setLoading(true)
      const { data, totalCount } = await loadData(newPage, pageSize)
      setRows(data)
      setTotal(totalCount)
      setLoading(false)
      // setPage(newPage)
      // setLoading(true)
      // const { data } = await loadData(newPage, pageSize)
      // setRows(data.data)
      // setTotal(data.totalCount)
      // setLoading(false)
    },
    [pageSize],
  )

  const isExpandable = useMemo(() => {
    return columns.some((col) => col.displayType === 'collapse')
  }, [])

  useEffect(() => {
    fetchRows(null, 0)
  }, [])

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {isExpandable ? (
                <TableCell
                  size="small"
                  style={{ width: '50px' }}
                />
              ) : null}
              {columns
                .filter((c) => c.displayType !== 'collapse')
                .map((c) => (
                  <TableCell
                    align={c.align}
                    key={c.headerName}
                  >
                    {c.headerName}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TMSTableRow<T>
                key={getRowId(r)}
                row={r}
                isExpandable={isExpandable}
                id={getRowId(r)}
                columns={columns}
                selectColumnName={selectColumnName}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={pageSize}
        onPageChange={fetchRows}
        rowsPerPageOptions={[pageSize]}
      />
    </>
  )
}
