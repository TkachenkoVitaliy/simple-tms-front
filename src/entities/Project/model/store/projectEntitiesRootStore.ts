import { TestCaseStore } from 'entities/TestCase'
import { TestNodeStore } from 'entities/TestNode'
import { TestPlanStore } from 'entities/TestPlan'
import { TestRunStore } from 'entities/TestRun'
import { TestSuiteStore } from 'entities/TestSuite'

export class ProjectEntitiesRootStore {
  testNodeStore: TestNodeStore

  testCaseStore: TestCaseStore

  testSuiteStore: TestSuiteStore

  testPlanStore: TestPlanStore

  testRunStore: TestRunStore

  constructor(projectId: number) {
    this.testNodeStore = new TestNodeStore(projectId)
    this.testPlanStore = new TestPlanStore(projectId)
    this.testCaseStore = new TestCaseStore(projectId, this.testNodeStore)
    this.testSuiteStore = new TestSuiteStore(projectId, this.testNodeStore)
    this.testRunStore = new TestRunStore(projectId)
  }
}
