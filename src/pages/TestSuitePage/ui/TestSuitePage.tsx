import { observer } from 'mobx-react-lite'

import { useLocation } from 'react-router-dom'

export interface TestSuitePageProps {
  isNew?: boolean
}

function TestSuitePage(props: TestSuitePageProps) {
  const { isNew } = props
  const location = useLocation()

  return <div>{`TEST SUITE PAGE - ${location.state?.parentId}. ${isNew}`}</div>
}

export default observer(TestSuitePage)
