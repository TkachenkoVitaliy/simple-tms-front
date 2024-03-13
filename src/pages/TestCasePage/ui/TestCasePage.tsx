import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { Location } from 'history'
import { useLocation, useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestCaseForm, testCaseStore } from 'entities/TestCase'
import { testNodeStore } from 'entities/TestNode'

import { LocationState, RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestCasePageProps {
  isNew?: boolean
}

function TestCasePage(props: TestCasePageProps) {
  const { isNew } = props
  const location = useLocation() as Location<LocationState>
  const { testCaseId } = useParams<RouteParams>()

  useEffect(() => {
    if (isNew) {
      testCaseStore.setNewCase(location.state?.parentId)
    } else {
      testCaseStore.loadCase(Number(testCaseId))
    }
  }, [testCaseId, isNew, location.state])

  return (
    <PageFrame>
      {testCaseStore.isLoading || testNodeStore.isLoading ? (
        <PageLoader />
      ) : (
        <TestCaseForm testCase={testCaseStore.testCase} />
      )}
    </PageFrame>
  )
}

export default observer(TestCasePage)
