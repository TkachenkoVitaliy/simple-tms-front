import React, { useCallback, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'

export interface TMSTableRowProps<T> {
  row: T
  isExpandable: boolean
  id: string | number
  columns: ColumnDefinition<T>[]
  selectColumnName?: string
}

export function TMSTableRow<T>(props: TMSTableRowProps<T>) {
  const { row, isExpandable, id, columns, selectColumnName } = props
  const [open, setOpen] = useState<boolean>(false)

  const getCellTextValue = useCallback(
    (col: ColumnDefinition<T>) => {
      return col.getCellText
        ? col.getCellText(row[col.field])
        : String(row[col.field])
    },
    [row, columns],
  )

  const getCellElement = useCallback(
    (col: ColumnDefinition<T>) => {
      if (col.customCell) {
        return (
          <TableCell
            align={col.align}
            key={col.headerName}
          >
            {col.customCell(row)}
          </TableCell>
        )
      }
      if (col.displayType === 'collapse') {
        return (
          <TableCell
            align={col.align}
            key={col.headerName}
          >
            {col.getCellText
              ? col.getCellText(row[col.field])
              : String(row[col.field])}
          </TableCell>
        )
      }
      return (
        <TableCell
          align={col.align}
          key={col.headerName}
        >
          {selectColumnName === col.headerName ? (
            <Button
              fullWidth
              color="inherit"
              style={{ justifyContent: 'flex-start' }}
            >
              {getCellTextValue(col)}
            </Button>
          ) : (
            getCellTextValue(col)
          )}
        </TableCell>
      )
    },
    [row, columns],
  )

  return (
    <>
      <TableRow>
        {isExpandable && (
          <TableCell size="small">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {columns
          .filter((c) => c.displayType !== 'collapse')
          .map((c) => {
            return getCellElement(c)
          })}
      </TableRow>
      {isExpandable && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columns
                      .filter((c) => c.displayType === 'collapse')
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
                  <TableRow>
                    {columns
                      .filter((c) => c.displayType === 'collapse')
                      .map((c) => {
                        return getCellElement(c)
                      })}
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
