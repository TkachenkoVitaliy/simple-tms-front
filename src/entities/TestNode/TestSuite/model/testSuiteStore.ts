import { makeAutoObservable } from 'mobx'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { TestSuite, TestSuiteShort } from './types'
import { TestSuiteAPI } from '../api/testSuiteApi'

class TestSuiteStore {
  id: TestSuite['id'] = 0

  parentSuiteId: TestSuite['parentSuiteId'] = null

  parentSuite: TestSuiteShort = {
    id: 0,
    name: 'Not selected',
    syntheticId: '0',
  }

  name: TestSuite['name'] = ''

  description: TestSuite['description'] = ''

  private setId(id: TestSuite['id']) {
    this.id = id
  }

  setParentSuiteId(parentSuiteId: TestSuite['parentSuiteId']) {
    this.parentSuiteId = parentSuiteId
  }

  setParentSuite = (parentSuite: TestSuiteShort | null) => {
    this.parentSuite =
      parentSuite === null
        ? {
            id: 0,
            name: 'Not selected',
            syntheticId: '0',
          }
        : parentSuite
    this.setParentSuiteId(parentSuite?.id || null)
  }

  setName(name: TestSuite['name']) {
    this.name = name.trim()
  }

  setDescription(description: TestSuite['description']) {
    this.description = description
  }

  createChildSuite(parentSuiteId: TestSuite['parentSuiteId']) {
    this.setId(0)
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

  async saveCreatedSuite() {
    if (projectsStore.activeProject) {
      await TestSuiteAPI.createTestSuite({
        id: this.id,
        parentSuiteId: this.parentSuiteId,
        name: this.name,
        description: this.description,
        projectId: projectsStore.activeProject.id,
      })
    }
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
