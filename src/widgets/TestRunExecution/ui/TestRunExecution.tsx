import { useCallback, useEffect, useMemo, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

import { ExecutionActions } from 'features/ExecutionActions'
import { ExecutionTimers } from 'features/ExecutionTimers'

import {
  RunStateIcon,
  RunTestCase,
  TestCaseExecution,
  TestRun,
  TestRunCaseState,
} from 'entities/TestRun'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSStepper } from 'shared/ui/TMSStepper'

import styles from './TestRunExecution.module.scss'

export const TestRunExecution = observer(() => {
  const { testRunStore } = useProjectStores()
  const { testRun } = testRunStore
  const navigate = useNavigate()

  const getInitTimer = (testRun: TestRun | null) => {
    if (testRun === null) {
      return 0
    }
    const { cases, currentCaseId } = testRun
    if (!cases || cases.length === 0) {
      return 0
    }
    const currentCase = cases.find((val) => val.id === currentCaseId)
    if (currentCase === undefined) {
      return 0
    }
    return currentCase.timer
  }
  const [timer, setTimer] = useState<number>(getInitTimer(testRun))

  if (testRun === null) {
    return null
  }

  const isCurrent = useCallback(
    (item: RunTestCase) => {
      return item.id === testRun.currentCaseId
    },
    [testRun.currentCaseId],
  )

  const currentCase = useMemo(() => {
    if (testRun.cases === undefined) {
      return undefined
    }
    return testRun.cases.find((val) => val.id === testRun.currentCaseId)
  }, [testRun])

  useEffect(() => {
    if (currentCase) {
      setTimer(currentCase.timer)
    }
  }, [currentCase, testRun.id, testRun.currentCaseId])

  const getItemComponent = (item: RunTestCase) => {
    if (isCurrent(item) || item.state === TestRunCaseState.NOT_STARTED) {
      return (
        <div
          style={{
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            textAlign: 'center',
          }}
        >
          {item.orderNumber.toString()}
        </div>
      )
    }
    return (
      <RunStateIcon
        state={item.state}
        style={{ display: 'block' }}
      />
    )
  }

  const updateTestCase = async (
    caseStatus: RunTestCase['state'] | null,
    comment: string,
    caseTimer: number,
  ) => {
    if (currentCase) {
      const newCase = {
        ...currentCase,
        state: caseStatus || currentCase.state,
        timer: caseTimer,
        comment,
      }
      await testRunStore.updateTestRunCase(testRun.id, newCase)
      if (caseStatus === TestRunCaseState.PAUSED) {
        navigate('..')
      } else {
        navigate(`../${testRunStore.testRun?.currentCaseId || ''}`)
      }
    }
  }

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        <TMSStepper
          steps={testRun.cases}
          itemComponent={getItemComponent}
          getKey={(item) => item.id.toString()}
          isCurrent={isCurrent}
        />
        <ExecutionTimers
          testRunTimer={testRun.timer}
          caseTimer={timer}
          setCaseTimer={setTimer}
        />
      </div>
      {currentCase && <TestCaseExecution testCase={currentCase} />}
      <div className="justEmptyForGrid" />
      <ExecutionActions
        setStatus={(caseStatus, comment: string) =>
          updateTestCase(caseStatus, comment, timer)
        }
        comment={currentCase?.comment || ''}
        className={styles.actionsWrapper}
      />
    </div>
  )
})
