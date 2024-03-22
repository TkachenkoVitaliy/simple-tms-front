import { useCallback, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  List,
  Typography,
} from '@mui/material'

import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'

import { PageableList } from 'shared/ui/PageableList/PageableList'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

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
      open={open}
      onClose={handleCloseEvent}
    >
      <div
        style={{
          height: '80vh',
        }}
      >
        <PageableList
          data={data}
          getId={(item) => item.id}
          getLabel={(item) => item.name}
          itemRenderFunc={renderFunc}
        />
      </div>
    </Dialog>
  )
}
