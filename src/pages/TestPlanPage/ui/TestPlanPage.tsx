import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestPlanForm } from 'entities/TestPlan/ui/TestPlanForm/TestPlanForm'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

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

  return testPlanStore.isLoading ? (
    <PageLoader />
  ) : (
    <ResizableWrapper
      firstElement={
        <PageFrame>
          <TestPlanForm testPlan={testPlanStore.testPlan} />
        </PageFrame>
      }
      secondElement={
        <PageFrame>
          <div style={{ width: '100%' }}>TEST</div>
        </PageFrame>
      }
      secondElementWidth={{
        default: '70%',
        min: '45%',
        max: '80%',
      }}
    />
  )
}

export default observer(TestPlanPage)
