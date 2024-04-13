import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'
import { TestPlansTable } from 'widgets/TestPlansTable'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { PageFrame } from 'shared/ui/PageFrame'

const TestPlansPage = observer(() => {
  const { testPlanStore } = useProjectStores()

  return testPlanStore.isLoading ? (
    <PageLoader />
  ) : (
    <PageFrame>
      <TestPlansTable />
    </PageFrame>
  )
})

export default TestPlansPage
