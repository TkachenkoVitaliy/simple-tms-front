import { makeAutoObservable } from 'mobx'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { testNodeStore } from 'entities/TestNode/model/testNodeStore'
import { TestSuite, TestSuiteShort } from './types'
import { TestSuiteAPI } from '../api/testSuiteApi'

const ROOT_PARENT_SUITE = {
  id: 0,
  name: 'Not selected',
  syntheticId: '0',
}

export const NEW_SUITE = {
  id: 0,
  parentSuiteId: 0,
  name: '',
  description: '',
}

class TestSuiteStore {
  id: TestSuite['id'] = NEW_SUITE.id

  parentSuiteId: TestSuite['parentSuiteId'] = NEW_SUITE.parentSuiteId

  parentSuite: TestSuiteShort = ROOT_PARENT_SUITE

  name: TestSuite['name'] = NEW_SUITE.name

  description: TestSuite['description'] = NEW_SUITE.description

  private setId(id: TestSuite['id']) {
    this.id = id
  }

  setParentSuiteId(parentSuiteId: TestSuite['parentSuiteId']) {
    this.parentSuiteId = parentSuiteId
  }

  setParentSuite = (parentSuite: TestSuiteShort | null) => {
    this.parentSuite = parentSuite === null ? ROOT_PARENT_SUITE : parentSuite
    this.setParentSuiteId(parentSuite?.id || null)
  }

  setName(name: TestSuite['name']) {
    this.name = name
  }

  setDescription(description: TestSuite['description']) {
    this.description = description
  }

  updateParentSuite = () => {
    const nodeData = testNodeStore.nodes.find(
      (node) => node.data?.id === this.id,
    )
    const parentSuite = testNodeStore.suites.find(
      (suite) => suite.id === nodeData?.data?.parentId,
    )
    this.setParentSuite(parentSuite || null)
  }

  get isNewSuite() {
    return this.id === 0
  }

  setSuite(testSuite?: TestSuite) {
    const { id, parentSuiteId, name, description } = testSuite || NEW_SUITE
    this.setId(id)
    this.setParentSuiteId(parentSuiteId)
    this.setName(name)
    this.setDescription(description)
    this.setParentSuite(
      testNodeStore.suites.find((suite) => suite.id === parentSuiteId) || null,
    )
  }

  async setEditSuite(suiteId: TestSuite['id']) {
    const testSuite: TestSuite = await TestSuiteAPI.getTestSuite(suiteId)
    this.setSuite(testSuite)
  }

  setCreateSuite(parentSuiteId?: TestSuite['parentSuiteId']) {
    const parentId: TestSuite['parentSuiteId'] = parentSuiteId || null
    this.setSuite({ ...NEW_SUITE, parentSuiteId: parentId })
  }

  async saveSuite(): Promise<TestSuite | undefined> {
    let savedSuite: TestSuite
    if (projectsStore.activeProject) {
      const suite: NewEntity<TestSuite> | TestSuite = {
        id: this.id === 0 ? null : this.id,
        parentSuiteId: this.parentSuiteId,
        name: this.name,
        description: this.description,
        projectId: projectsStore.activeProject.id,
      }

      if (suite.id === null) {
        savedSuite = await TestSuiteAPI.createTestSuite(suite)
      } else {
        savedSuite = await TestSuiteAPI.updateTestSuite(suite)
      }
      await testNodeStore.fetchNodes()
      this.updateParentSuite()
      return savedSuite
    }
    return undefined
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const testSuiteStore = new TestSuiteStore()
