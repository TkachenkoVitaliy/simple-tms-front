import { useCallback } from 'react'

import { observer } from 'mobx-react-lite'

import { TestPlanAPI } from 'entities/TestPlan/api/testPlanApi'
import { TestPlan } from 'entities/TestPlan/model/types/testPlan'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSTable } from 'shared/ui/TMSTable'
import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'
import { projectStore } from 'entities/Project'

export const TestPlansTable = observer(() => {
  const { testPlanStore } = useProjectStores()

  const columns: ColumnDefinition<TestPlan>[] = [
    {
      field: 'name',
      headerName: 'name',
      // getCellText?: (val: T[keyof T]) => string
    },
    {
      field: 'description',
      headerName: 'description',
    },
    {
      field: 'testCases',
      headerName: 'test cases count',
      getCellText: (val: TestPlan[keyof TestPlan]) =>
        Array.isArray(val) ? val.length.toString() : '',
    },
  ]

  const getRowId = useCallback((row: TestPlan) => {
    return row.id
  }, [])

  const fetchPage = useCallback(
    async (page: number, pageSize: number) => {
      projectStore.setLoading(true)
      const response = await TestPlanAPI.getProjectPlansPage(
        testPlanStore.projectId,
        page,
        pageSize,
      )
      projectStore.setLoading(false)
      return response.data
    },
    [testPlanStore],
  )

  return (
    <TMSTable
      pageSize={10}
      columns={columns}
      getRowId={getRowId}
      loadData={fetchPage}
    />
  )
})
