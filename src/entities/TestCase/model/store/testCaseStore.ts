import { makeAutoObservable } from 'mobx'

import { projectStore } from 'entities/Project'
import { TestCaseAPI } from 'entities/TestCase/api/testCaseApi'
import { testNodeStore } from 'entities/TestNode'

import { CasePriority, CaseType, TestCase } from '../types/testCase'

export const NEW_CASE: TestCase = {
  id: 0,
  parentSuiteId: null,
  name: '',
  type: CaseType.MANUAL,
  priority: CasePriority.NORMAL,
  preconditions: '',
  testSteps: [],
}

class TestCaseStore {
  isLoading: boolean = false

  setIsLoading = (loading: boolean) => {
    this.isLoading = loading
  }

  testCase: TestCase = { ...NEW_CASE }

  setTestCase = (testCase: TestCase) => {
    this.testCase = testCase
  }

  loadCase = async (caseId: TestCase['id']) => {
    this.setIsLoading(true)
    const testCase: TestCase = (await TestCaseAPI.getById(caseId)).data
    if (testCase.projectId !== projectStore.activeProjectId) {
      throw new Error(
        `Bad projectId. TestCase - ${JSON.stringify(
          testCase,
        )}. ActiveProjectId - ${projectStore.activeProjectId}`,
      )
    }
    this.setIsLoading(false)
    this.setTestCase(testCase)
  }

  setNewCase = (parentSuiteId?: TestCase['parentSuiteId']) => {
    this.setTestCase({ ...NEW_CASE, parentSuiteId: parentSuiteId || null })
    this.setIsLoading(false)
  }

  saveCase = async (testCase: TestCase) => {
    this.setIsLoading(true)
    const savedCase = (
      await TestCaseAPI.save({
        ...testCase,
        id: testCase.id || null,
      })
    ).data
    this.setTestCase(savedCase)
    await testNodeStore.loadNodes()
    this.setIsLoading(false)
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const testCaseStore = new TestCaseStore()
