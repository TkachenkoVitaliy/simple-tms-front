import { NewEntity } from 'shared/types/api'

enum CaseType {
  MANUAL = 'manual',
  AUTO = 'auto',
}

enum CasePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
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
