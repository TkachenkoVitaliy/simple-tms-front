import { makeAutoObservable, runInAction } from 'mobx'

import { TestPlanAPI } from '../../api/testPlanApi'
import { NewTestPlan, TestPlan } from '../types/testPlan'

const NEW_PLAN: TestPlan = {
  id: 0,
  name: '',
  description: '',
  testCases: [],
}

export class TestPlanStore {
  readonly projectId: number

  isLoading: boolean = false

  testPlans: TestPlan[] = []

  testPlan: TestPlan = { ...NEW_PLAN }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  private setTestPlans(testPlans: TestPlan[]) {
    this.testPlans = testPlans
  }

  private setTestPlan(testPlan: TestPlan) {
    this.testPlan = testPlan
  }

  loadPlan = async (id: number) => {
    this.setLoading(true)
    const { data } = await TestPlanAPI.getById(this.projectId, id)
    this.setTestPlan(data)
    this.setLoading(false)
  }

  setNewPlan = () => {
    this.setTestPlan({ ...NEW_PLAN })
  }

  savePlan = async (plan: TestPlan | NewTestPlan) => {
    let id = 'new'
    await runInAction(async () => {
      this.setLoading(true)
      const planForSave: TestPlan = JSON.parse(JSON.stringify(plan))
      const saveResponse = await TestPlanAPI.save(this.projectId, {
        ...planForSave,
        projectId: planForSave.projectId || this.projectId,
        id: planForSave.id || null,
      })
      this.setTestPlan(saveResponse.data)
      this.setLoading(false)
      id = saveResponse.data.id.toString()
    })
    return id
  }

  deletePlan = async (id: TestPlan['id']) => {
    this.setLoading(true)
    await TestPlanAPI.delete(this.projectId, id)
    this.setLoading(false)
  }

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
