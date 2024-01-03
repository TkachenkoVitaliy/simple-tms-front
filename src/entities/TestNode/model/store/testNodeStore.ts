import { makeAutoObservable } from 'mobx'

import { UpdateTestNodeParent } from '../types/testNode'

class TestNodeStore {
  fetchNodes = () => {
    console.log('fetchNodes')
  }

  updateTestNode = (update: UpdateTestNodeParent) => {
    console.log('updateTestNode ', update)
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const testNodeStore = new TestNodeStore()
