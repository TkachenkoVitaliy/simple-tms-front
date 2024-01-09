import { NewEntity } from 'shared/types/api'

export interface TestSuite {
  id: number
  projectId?: number
  parentSuiteId: number | null
  name: string
  description: string
}

export type NewTestSuite = NewEntity<TestSuite>
