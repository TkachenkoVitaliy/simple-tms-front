export interface TestStepAbstract {
  id: number | null
  action: string
  expected: string
}

export interface TestStepNonRepeatable extends TestStepAbstract {
  repeatable: false
  name: null
}

export interface TestStepRepeatable extends TestStepAbstract {
  repeatable: false
  name: string
}

export type TestStep = TestStepNonRepeatable | TestStepRepeatable

export interface TestCaseStep {
  orderNumber: number
  testStep: TestStep
}

export interface TestCase {
  parentSuiteId: number | null
  name: string
  preconditions: string | null
  testSteps: TestCaseStep[]
}

// TODO: step возможно стоит вынести в отдельную entity
