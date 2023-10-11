export interface TestSuite {
  id: number | null
  parentSuiteId: number | null
  name: string
  description: string
}

export interface TestSuiteShort {
  id: number
  name: string
  syntheticId: string
}
