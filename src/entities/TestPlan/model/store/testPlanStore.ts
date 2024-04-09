import { makeAutoObservable, observable, ObservableMap } from 'mobx'

import { TestPlanAPI } from '../../api/testPlanApi'
import { TestPlan } from '../types/testPlan'

const NEW_PLAN: TestPlan = {
  id: 0,
  name: '',
  description: '',
  testCases: [],
}

export class TestPlanStore {
  projectId: number

  isLoading: boolean = false

  testPlans: TestPlan[] = []

  testPlan: TestPlan = { ...NEW_PLAN }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  setTestPlans(testPlans: TestPlan[]) {
    this.testPlans = testPlans
  }

  setTestPlan(testPlan: TestPlan) {
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

  loadPlans = async () => {
    this.setLoading(true)
    const { data } = await TestPlanAPI.getProjectPlans(this.projectId)
    this.setTestPlans(data)
    this.setLoading(false)
  }

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
