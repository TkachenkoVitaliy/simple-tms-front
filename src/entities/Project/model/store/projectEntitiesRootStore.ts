import { TestCaseStore } from 'entities/TestCase'
import { TestNodeStore } from 'entities/TestNode'
import { TestSuiteStore } from 'entities/TestSuite'

export class ProjectEntitiesRootStore {
  testNodeStore: TestNodeStore

  testCaseStore: TestCaseStore

  testSuiteStore: TestSuiteStore

  constructor(projectId: number) {
    this.testNodeStore = new TestNodeStore(projectId)
    this.testCaseStore = new TestCaseStore(projectId, this.testNodeStore)
    this.testSuiteStore = new TestSuiteStore(projectId, this.testNodeStore)
  }
}
