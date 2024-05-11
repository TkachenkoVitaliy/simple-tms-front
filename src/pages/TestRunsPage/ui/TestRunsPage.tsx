import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'

const TestRunsPage = observer(() => {
  const { testRunStore } = useProjectStores()

  return testRunStore.isLoading ? <PageLoader /> : <div>Test Runs Page</div>
})

export default TestRunsPage
