import { TestNodeType } from 'shared/consts/types/testNodeType'

export interface TestNodeData {
  children: string[]
  id: number
  type: TestNodeType
  parentId: number | null
}

export interface UpdateTestNodeParent {
  nodeId: number
  parentId: number | null
  type: TestNodeType
}
