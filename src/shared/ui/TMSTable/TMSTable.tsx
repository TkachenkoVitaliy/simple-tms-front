import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { GridAlignment } from '@mui/x-data-grid/models/colDef/gridColDef'

import { Page } from 'shared/types/api'
import { Spinner } from 'shared/ui/Spinner'
import { TMSTableRow } from 'shared/ui/TMSTable/TMSTableRow'

import styles from './TMSTable.module.scss'

export interface ColumnDefinition<T> {
  field: keyof T
  headerName: string
  align?: GridAlignment
  displayType?: 'main' | 'collapse'
  getCellText?: (val: T[keyof T]) => string
  customCell?: (row: T) => JSX.Element
}

export interface TMSTableProps<T> {
  pageSize: number
  columns: ColumnDefinition<T>[]
  loadData: (page: number, pageSize: number) => Promise<Page<T>>
  getRowId: (row: T) => string | number
  selectColumnName?: string
  onSelectRow?: (row: T) => void
  onCreateNew?: () => void
}

export function TMSTable<T>(props: TMSTableProps<T>) {
  const {
    pageSize,
    columns,
    loadData,
    getRowId,
    selectColumnName,
    onSelectRow,
    onCreateNew,
  } = props

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
    },
    [pageSize],
  )

  const isExpandable = useMemo(() => {
    return columns.some((col) => col.displayType === 'collapse')
  }, [])

  useEffect(() => {
    fetchRows(null, 0)
  }, [])

  const loader = () => {
    return (
      <Box
        className={styles.loaderBox}
        display="flex"
        alignItems="center"
      >
        <Spinner
          size={130}
          padding={10}
          className={styles.loader}
        />
      </Box>
    )
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {isExpandable ? (
                <TableCell
                  size="small"
                  style={{ width: '66px' }}
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
            {isLoading ? (
              <TableRow>
                {isExpandable ? (
                  <TableCell
                    size="small"
                    style={{ width: '66px' }}
                  />
                ) : null}
                <TableCell>{loader()}</TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TMSTableRow<T>
                  key={getRowId(r)}
                  row={r}
                  isExpandable={isExpandable}
                  id={getRowId(r)}
                  columns={columns}
                  selectColumnName={selectColumnName}
                  onSelect={onSelectRow}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {onCreateNew !== undefined ? (
        <TableFooter
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            sx={{ margin: '5px 0' }}
            variant="outlined"
            color="success"
            onClick={onCreateNew}
          >
            Create new plan
          </Button>
          <TablePagination
            component="div"
            count={total}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={fetchRows}
            rowsPerPageOptions={[pageSize]}
            disabled={isLoading}
          />
        </TableFooter>
      ) : (
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={fetchRows}
          rowsPerPageOptions={[pageSize]}
          disabled={isLoading}
        />
      )}
    </>
  )
}
