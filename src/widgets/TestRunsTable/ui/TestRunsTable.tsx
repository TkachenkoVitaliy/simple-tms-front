import { useCallback } from 'react'

import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import { TestRunAPI } from 'entities/TestRun'
import { TestRun, TestRunState } from 'entities/TestRun/model/types/testRun'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { ColumnDefinition, TMSTable } from 'shared/ui/TMSTable/TMSTable'

import styles from './TestRunsTable.module.scss'

export const TestRunsTable = observer(() => {
  const { testRunStore } = useProjectStores()
  const navigate = useNavigate()

  const columns: ColumnDefinition<TestRun>[] = [
    {
      field: 'name',
      headerName: 'name',
    },
    {
      field: 'state',
      headerName: 'state',
    },
    {
      field: 'timer',
      headerName: 'timer',
    },
    {
      field: 'cases',
      align: 'center',
      headerName: 'completed cases',
      getCellText: (val: TestRun[keyof TestRun]) =>
        Array.isArray(val)
          ? val
              .filter(
                (runTestCase) => runTestCase.state === TestRunState.COMPLETED,
              )
              .length.toString()
          : '',
    },
  ]

  const getRowId = useCallback((row: TestRun) => {
    return row.id
  }, [])

  const fetchPage = useCallback(
    async (page: number, pageSize: number) => {
      projectStore.setLoading(true)
      const response = await TestRunAPI.getProjectRunsPage(
        testRunStore.projectId,
        page,
        pageSize,
      )
      projectStore.setLoading(false)
      return response.data
    },
    [testRunStore],
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
