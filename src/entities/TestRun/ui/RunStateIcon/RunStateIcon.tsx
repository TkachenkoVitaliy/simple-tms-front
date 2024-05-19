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
  style?: React.CSSProperties
}

export const RunStateIcon = (props: RunStateIconProps) => {
  const { state, style } = props
  if (state === TestRunState.NOT_STARTED) {
    return <NotStarted style={{ ...style }} />
  }
  if (state === TestRunState.PAUSED) {
    return (
      <PauseCircle
        color="disabled"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunState.BLOCKED) {
    return (
      <RemoveCircle
        color="warning"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunState.FAILED) {
    return (
      <Error
        color="error"
        style={{ ...style }}
      />
    )
  }
  if (state === TestRunState.COMPLETED) {
    return (
      <CheckCircle
        color="success"
        style={{ ...style }}
      />
    )
  }
  return null
}
