import { NewEntity } from 'shared/types/api'

export interface Project {
  id: number
  name: string
  description: string
}

export type NewProject = NewEntity<Project>
