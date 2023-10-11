export interface TestNodeData {
  children: (number | string)[]
  id: number | string
  type: 'CASE' | 'SUITE'
  parentId: number | string | null
}

export interface TestNode {
  dbId: number
  name: string
}

export interface UpdateTestsNodeParent {
  nodeId: number | null
  parentId: number | null
  type: 'CASE' | 'SUITE'
}
