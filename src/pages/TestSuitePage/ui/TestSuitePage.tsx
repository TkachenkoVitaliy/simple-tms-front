import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { Location } from 'history'
import { useLocation, useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { testNodeStore } from 'entities/TestNode'
import { TestSuiteForm } from 'entities/TestSuite'
import { testSuiteStore } from 'entities/TestSuite/model/store/testSuiteStore'

import { LocationState, RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestSuitePageProps {
  isNew?: boolean
}

function TestSuitePage(props: TestSuitePageProps) {
  const { isNew } = props
  const location = useLocation() as Location<LocationState>
  const { testSuiteId } = useParams<RouteParams>()

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

  // return (
  //   <PageFrame>
  //     {isNew ? (
  //       <div>{`NEW TEST SUITE PAGE - ${location.state?.parentId}`}</div>
  //     ) : (
  //       <div>{`TEST SUITE PAGE - ${location.state?.parentId}`}</div>
  //     )}
  //   </PageFrame>
  // )
}

export default observer(TestSuitePage)
