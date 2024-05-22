import { useCallback, useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

import { ExecutionActions } from 'features/ExecutionActions'

import { RunTestCase, TestRunState } from 'entities/TestRun/model/types/testRun'
import { RunStateIcon } from 'entities/TestRun/ui/RunStateIcon/RunStateIcon'
import { TestCaseExecution } from 'entities/TestRun/ui/TestCaseExecution'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSStepper } from 'shared/ui/TMSStepper'

import styles from './TestRunExecution.module.scss'

export const TestRunExecution = observer(() => {
  const { testRunStore } = useProjectStores()
  const { testRun } = testRunStore
  const navigate = useNavigate()

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
    if (testRun.cases === undefined) {
      return undefined
    }
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

  const updateTestCase = async (
    caseStatus: RunTestCase['state'] | null,
    comment: string,
  ) => {
    if (currentCase) {
      const newCase = {
        ...currentCase,
        state: caseStatus || currentCase.state,
        comment,
      }
      await testRunStore.updateTestRunCase(testRun.id, newCase)
      navigate(`../${testRunStore.testRun?.currentCaseId || ''}`)
    }
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
          updateTestCase(caseStatus, comment)
        }
        comment={currentCase?.comment || ''}
        className={styles.actionsWrapper}
      />
    </div>
  )
})
