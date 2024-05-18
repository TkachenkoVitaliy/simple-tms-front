import React, { useCallback } from 'react'

import { observer } from 'mobx-react-lite'

import { PlayCircle } from '@mui/icons-material'
import { Button, Card, CardActions, Divider, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { TestRun, TestRunState } from 'entities/TestRun/model/types/testRun'
import { TestRunCasesList } from 'entities/TestRun/ui/TestRunCasesList'

import { classNames, toHHMMSS } from 'shared/lib/utils'
import { TMSCardContent } from 'shared/ui/TMSCardContent'

import styles from './TestRunCard.module.scss'

export interface TestRunCardProps {
  className?: string
  testRun: TestRun
}

export const TestRunCard = observer((props: TestRunCardProps) => {
  const { className, testRun } = props
  const navigate = useNavigate()

  const setStartCase = useCallback(
    (id: number) => {
      testRun.currentCaseId = id
    },
    [testRun],
  )

  return (
    <Card
      className={classNames(styles.card, {}, [className])}
      variant="elevation"
      raised
    >
      <TMSCardContent>
        <TextField
          value={testRun.name}
          label="Test Run"
        />
        <TextField
          value={testRun.testPlan.name}
          label="Test Plan"
        />
        <TextField
          value={toHHMMSS(testRun.timer)}
          label="Timer (HH:MM:SS)"
        />
        {testRun && (
          <>
            <Divider />
            <TestRunCasesList
              cases={testRun.cases}
              currentCaseId={testRun.currentCaseId}
              setStartCase={setStartCase}
            />
          </>
        )}
      </TMSCardContent>
      <CardActions className={styles.actions}>
        <Button
          disabled={
            testRun.state === TestRunState.COMPLETED || !testRun?.currentCaseId
          }
          size="large"
          variant="contained"
          color="success"
          onClick={() => {
            if (testRun.currentCaseId)
              navigate(testRun.currentCaseId.toString())
          }}
        >
          <PlayCircle sx={{ marginRight: '15px' }} />
          RUN
        </Button>
      </CardActions>
    </Card>
  )
})
