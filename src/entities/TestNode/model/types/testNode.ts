export enum TestNodeType {
  CASE = 'CASE',
  SUITE = 'SUITE',
}

// export interface TestNode {
//   dbId: number
//   name: string
// }

export interface TestNodeData {
  children: string[]
  id: string
  type: TestNodeType
  parentId: string | null
}

export interface UpdateTestNodeParent {
  nodeId: number
  parentId: number | null
  type: TestNodeType
}
