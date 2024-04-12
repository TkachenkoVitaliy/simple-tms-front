import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { Location } from 'history'
import { useLocation, useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestSuiteForm } from 'entities/TestSuite'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { LocationState, RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestSuitePageProps {
  isNew?: boolean
}

function TestSuitePage(props: TestSuitePageProps) {
  const { isNew } = props
  const location = useLocation() as Location<LocationState>
  const { testSuiteId } = useParams<RouteParams>()
  const { testSuiteStore, testNodeStore } = useProjectStores()

  useEffect(() => {
    if (isNew) {
      testSuiteStore.setNewSuite(location.state?.parentId)
    } else {
      testSuiteStore.loadSuite(Number(testSuiteId))
    }
  }, [testSuiteId, isNew, location.state])

  return (
    <PageFrame>
      {testSuiteStore.isLoading || testNodeStore.isLoading ? (
        <PageLoader />
      ) : (
        <TestSuiteForm testSuite={testSuiteStore.testSuite} />
      )}
    </PageFrame>
  )
}

export default observer(TestSuitePage)
