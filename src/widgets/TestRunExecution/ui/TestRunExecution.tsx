import { useCallback } from 'react'

import { RunTestCase, TestRunState } from 'entities/TestRun/model/types/testRun'
import { RunStateIcon } from 'entities/TestRun/ui/RunStateIcon/RunStateIcon'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSStepper } from 'shared/ui/TMSStepper'

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
      />
    </div>
  )
}
