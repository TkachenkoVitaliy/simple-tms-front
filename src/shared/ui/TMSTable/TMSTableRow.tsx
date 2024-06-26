import React, { useCallback, useState } from 'react'

import { Delete } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
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
  onSelect?: (row: T) => void
  onDelete?: (row: T) => void
}

export function TMSTableRow<T>(props: TMSTableRowProps<T>) {
  const {
    row,
    isExpandable,
    id,
    columns,
    selectColumnName,
    onSelect,
    onDelete,
  } = props
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
        return col.customCell(row)
      }
      if (col.displayType === 'collapse') {
        return col.getCellText
          ? col.getCellText(row[col.field])
          : String(row[col.field])
      }
      return selectColumnName === col.headerName ? (
        <Button
          fullWidth
          color="inherit"
          style={{ justifyContent: 'flex-start', paddingLeft: '20px' }}
          onClick={() => onSelect?.(row)}
        >
          {getCellTextValue(col)}
        </Button>
      ) : (
        getCellTextValue(col)
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
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {columns
          .filter((c) => c.displayType !== 'collapse')
          .map((c) => (
            <TableCell
              align={c.align}
              key={c.headerName}
            >
              {getCellElement(c)}
            </TableCell>
          ))}
        {onDelete && (
          <TableCell size="small">
            <IconButton
              color="error"
              onClick={() => onDelete(row)}
            >
              <Delete />
            </IconButton>
          </TableCell>
        )}
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
                      .map((c) => (
                        <TableCell
                          align={c.align}
                          key={c.headerName}
                        >
                          {getCellElement(c)}
                        </TableCell>
                      ))}
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
