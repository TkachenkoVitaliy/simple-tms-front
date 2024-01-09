import { makeAutoObservable } from 'mobx'

import { projectStore } from 'entities/Project'
import { testNodeStore } from 'entities/TestNode'
import { TestSuiteAPI } from 'entities/TestSuite/api/testSuiteApi'

import { TestSuite } from '../types/testSuite'

const ROOT_PARENT_SUITE = {
  id: 0,
  name: 'Not selected',
  syntheticId: '0',
}

export const NEW_SUITE = {
  id: 0,
  parentSuiteId: null,
  name: '',
  description: '',
}

class TestSuiteStore {
  isLoading: boolean = true

  setIsLoading = (loading: boolean) => {
    this.isLoading = loading
  }

  testSuite: TestSuite = { ...NEW_SUITE }

  setTestSuite = (testSuite: TestSuite) => {
    this.testSuite = testSuite
  }

  loadSuite = async (suiteId: TestSuite['id']) => {
    const testSuite: TestSuite = (await TestSuiteAPI.getById(suiteId)).data
    if (testSuite.projectId !== projectStore.activeProjectId) {
      throw new Error('Bad projectId')
    }
    this.setTestSuite(testSuite)
  }

  setNewSuite = (parentSuiteId?: TestSuite['parentSuiteId']) => {
    this.setTestSuite({ ...NEW_SUITE, parentSuiteId: parentSuiteId || null })
  }

  saveSuite = async (testSuite: TestSuite) => {
    this.setIsLoading(true)
    const savedSuite = (
      await TestSuiteAPI.save({
        ...testSuite,
        id: testSuite.id || null,
      })
    ).data
    this.setIsLoading(false)
    await testNodeStore.loadNodes()
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const testSuiteStore = new TestSuiteStore()
