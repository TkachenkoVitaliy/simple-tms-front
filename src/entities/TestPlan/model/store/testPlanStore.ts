import { makeAutoObservable, observable, ObservableMap } from 'mobx'

import { TestPlanAPI } from '../../api/testPlanApi'
import { TestPlan } from '../types/testPlan'

export class TestPlanStore {
  projectId: number

  isLoading: boolean = false

  plansRegistry: ObservableMap<TestPlan['id'], TestPlan> = observable.map()

  get plans(): TestPlan[] {
    return Array.from(this.plansRegistry.values())
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  loadPlans = async () => {
    this.setLoading(true)
    return TestPlanAPI.getProjectPlans(this.projectId).then(({ data }) => {
      this.plansRegistry.clear()
      data.forEach((plan) => this.plansRegistry.set(plan.id, plan))
    })
  }

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
