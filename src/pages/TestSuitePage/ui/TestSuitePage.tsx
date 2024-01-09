import { observer } from 'mobx-react-lite'

import { useLocation, useParams } from 'react-router-dom'

import { TestSuiteForm } from 'entities/TestSuite'

import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestSuitePageProps {
  isNew?: boolean
}

function TestSuitePage(props: TestSuitePageProps) {
  const { isNew } = props
  const location = useLocation()
  const { testSuiteId } = useParams<RouteParams>()

  console.log(testSuiteId)

  return (
    <PageFrame>
      <TestSuiteForm
        testSuite={{
          id: 1,
          projectId: 33,
          parentSuiteId: null,
          name: 'TestSuiteTEST',
          description: '',
        }}
      />
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
