import { useCallback } from 'react'

import { observer } from 'mobx-react-lite'

import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import { TestPlan, TestPlanAPI } from 'entities/TestPlan'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { TMSTable } from 'shared/ui/TMSTable'
import { ColumnDefinition } from 'shared/ui/TMSTable/TMSTable'

import styles from './TestPlansTable.module.scss'

export const TestPlansTable = observer(() => {
  const { testPlanStore, testRunStore } = useProjectStores()
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
      align: 'center',
      headerName: 'test cases count',
      getCellText: (val: TestPlan[keyof TestPlan]) =>
        Array.isArray(val) ? val.length.toString() : '',
    },
    {
      field: 'id',
      align: 'center',
      headerName: 'action',
      customCell: (row) => (
        <Button
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5em',
            margin: 'auto',
          }}
          color="success"
          onClick={() => testRunStore.createTestRun(row.id, row.name)}
        >
          <Add />
          CREATE RUN
        </Button>
      ),
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
        onCreateNew={() => navigate('new')}
        onDeleteRow={(row) => testPlanStore.deletePlan(row.id)}
      />
    </div>
  )
})
