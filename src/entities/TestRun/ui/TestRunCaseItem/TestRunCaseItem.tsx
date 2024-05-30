import { ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { toHHMMSS } from 'shared/lib/utils'

import { RunTestCase, TestRunCaseState } from '../../model/types/testRun'
import { RunStateIcon } from '../../ui/RunStateIcon'

export interface TestRunCaseItemProps {
  runCase: RunTestCase
  selected: boolean
  setStartCase: (id: number) => void
}

export const TestRunCaseItem = (props: TestRunCaseItemProps) => {
  const { runCase, selected, setStartCase } = props

  return (
    <ListItem
      secondaryAction={<div>{toHHMMSS(runCase.timer)}</div>}
      disablePadding
    >
      <ListItemButton
        selected={selected}
        disabled={runCase.state === TestRunCaseState.COMPLETED}
        onClick={() => setStartCase(runCase.id)}
      >
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
