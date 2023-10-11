import { makeAutoObservable } from 'mobx'
import { TestSuite } from './types'

class TestSuiteStore {
  id: TestSuite['id'] = null

  parentSuiteId: TestSuite['parentSuiteId'] = null

  name: TestSuite['name'] = ''

  description: TestSuite['description'] = ''

  private setId(id: TestSuite['id']) {
    this.id = id
  }

  setParentSuiteId(parentSuiteId: TestSuite['parentSuiteId']) {
    this.parentSuiteId = parentSuiteId
  }

  setName(name: TestSuite['name']) {
    this.name = name.trim()
  }

  setDescription(description: TestSuite['description']) {
    this.description = description
  }

  createChildSuite(parentSuiteId: TestSuite['parentSuiteId']) {
    this.setId(null)
    this.parentSuiteId = parentSuiteId
    this.name = ''
    this.description = ''
  }

  // TODO: fetch suite from API
  // fetchSuite(id: TestSuite['id']) {
  //   if (id === null) {
  //   }
  // }

  constructor() {
    makeAutoObservable(this)
  }
}

export const testSuiteStore = new TestSuiteStore()
