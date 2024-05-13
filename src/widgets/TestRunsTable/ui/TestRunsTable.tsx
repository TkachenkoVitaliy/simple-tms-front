import {useCallback} from 'react'

import {observer} from 'mobx-react-lite'

import {useNavigate} from 'react-router-dom'

import {projectStore} from 'entities/Project'
import {TestRunAPI} from 'entities/TestRun'
import {TestRun, TestRunState} from 'entities/TestRun/model/types/testRun'

import {useProjectStores} from 'shared/lib/hooks/useProjectStores'
import {ColumnDefinition, TMSTable} from 'shared/ui/TMSTable/TMSTable'

import styles from './TestRunsTable.module.scss'
import {IconButton} from "@mui/material";
import {PlayArrow} from "@mui/icons-material";

export const TestRunsTable = observer(() => {
  const { testRunStore } = useProjectStores()
  const navigate = useNavigate()

  const columns: ColumnDefinition<TestRun>[] = [
    {
      field: 'id',
      headerName: ' ',
      customCell: (row) => (
          <IconButton
              color="success"
              disabled={row.state === TestRunState.COMPLETED}
              onClick={() => navigate(row.id)}
          >
            <PlayArrow/>
          </IconButton>
      )
    },
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
          : '0',
    },
    {
      field: 'cases',
      align: 'center',
      headerName: 'total cases',
      getCellText: (val: TestRun[keyof TestRun]) =>
        Array.isArray(val) ? val.length.toString() : '0',
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
        onDeleteRow={(row) => testRunStore.deleteTestRun(row.id)}
      />
    </div>
  )
})
