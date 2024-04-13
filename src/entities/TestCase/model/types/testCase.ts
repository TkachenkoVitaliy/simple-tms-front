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

export interface TestStepRepeatable extends TestStepAbstract {
  repeatable: true
  name: string
}

export type TestStep = TestStepNonRepeatable | TestStepRepeatable

export type NewTestStep = NewEntity<TestStep>

export interface TestCaseStep {
  orderNumber: number
  testStep: TestStep | NewTestStep
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

export type TestCaseShort = Omit<TestCase, 'preconditions' | 'testSteps'>

export type NewTestCase = NewEntity<TestCase>

// TODO: step возможно стоит вынести в отдельную entity
