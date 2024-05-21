import { useCallback, useMemo } from 'react'

import { ExecutionActions } from 'features/ExecutionActions'

import { RunTestCase, TestRunState } from 'entities/TestRun/model/types/testRun'
import { RunStateIcon } from 'entities/TestRun/ui/RunStateIcon/RunStateIcon'
import { TestCaseExecution } from 'entities/TestRun/ui/TestCaseExecution'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSStepper } from 'shared/ui/TMSStepper'

import styles from './TestRunExecution.module.scss'

export const TestRunExecution = () => {
  const { testRunStore } = useProjectStores()
  const { testRun } = testRunStore

  if (testRun === null) {
    return null
  }

  const isCurrent = useCallback(
    (item: RunTestCase) => {
      return item.id === testRun.currentCaseId
    },
    [testRun.currentCaseId],
  )

  const getStatusText = useCallback(
    (items: RunTestCase[]) => {
      const currentCase = items.find((val) => val.id === testRun.currentCaseId)
      return currentCase ? `Current case: ${currentCase.name}` : ''
    },
    [testRun],
  )

  const currentCase = useMemo(() => {
    return testRun.cases.find((val) => val.id === testRun.currentCaseId)
  }, [testRun])

  const getItemComponent = (item: RunTestCase) => {
    if (isCurrent(item) || item.state === TestRunState.NOT_STARTED) {
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

  return (
    <div>
      <TMSStepper
        steps={testRun.cases}
        itemComponent={getItemComponent}
        getKey={(item) => item.id.toString()}
        isCurrent={isCurrent}
        statusText={getStatusText}
      />
      {currentCase && <TestCaseExecution testCase={currentCase} />}
      <ExecutionActions
        setStatus={(caseStatus, comment: string) =>
          console.log(caseStatus, comment)
        }
        comment={currentCase?.comment || ''}
        className={styles.actionsWrapper}
      />
    </div>
  )
}
