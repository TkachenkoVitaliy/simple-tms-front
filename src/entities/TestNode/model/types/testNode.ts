export enum TestNodeType {
  CASE = 'CASE',
  SUITE = 'SUITE',
}

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
