import { useCallback, useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { Location } from 'history'
import { useLocation, useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestCaseForm } from 'entities/TestCase'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { LocationState, RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestCasePageProps {
  isNew?: boolean
}

function TestCasePage(props: TestCasePageProps) {
  const { isNew } = props
  const { testCaseStore, testNodeStore } = useProjectStores()
  const location = useLocation() as Location<LocationState>
  const { testCaseId } = useParams<RouteParams>()

  useEffect(() => {
    if (isNew) {
      testCaseStore.setNewCase(location.state?.parentId)
    } else {
      testCaseStore.loadCase(Number(testCaseId))
    }
  }, [testCaseId, isNew, location.state])

  const key = useCallback(() => {
    return (
      testCaseStore.testCase.id.toString() +
      (testCaseStore.testCase.parentSuiteId?.toString() || 'null')
    )
  }, [testCaseStore.testCase])

  return (
    <PageFrame>
      {testCaseStore.isLoading || testNodeStore.isLoading ? (
        <PageLoader />
      ) : (
        <TestCaseForm
          testCase={testCaseStore.testCase}
          key={key()}
        />
      )}
    </PageFrame>
  )
}

export default observer(TestCasePage)
