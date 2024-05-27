import { makeAutoObservable, runInAction } from 'mobx'

import { TestRunAPI } from '../../api/testRunApi'
import { RunTestCase, TestRun } from '../../model/types/testRun'

export class TestRunStore {
  readonly projectId: number

  isLoading: boolean = false

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  testRun: TestRun | null = null

  private setTestRun(testRun: TestRun | null) {
    this.testRun = testRun
  }

  loadTestRun = async (id: TestRun['id'] | undefined) => {
    this.setLoading(true)
    if (id === undefined) {
      this.setTestRun(null)
    } else {
      const { data } = await TestRunAPI.getById(this.projectId, id)
      this.setTestRun(data)
    }
    this.setLoading(false)
  }

  createTestRun = async (testPlanId: number, testPlanName: string) => {
    this.setLoading(true)
    const currentDate = new Date()
    const date =
      currentDate.getDate() < 10
        ? `0${currentDate.getDate()}`
        : currentDate.getDate().toString()
    const month =
      currentDate.getMonth() < 9
        ? `0${currentDate.getMonth() + 1}`
        : (currentDate.getMonth() + 1).toString()
    const hours =
      currentDate.getHours() < 10
        ? `0${currentDate.getHours()}`
        : currentDate.getHours().toString()
    const minutes =
      currentDate.getMinutes() < 10
        ? `0${currentDate.getMinutes()}`
        : currentDate.getMinutes().toString()
    const seconds =
      currentDate.getSeconds() < 10
        ? `0${currentDate.getSeconds()}`
        : currentDate.getSeconds().toString()
    const name = `[${testPlanName}] - ${date}/${month}/${currentDate.getFullYear()} @ ${hours}:${minutes}:${seconds}`
    const createTestRunRequest = { testPlanId, name }
    const response = await TestRunAPI.create(
      this.projectId,
      createTestRunRequest,
    )
    this.setLoading(false)
    const { id } = response.data
    return id
  }

  deleteTestRun = async (id: TestRun['id']) => {
    this.setLoading(true)
    await TestRunAPI.delete(this.projectId, id)
    this.setLoading(false)
  }

  updateTestRunCase = async (
    testRunId: TestRun['id'],
    testCase: RunTestCase,
  ) => {
    await runInAction(async () => {
      this.setLoading(true)
      const response = await TestRunAPI.updateTestCase(
        this.projectId,
        testRunId,
        testCase,
      )
      this.setTestRun(response.data)
      this.setLoading(false)
    })
  }

  setCurrentCaseId = (currentCaseId: number) => {
    if (this.testRun !== null) {
      this.testRun.currentCaseId = currentCaseId
    }
  }

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
