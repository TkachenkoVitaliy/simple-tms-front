import { TestCaseShort } from 'entities/TestCase/model/types/testCase'

import { NewEntity } from 'shared/types/api'

export interface TestPlan {
  id: number
  projectId?: number
  name: string
  description: string
  testCases: TestCaseShort
}

export type NewTestPlan = NewEntity<TestPlan>
