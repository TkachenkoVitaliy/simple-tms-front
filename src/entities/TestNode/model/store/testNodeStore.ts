import { NodeModel } from '@minoru/react-dnd-treeview'
import { makeAutoObservable, observable, ObservableMap } from 'mobx'

import { TestCaseAPI } from 'entities/TestCase/api/testCaseApi'
import { TestNodeAPI } from 'entities/TestNode/api/testNodeApi'
import { TestSuiteAPI } from 'entities/TestSuite/api/testSuiteApi'
import { TestSuiteShort } from 'entities/TestSuite/model/types/testSuite'

import {
  TestNodeData,
  TestNodeType,
  UpdateTestNodeParent,
} from '../types/testNode'

export class TestNodeStore {
  projectId: number

  isLoading: boolean = false

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  isRegistryInitialized: boolean = false

  setRegistryInitialized(isInitialized: boolean) {
    this.isRegistryInitialized = isInitialized
  }

  nodesRegistry: ObservableMap<
    NodeModel<TestNodeData>['id'],
    NodeModel<TestNodeData>
  > = observable.map()

  get nodes(): NodeModel<TestNodeData>[] {
    return Array.from(this.nodesRegistry.values())
  }

  get shortSuites(): TestSuiteShort[] {
    return Array.from(this.nodesRegistry.values()).flatMap((node) =>
      node.data && node.data.type === TestNodeType.SUITE
        ? [{ id: node.data.id, name: node.text }]
        : [],
    )
  }

  get suitesWithChildrenCount(): number {
    let count = 0
    Array.from(this.nodesRegistry.values()).forEach((node) => {
      if (
        node.data &&
        node.data.type === TestNodeType.SUITE &&
        node.data.children.length > 0
      ) {
        count += 1
      }
    })
    return count
  }

  // get cases(): NodeModel<TestNodeData>[] {
  //   return Array.from(this.nodesRegistry.values()).filter(
  //     (node) => node.data && node.data.type === TestNodeType.CASE,
  //   )
  // }

  openedSuites: number = 0

  setOpenedSuites = (openedCount: number) => {
    this.openedSuites = openedCount
  }

  get isAllSuitesOpened() {
    return this.openedSuites >= this.suitesWithChildrenCount
  }

  get isAllSuitesClosed() {
    return this.openedSuites === 0
  }

  loadNodes = async () => {
    this.isLoading = true
    if (this.projectId) {
      TestNodeAPI.getProjectTestNodes(this.projectId)
        .then(({ data }) => {
          this.nodesRegistry.clear()
          data.forEach((node) => this.nodesRegistry.set(node.id, node))
          this.setRegistryInitialized(true)
        })
        .finally(() => {
          this.setLoading(false)
          return null
        })
    }
  }

  deleteNode = async (id: number, type: TestNodeType) => {
    if (type === TestNodeType.CASE) {
      this.setLoading(true)
      TestCaseAPI.delete(id)
        .then(() => this.loadNodes())
        .then(() => this.setLoading(false))
    }
    if (type === TestNodeType.SUITE) {
      this.setLoading(true)
      TestSuiteAPI.delete(this.projectId, id)
        .then(() => this.loadNodes())
        .then(() => this.setLoading(false))
    }
  }

  updateTestNode = async (update: UpdateTestNodeParent) => {
    this.setLoading(true)
    await TestNodeAPI.updateTestNodeParent(update)
    await this.loadNodes()
    // if (update.nodeId === testSuiteStore.id) {
    //   testSuiteStore.setEditSuite(update.nodeId)
    // }
  }

  constructor(projectId: number) {
    this.projectId = projectId
    makeAutoObservable(this)
  }
}
