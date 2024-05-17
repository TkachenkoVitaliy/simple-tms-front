import React, { useCallback, useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { PlayCircle } from '@mui/icons-material'
import { Button, Card, CardActions, Divider, TextField } from '@mui/material'

import { TestRun, TestRunState } from 'entities/TestRun/model/types/testRun'
import { TestRunCasesList } from 'entities/TestRun/ui/TestRunCasesList'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { classNames, toHHMMSS } from 'shared/lib/utils'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import styles from './TestRunCard.module.scss'

export interface TestRunCardProps {
  className?: string
  testRun: TestRun
}

export const TestRunCard = observer((props: TestRunCardProps) => {
  const { className, testRun } = props
  const { testRunStore } = useProjectStores()

  useEffect(() => {
    if (testRun.currentCaseId === null && testRun.cases.length > 0) {
      testRun.currentCaseId = testRun.cases[0].id
    }
  }, [testRun])

  const setStartCase = useCallback(
    (id: number) => {
      testRun.currentCaseId = id
    },
    [testRun],
  )

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={testRunStore.isLoading}
      width="50%"
    >
      <Card
        className={classNames(styles.card, {}, [className])}
        variant="elevation"
        raised
      >
        <TMSCardContent>
          <TextField
            value={testRunStore.testRun?.name}
            label="Test Run"
          />
          <TextField
            value={testRunStore.testRun?.testPlan.name}
            label="Test Plan"
          />
          <TextField
            value={toHHMMSS(
              testRunStore.testRun ? testRunStore.testRun.timer : 0,
            )}
            label="Timer (HH:MM:SS)"
          />
          {testRunStore.testRun && (
            <>
              <Divider />
              <TestRunCasesList
                cases={testRunStore.testRun.cases}
                currentCaseId={testRunStore.testRun.currentCaseId}
                setStartCase={setStartCase}
              />
            </>
          )}
        </TMSCardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={
              testRunStore.testRun?.state === TestRunState.COMPLETED ||
              !testRunStore.testRun?.currentCaseId
            }
            size="large"
            variant="contained"
            color="success"
          >
            <PlayCircle sx={{ marginRight: '15px' }} />
            RUN
          </Button>
        </CardActions>
      </Card>
    </TMSSkeleton>
  )
})
