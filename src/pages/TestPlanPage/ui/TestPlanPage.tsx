import { useEffect, useMemo, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TypeIcon } from 'entities/TestNode/ui/TypeIcon/TypeIcon'
import { TestPlanForm } from 'entities/TestPlan'
import { TestPlanNodeAPI } from 'entities/TestPlan/api/testPlanNodeApi'
import { TestPlanNode } from 'entities/TestPlan/model/types/testPlanNode'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { CheckboxTree } from 'shared/ui/CheckboxTree'
import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

export interface TestPlanPageProps {
  isNew?: boolean
}

function TestPlanPage(props: TestPlanPageProps) {
  const { isNew } = props
  const { testPlanStore } = useProjectStores()
  const { testPlanId } = useParams<RouteParams>()
  const [data, setData] = useState<TestPlanNode[]>([])
  const [selected, setSelected] = useState<string[]>(['CASE26'])

  useEffect(() => {
    TestPlanNodeAPI.getProjectNodes(testPlanStore.projectId).then((res) =>
      setData(res.data),
    )
  }, [])

  useEffect(() => {
    if (isNew) {
      testPlanStore.setNewPlan()
    } else {
      testPlanStore.loadPlan(Number(testPlanId))
    }
  }, [testPlanId, isNew])

  useEffect(() => {
    const { testPlan } = testPlanStore
    const selectedIds = testPlan.testCases.map(
      (testCase) => `CASE${testCase.id}`,
    )
    console.log('!!!', selectedIds)
    setSelected(selectedIds)
  }, [testPlanStore.testPlan])

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
          <div style={{ width: '100%' }}>
            <CheckboxTree
              data={data}
              selected={selected}
              setSelected={(v) => {
                console.log('setSelected', v)
                setSelected(v)
              }}
              getId={(item) => item.type + item.id}
              getChildren={(item) => item.children}
              getLabel={(item) => item.name}
              getIcon={(item) => <TypeIcon type={item.type} />}
            />
          </div>
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
