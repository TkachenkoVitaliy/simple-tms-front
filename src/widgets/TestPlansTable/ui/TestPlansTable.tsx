import { useCallback } from 'react'

import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import { TestPlanAPI } from 'entities/TestPlan/api/testPlanApi'
import { TestPlan } from 'entities/TestPlan/model/types/testPlan'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSTable } from 'shared/ui/TMSTable'
import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'

import styles from './TestPlansTable.module.scss'

export const TestPlansTable = observer(() => {
  const { testPlanStore } = useProjectStores()
  const navigate = useNavigate()

  const columns: ColumnDefinition<TestPlan>[] = [
    {
      field: 'name',
      headerName: 'name',
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
    <div className={styles.wrapper}>
      <TMSTable
        pageSize={8}
        columns={columns}
        getRowId={getRowId}
        loadData={fetchPage}
        selectColumnName="name"
        onSelectRow={(row) => navigate(`${row.id}`)}
      />
    </div>
  )
})
