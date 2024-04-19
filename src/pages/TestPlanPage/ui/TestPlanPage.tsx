import { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestPlanForm } from 'entities/TestPlan'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { CheckboxTree } from 'shared/ui/CheckboxTree'
import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'
import { TestPlanNode } from 'entities/TestPlan/model/types/testPlanNode'
import { TestNodeAPI } from 'entities/TestNode/api/testNodeApi'
import { TestPlanNodeAPI } from 'entities/TestPlan/api/testPlanNodeApi'
import { TypeIcon } from 'entities/TestNode/ui/TypeIcon/TypeIcon'

export interface TestPlanPageProps {
  isNew?: boolean
}

interface TestItem {
  id: number
  name: string
  children?: TestItem[]
}

function TestPlanPage(props: TestPlanPageProps) {
  const { isNew } = props
  const { testPlanStore } = useProjectStores()
  const { testPlanId } = useParams<RouteParams>()
  const [data, setData] = useState<TestPlanNode[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const [expandState, setExpandState] = useState<
    'expanded' | 'collapsed' | undefined
  >('collapsed')

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

  // const testData: TestItem[] = [
  //   {
  //     id: 1,
  //     name: 'Item 1',
  //     children: [
  //       {
  //         id: 4,
  //         name: 'Item 4',
  //       },
  //       {
  //         id: 5,
  //         name: 'Item 5',
  //         children: [
  //           {
  //             id: 7,
  //             name: 'Item 7',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Item 2',
  //   },
  //   {
  //     id: 3,
  //     name: 'Item 3',
  //     children: [
  //       {
  //         id: 6,
  //         name: 'Item 6',
  //       },
  //     ],
  //   },
  // ]

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
          <div>
            <Button onClick={() => setExpandState('expanded')}>
              EXPAND ALL
            </Button>
            <Button onClick={() => setExpandState('collapsed')}>
              COLLAPSE ALL
            </Button>
          </div>
          <div style={{ width: '100%' }}>
            <CheckboxTree
              data={data}
              selected={selected}
              setSelected={setSelected}
              getId={(item) => item.type + item.id}
              getChildren={(item) => item.children}
              getLabel={(item) => item.name}
              getIcon={(item) => <TypeIcon type={item.type} />}
              forceState={expandState}
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
