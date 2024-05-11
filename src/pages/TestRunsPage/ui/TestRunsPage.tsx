import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'
import { TestRunsTable } from 'widgets/TestRunsTable/ui/TestRunsTable'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { PageFrame } from 'shared/ui/PageFrame'

const TestRunsPage = observer(() => {
  const { testRunStore } = useProjectStores()

  return testRunStore.isLoading ? (
    <PageLoader />
  ) : (
    <PageFrame>
      <TestRunsTable />
    </PageFrame>
  )
})

export default TestRunsPage
