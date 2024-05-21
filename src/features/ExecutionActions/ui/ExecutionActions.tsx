import { Button, Divider } from '@mui/material'

import { TestRunState } from 'entities/TestRun/model/types/testRun'

import { classNames } from 'shared/lib/utils'

export interface ExecutionActionsProps {
  setStatus: (newState: TestRunState | null) => void
  className?: string
}

export const ExecutionActions = (props: ExecutionActionsProps) => {
  const { setStatus, className } = props

  return (
    <div className={classNames('', {}, [className])}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '700px',
          margin: 'auto',
        }}
      >
        <Button
          color="success"
          variant="contained"
          size="large"
          onClick={() => setStatus(TestRunState.COMPLETED)}
        >
          COMPLETED
        </Button>
        <Button
          color="error"
          variant="contained"
          size="large"
          onClick={() => setStatus(TestRunState.FAILED)}
        >
          FAILED
        </Button>
        <Button
          color="warning"
          variant="contained"
          size="large"
          onClick={() => setStatus(TestRunState.BLOCKED)}
        >
          BLOCKED
        </Button>
        <Button
          onClick={() => setStatus(TestRunState.PAUSED)}
          variant="contained"
          size="large"
        >
          PAUSE
        </Button>
        <Button
          onClick={() => setStatus(null)}
          size="large"
          variant="contained"
        >
          SKIP
        </Button>
      </div>
    </div>
  )
}
