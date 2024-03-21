import { useState } from 'react'

import DraftsIcon from '@mui/icons-material/Drafts'
import InboxIcon from '@mui/icons-material/Inbox'
import { Dialog, DialogContent, List } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { TestStepRepeatable } from 'entities/TestCase/model/types/testCase'
import { PageableList } from 'shared/ui/PageableList/PageableList'

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
          itemsPerPage={10}
          onSelect={(id) => console.log(id)}
        />
      </div>
    </Dialog>
  )
}
