import {
  CheckCircle,
  Error,
  NotStarted,
  PauseCircle,
  RemoveCircle,
} from '@mui/icons-material'

import { TestRunState } from '../../model/types/testRun'

export interface RunStateIconProps {
  state: TestRunState
}

export const RunStateIcon = (props: RunStateIconProps) => {
  const { state } = props
  if (state === TestRunState.NOT_STARTED) {
    return <NotStarted />
  }
  if (state === TestRunState.PAUSED) {
    return <PauseCircle color="disabled" />
  }
  if (state === TestRunState.BLOCKED) {
    return <RemoveCircle color="warning" />
  }
  if (state === TestRunState.FAILED) {
    return <Error color="error" />
  }
  if (state === TestRunState.COMPLETED) {
    return <CheckCircle color="success" />
  }
  return null
}
