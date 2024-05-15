import { List } from '@mui/material'

import { TestRun } from 'entities/TestRun/model/types/testRun'

export interface TestRunCasesListProps {
  cases: TestRun['cases']
}

export const TestRunCasesList = (props: TestRunCasesListProps) => {
  const { cases } = props

  return <List>{JSON.stringify(cases)}</List>
}
