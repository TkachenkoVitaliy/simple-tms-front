import { makeAutoObservable } from 'mobx'

export class TestPlanStore {
  projectId: number

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
