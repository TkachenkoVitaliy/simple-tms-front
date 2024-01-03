import { NodeModel } from '@minoru/react-dnd-treeview'
import { ObservableMap, makeAutoObservable, observable } from 'mobx'

import { projectStore } from 'entities/Project'
import { TestNodeAPI } from 'entities/TestNode/api/testNodeApi'

import {
  TestNodeData,
  TestNodeType,
  UpdateTestNodeParent,
} from '../types/testNode'

class TestNodeStore {
  isLoading: boolean = false

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  isRegistryInited: boolean = false

  setRegistryInited(isInited: boolean) {
    this.isRegistryInited = isInited
  }

  nodesRegistry: ObservableMap<
    NodeModel<TestNodeData>['id'],
    NodeModel<TestNodeData>
  > = observable.map()

  get nodes(): NodeModel<TestNodeData>[] {
    return Array.from(this.nodesRegistry.values())
  }

  get suites(): NodeModel<TestNodeData>[] {
    return Array.from(this.nodesRegistry.values()).filter(
      (node) => node.data && node.data.type === TestNodeType.SUITE,
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

  get cases(): NodeModel<TestNodeData>[] {
    return Array.from(this.nodesRegistry.values()).filter(
      (node) => node.data && node.data.type === TestNodeType.CASE,
    )
  }

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
    const projectId = projectStore.activeProjectId
    if (projectId) {
      TestNodeAPI.getProjectTestNodes(projectId)
        .then(({ data }) => {
          this.nodesRegistry.clear()
          data.forEach((node) => this.nodesRegistry.set(node.id, node))
          this.setRegistryInited(true)
        })
        .finally(() => {
          this.setLoading(false)
          return null
        })
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

  constructor() {
    makeAutoObservable(this)
  }
}

export const testNodeStore = new TestNodeStore()
