export interface TestSuite {
  id: number
  parentSuiteId: number | null
  name: string
  description: string
  projectId?: number
}

export interface TestSuiteShort {
  id: number
  name: string
  syntheticId: string
}
