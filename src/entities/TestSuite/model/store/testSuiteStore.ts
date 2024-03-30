import { makeAutoObservable } from 'mobx'

import { TestNodeStore } from 'entities/TestNode'
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

export class TestSuiteStore {
  projectId: number

  testNodeStore: TestNodeStore

  isLoading: boolean = false

  setIsLoading = (loading: boolean) => {
    this.isLoading = loading
  }

  testSuite: TestSuite = { ...NEW_SUITE }

  setTestSuite = (testSuite: TestSuite) => {
    this.testSuite = testSuite
  }

  loadSuite = async (suiteId: TestSuite['id']) => {
    if (this.projectId != null) {
      this.setIsLoading(true)
      const testSuite: TestSuite = (
        await TestSuiteAPI.getById(this.projectId, suiteId)
      ).data
      if (testSuite.projectId !== this.projectId) {
        throw new Error('Bad projectId')
      }
      this.setIsLoading(false)
      this.setTestSuite(testSuite)
    }
  }

  setNewSuite = (parentSuiteId?: TestSuite['parentSuiteId']) => {
    this.setTestSuite({ ...NEW_SUITE, parentSuiteId: parentSuiteId || null })
    this.setIsLoading(false)
  }

  saveSuite = async (testSuite: TestSuite) => {
    if (this.projectId != null) {
      this.setIsLoading(true)
      const savedSuite = (
        await TestSuiteAPI.save(this.projectId, {
          ...testSuite,
          id: testSuite.id || null,
        })
      ).data
      this.setTestSuite(savedSuite)
      await this.testNodeStore.loadNodes()
      this.setIsLoading(false)
    }
  }

  constructor(projectId: number, testNodeStore: TestNodeStore) {
    this.projectId = projectId
    this.testNodeStore = testNodeStore
    makeAutoObservable(this)
  }
}
