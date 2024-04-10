import { TestCaseStore } from 'entities/TestCase'
import { TestNodeStore } from 'entities/TestNode'
import { TestPlanStore } from 'entities/TestPlan/model/store/testPlanStore'
import { TestSuiteStore } from 'entities/TestSuite'

export class ProjectEntitiesRootStore {
  testNodeStore: TestNodeStore

  testCaseStore: TestCaseStore

  testSuiteStore: TestSuiteStore

  testPlanStore: TestPlanStore

  constructor(projectId: number) {
    this.testNodeStore = new TestNodeStore(projectId)
    this.testPlanStore = new TestPlanStore(projectId)
    this.testCaseStore = new TestCaseStore(projectId, this.testNodeStore)
    this.testSuiteStore = new TestSuiteStore(projectId, this.testNodeStore)
  }
}
