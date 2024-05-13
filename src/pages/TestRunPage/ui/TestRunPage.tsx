import { observer } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'

function TestRunPage() {
  const { testRunStore } = useProjectStores()
  const { testRunId } = useParams<RouteParams>()

  return <div>Test Run Page - {testRunId}</div>
}

export default observer(TestRunPage)
