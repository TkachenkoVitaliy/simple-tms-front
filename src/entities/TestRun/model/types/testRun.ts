export enum TestRunState {
  NOT_STARTED = 'NOT_STARTED',
  PAUSED = 'PAUSED',
  BLOCKED = 'BLOCKED',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
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

export interface RunTestCase {
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
  currentCaseId: number | null
}

export interface CreateTestRunRequest {
  testPlanId: number
  name: string
}
