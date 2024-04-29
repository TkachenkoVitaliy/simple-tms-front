import { NewEntity } from 'shared/types/api'

export interface TestPlan {
  id: number
  projectId?: number
  name: string
  description: string
  testCases: number[]
}

export type NewTestPlan = NewEntity<TestPlan>
