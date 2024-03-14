import { NewEntity } from 'shared/types/api'

export enum CaseType {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

export enum CasePriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
}

interface TestStepAbstract {
  id: number
  projectId?: number
  action: string
  expected: string
}

interface TestStepNonRepeatable extends TestStepAbstract {
  repeatable: false
  name: null
}

interface TestStepRepeatable extends TestStepAbstract {
  repeatable: true
  name: string
}

type TestStep = TestStepNonRepeatable | TestStepRepeatable

interface TestCaseStep {
  orderNumber: number
  testStep: TestStep
}

export interface TestCase {
  id: number
  projectId?: number
  parentSuiteId: number | null
  name: string
  type: CaseType
  priority: CasePriority
  preconditions: string
  testSteps: TestCaseStep[]
}

export type NewTestCase = NewEntity<TestCase>

// TODO: step возможно стоит вынести в отдельную entity
