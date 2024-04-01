import { useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'

import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'

export interface TMSTableRowProps<T> {
  row: T
  isExpandable: boolean
  id: string | number
  columns: ColumnDefinition<T>[]
}

export function TMSTableRow<T>(props: TMSTableRowProps<T>) {
  const { row, isExpandable, id, columns } = props
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow>
        {isExpandable && (
          <TableCell>
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
            return (
              <TableCell
                align={c.align}
                key={c.headerName}
              >
                {c.getCellText
                  ? c.getCellText(row[c.field])
                  : String(row[c.field])}
              </TableCell>
            )
          })}
      </TableRow>
      {isExpandable && (
        <TableRow>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            Table
          </Collapse>
        </TableRow>
      )}
    </>
  )
}
