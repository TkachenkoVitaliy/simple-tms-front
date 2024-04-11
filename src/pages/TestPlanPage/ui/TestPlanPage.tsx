import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'

export interface TestPlanPageProps {
  isNew?: boolean
}

function TestPlanPage(props: TestPlanPageProps) {
  const { isNew } = props
  const { testPlanStore } = useProjectStores()
  const { testPlanId } = useParams<RouteParams>()

  useEffect(() => {
    if (isNew) {
      testPlanStore.setNewPlan()
    } else {
      testPlanStore.loadPlan(Number(testPlanId))
    }
  }, [testPlanId, isNew])

  return (
    <PageFrame>
      {testPlanStore.isLoading ? <PageLoader /> : <div>testPlan</div>}
    </PageFrame>
  )
}

export default observer(TestPlanPage)
