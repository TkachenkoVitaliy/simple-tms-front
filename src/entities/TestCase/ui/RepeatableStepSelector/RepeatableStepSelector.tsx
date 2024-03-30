import { useCallback, useState } from 'react'

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import { Button, Dialog, IconButton, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'

import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'

import { TMSDataGrid } from 'shared/ui/TMSDataGrid/TMSDataGrid'

export interface RepeatableStepSelectorProps {
  open: boolean
  onClose: () => void
}

export const RepeatableStepSelector = (props: RepeatableStepSelectorProps) => {
  const { open, onClose } = props
  const [data, setData] = useState<TestStepRepeatable[]>([
    {
      id: 66,
      name: 'Repeatable Step',
      repeatable: true,
      action: '3333',
      expected: '3333',
      projectId: 33,
    },
    {
      id: 67,
      name: 'Repeatable Step 2',
      repeatable: true,
      action: '3333',
      expected: '3333',
      projectId: 33,
    },
  ])

  const handleCloseEvent = (event: object, reason: string) => {
    onClose()
    // console.log(event)
    // console.log(reason)
  }

  const renderFunc = useCallback((item: TestStepRepeatable) => {
    return (
      <ListItem key={item.id}>
        <IconButton
          onClick={() => {
            console.log(item.id)
          }}
        >
          <ExpandCircleDownIcon />
        </IconButton>
        <Button
          sx={{ textAlign: 'start', justifyContent: 'flex-start' }}
          color="inherit"
          fullWidth
          onClick={() => {
            console.log('ITEM ', item.id)
          }}
        >
          <Typography>{item.name}</Typography>
        </Button>
      </ListItem>
    )
  }, [])

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={handleCloseEvent}
    >
      <TMSDataGrid />
    </Dialog>
  )
}
