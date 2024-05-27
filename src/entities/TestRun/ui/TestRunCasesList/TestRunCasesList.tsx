import { List } from '@mui/material'

import { TestRun } from '../../model/types/testRun'
import { TestRunCaseItem } from '../../ui/TestRunCaseItem'

import styles from './TestRunCasesList.module.scss'

export interface TestRunCasesListProps {
  cases: TestRun['cases']
  currentCaseId: number | null
  setStartCase: (id: number) => void
}

export const TestRunCasesList = (props: TestRunCasesListProps) => {
  const { cases, currentCaseId, setStartCase } = props

  return (
    <>
      <div style={{ marginTop: '10px', paddingLeft: '16px' }}>Cases</div>
      <List
        className={styles.list}
        style={{ marginTop: '10px' }}
      >
        {cases.map((runCase) => (
          <TestRunCaseItem
            key={runCase.id}
            runCase={runCase}
            selected={currentCaseId === runCase.id}
            setStartCase={setStartCase}
          />
        ))}
      </List>
    </>
  )
}
