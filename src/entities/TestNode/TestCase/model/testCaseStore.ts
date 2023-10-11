import { makeAutoObservable } from 'mobx'

class TestCaseStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export const testCaseStore = new TestCaseStore()
