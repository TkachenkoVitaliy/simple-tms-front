import {
  CheckCircle,
  Error,
  NotStarted,
  PauseCircle,
  RemoveCircle,
} from '@mui/icons-material'

import { TestRunCaseState } from '../../model/types/testRun'

export interface RunStateIconProps {
  state: TestRunCaseState
  style?: React.CSSProperties
}

export const RunStateIcon = (props: RunStateIconProps) => {
  const { state, style } = props
  if (state === TestRunCaseState.NOT_STARTED) {
    return <NotStarted style={{ ...style }} />
  }
  if (state === TestRunCaseState.PAUSED) {
    return (
      <PauseCircle
        color="disabled"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunCaseState.BLOCKED) {
    return (
      <RemoveCircle
        color="warning"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunCaseState.FAILED) {
    return (
      <Error
        color="error"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunCaseState.COMPLETED) {
    return (
      <CheckCircle
        color="success"
        style={{ ...style }}
      />
    )
  }
  return null
}
