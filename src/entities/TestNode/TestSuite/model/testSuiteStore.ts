import { makeAutoObservable } from 'mobx'
import { TestSuite } from './types'
import { TestSuiteAPI } from '../api/testSuiteApi'

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
    this.setParentSuiteId(parentSuiteId)
    this.setName('')
    this.setDescription('')
  }

  async setEditSuite(suiteId: number) {
    const testSuite: TestSuite = await TestSuiteAPI.getTestSuite(suiteId)
    this.setId(testSuite.id)
    this.setParentSuiteId(testSuite.parentSuiteId)
    this.setName(testSuite.name)
    this.setDescription(testSuite.description)
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
