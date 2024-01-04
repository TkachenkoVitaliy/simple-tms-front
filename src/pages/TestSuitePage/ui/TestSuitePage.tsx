import { observer } from 'mobx-react-lite'

import { useLocation, useParams } from 'react-router-dom'

import { RouteParams } from 'shared/types/router'

export interface TestSuitePageProps {
  isNew?: boolean
}

function TestSuitePage(props: TestSuitePageProps) {
  const { isNew } = props
  const location = useLocation()
  const params = useParams<RouteParams>()

  console.log(params)

  return <div>{`TEST SUITE PAGE - ${location.state?.parentId}. ${isNew}`}</div>
}

export default observer(TestSuitePage)
