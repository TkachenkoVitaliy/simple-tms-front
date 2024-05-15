import { List } from '@mui/material'

import { TestRun } from 'entities/TestRun/model/types/testRun'
import { TestRunCaseItem } from 'entities/TestRun/ui/TestRunCaseItem/TestRunCaseItem'

import styles from './TestRunCasesList.module.scss'

export interface TestRunCasesListProps {
  cases: TestRun['cases']
}

export const TestRunCasesList = (props: TestRunCasesListProps) => {
  const { cases } = props

  return (
    <>
      <div style={{ marginTop: '10px', paddingLeft: '16px' }}>Cases</div>
      <List
        className={styles.list}
        style={{ marginTop: '10px' }}
      >
        {cases.map((runCase) => (
          <TestRunCaseItem runCase={runCase} />
        ))}
      </List>
    </>
  )
}
