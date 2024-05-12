import { makeAutoObservable } from 'mobx'

import { TestRunAPI } from 'entities/TestRun'
import { TestRun } from 'entities/TestRun/model/types/testRun'
import { TestPlanAPI } from 'entities/TestPlan'

export class TestRunStore {
  readonly projectId: number

  isLoading: boolean = false

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  createTestRun = async (testPlanId: number, testPlanName: string) => {
    this.setLoading(true)
    const currentDate = new Date()
    const name = `[${testPlanName}] - ${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()} @ ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
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

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
