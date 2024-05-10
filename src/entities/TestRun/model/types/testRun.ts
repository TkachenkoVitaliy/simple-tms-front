export enum TestRunState {
  NOT_STARTED,
  PAUSED,
  BLOCKED,
  FAILED,
  COMPLETED,
}

interface RunTestPlan {
  id: number
  name: string
}

interface RunTestCaseStep {
  id: number
  orderNumber: number
  name: string
  action: string
  expected: string
}

interface RunTestCase {
  id: number
  orderNumber: number
  name: string
  preconditions: string
  steps: RunTestCaseStep[]
  timer: number
  state: TestRunState
  comment: string
}

export interface TestRun {
  id: string
  name: string
  projectId: number
  testPlan: RunTestPlan
  cases: RunTestCase[]
  timer: number
  state: TestRunState
}

export interface CreateTestRunRequest {
  testPlanId: number
  name: string
}
