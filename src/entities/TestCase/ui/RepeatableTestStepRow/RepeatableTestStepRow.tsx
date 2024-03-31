import { useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material'

import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'
import { RepeatableTestStepDetails } from 'entities/TestCase/ui/RepeatableTestStepDetails/RepeatableTestStepDetails'

export interface RepeatableTestStepRowProps {
  row: TestStepRepeatable
}
export const RepeatableTestStepRow = (props: RepeatableTestStepRowProps) => {
  const { row } = props
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow
        sx={{ width: '100%', borderColor: 'white', border: '2px solid' }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ width: '100%' }}>
          <Button
            fullWidth
            color="inherit"
          >
            {row.name}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow sx={{ width: '100%' }}>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
        >
          <RepeatableTestStepDetails item={row} />
        </Collapse>
      </TableRow>
    </>
  )
}
