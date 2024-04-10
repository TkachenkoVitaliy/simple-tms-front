import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { PageLoader } from 'widgets/PageLoader'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { PageFrame } from 'shared/ui/PageFrame'

const TestPlansPage = observer(() => {
  const { testPlanStore } = useProjectStores()

  useEffect(() => {
    testPlanStore.loadPlans()
  }, [])

  if (testPlanStore.isLoading) {
    return <PageLoader />
  }

  return (
    <PageFrame>
      <div>{JSON.stringify(testPlanStore.testPlans)}</div>
    </PageFrame>
  )
})

export default TestPlansPage
