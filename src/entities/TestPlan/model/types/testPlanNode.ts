import { TestNodeType } from 'shared/consts/types/testNodeType'

export interface TestPlanNode {
  id: number
  parentSuiteId: number | null
  name: string
  type: TestNodeType
  children?: TestPlanNode[] | undefined
}
