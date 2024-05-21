import { useState } from 'react'

import { Button, TextField } from '@mui/material'

import { TestRunState } from 'entities/TestRun/model/types/testRun'

import { classNames } from 'shared/lib/utils'

import styles from './ExecutionActions.module.scss'

export interface ExecutionActionsProps {
  setStatus: (newState: TestRunState | null, comment: string) => void
  comment: string
  className?: string
}

export const ExecutionActions = (props: ExecutionActionsProps) => {
  const { setStatus, comment, className } = props

  const [value, setValue] = useState<string>(comment)

  return (
    <div className={classNames('', {}, [className])}>
      <div className={styles.actions}>
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
            onClick={() => setStatus(TestRunState.COMPLETED, value)}
          >
            COMPLETED
          </Button>
          <Button
            color="error"
            variant="contained"
            size="large"
            onClick={() => setStatus(TestRunState.FAILED, value)}
          >
            FAILED
          </Button>
          <Button
            color="warning"
            variant="contained"
            size="large"
            onClick={() => setStatus(TestRunState.BLOCKED, value)}
          >
            BLOCKED
          </Button>
          <Button
            onClick={() => setStatus(TestRunState.PAUSED, value)}
            variant="contained"
            size="large"
            color="secondary"
          >
            PAUSE
          </Button>
          <Button
            onClick={() => setStatus(null, value)}
            size="large"
            variant="contained"
          >
            SKIP
          </Button>
        </div>
      </div>
      <div className={styles.comment}>
        <TextField
          label="comment"
          value={value || ' '}
          multiline
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
      </div>
    </div>
  )
}
