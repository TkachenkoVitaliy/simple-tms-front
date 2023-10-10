export interface TreeData {
  children: (number | string)[]
  id: number | string
  type: 'CASE' | 'SUITE'
  parentId: number | string | null
}
