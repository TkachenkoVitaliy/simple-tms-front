import { makeAutoObservable } from 'mobx'

import { TestCaseAPI } from 'entities/TestCase/api/testCaseApi'
import { TestNodeStore } from 'entities/TestNode'

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

export class TestCaseStore {
  projectId: number

  testNodeStore: TestNodeStore

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
    if (this.projectId === null) {
      setTimeout(() => {
        if (testCase.projectId !== this.projectId) {
          throw new Error(
            `Bad projectId. TestCase - ${JSON.stringify(
              testCase,
            )}. ActiveProjectId - ${this.projectId}`,
          )
        }
        this.setIsLoading(false)
        this.setTestCase(testCase)
      }, 15)
    } else {
      if (testCase.projectId !== this.projectId) {
        throw new Error(
          `Bad projectId. TestCase - ${JSON.stringify(
            testCase,
          )}. ActiveProjectId - ${this.projectId}`,
        )
      }
      this.setIsLoading(false)
      this.setTestCase(testCase)
    }
  }

  setNewCase = (parentSuiteId?: TestCase['parentSuiteId']) => {
    this.setTestCase({
      ...NEW_CASE,
      parentSuiteId: parentSuiteId || null,
      testSteps: [],
    })
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
    await this.testNodeStore.loadNodes()
    this.setIsLoading(false)
  }

  constructor(projectId: number, testNodeStore: TestNodeStore) {
    this.projectId = projectId
    this.testNodeStore = testNodeStore
    makeAutoObservable(this)
  }
}
