import { ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { RunStateIcon } from 'entities/TestRun/ui/RunStateIcon/RunStateIcon'

import { toHHMMSS } from 'shared/lib/utils'

import { RunTestCase } from '../../model/types/testRun'

export interface TestRunCaseItemProps {
  runCase: RunTestCase
  selected: boolean
}

export const TestRunCaseItem = (props: TestRunCaseItemProps) => {
  const { runCase, selected } = props

  return (
    <ListItem
      secondaryAction={<div>{toHHMMSS(runCase.timer)}</div>}
      disablePadding
    >
      <ListItemButton selected={selected}>
        <ListItemIcon>
          <RunStateIcon state={runCase.state} />
        </ListItemIcon>
        <ListItemText
          primary={runCase.name}
          secondary={runCase.comment}
        />
      </ListItemButton>
    </ListItem>
  )
}
