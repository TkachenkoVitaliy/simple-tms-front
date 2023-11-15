import { NodeModel } from '@minoru/react-dnd-treeview'
import { makeAutoObservable } from 'mobx'
import { projectsStore } from 'entities/Project/model/projectsStore old'
import { TestNodeData, UpdateTestsNodeParent } from './types'
import { TestsAPI } from '../api/testsApi'
import { TestSuiteShort } from '../TestSuite/model/types'
import { testSuiteStore } from '../TestSuite/model/testSuiteStore'

class TestNodeStore {
  nodes: NodeModel<TestNodeData>[] = []

  suites: TestSuiteShort[] = [
    {
      id: 0,
      name: 'Not selected',
      syntheticId: '0',
    },
  ]

  openedSuites: number = 0

  setNodes(nodes: NodeModel<TestNodeData>[]) {
    this.nodes = nodes
  }

  setSuites(suites: TestSuiteShort[]) {
    this.suites = [
      {
        id: 0,
        name: 'Not selected',
        syntheticId: '0',
      },
      ...suites,
    ]
  }

  setOpenedSuite(openedSuitesCount: number) {
    this.openedSuites = openedSuitesCount
  }

  get isAllSuitesOpened() {
    return this.openedSuites >= this.suites.length
  }

  get isAllSuitesClosed() {
    return this.openedSuites === 0
  }

  async updateTestNode(update: UpdateTestsNodeParent) {
    await TestsAPI.updateTestsNodeParent(update)
    await this.fetchNodes()
    if (update.nodeId === testSuiteStore.id) {
      testSuiteStore.setEditSuite(update.nodeId)
    }
  }

  async fetchNodes() {
    const projectId = projectsStore.activeProject?.id
    if (projectId) {
      const nodes = await TestsAPI.getProjectTestsNodes(projectId)
      this.setNodes(nodes)
      this.setSuites(
        nodes
          .filter((node) => node.data && node.data.type === 'SUITE')
          .map((node) => {
            const backendData = node.data as TestNodeData
            return {
              // TODO: переделать типизацию TestNodeData
              id: backendData.id as number,
              name: node.text,
              syntheticId: node.id.toString(),
            }
          }),
      )
    }
  }

  constructor() {
    makeAutoObservable(this)
    // this.fetchNodes()
  }
}

export const testNodeStore = new TestNodeStore()
