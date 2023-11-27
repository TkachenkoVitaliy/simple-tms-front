import { ObservableMap, makeAutoObservable, observable } from 'mobx'
import { appLocalStorage } from 'shared/lib/utils'
import { Project } from '../types/project'

class ProjectStore {
  isLoading: boolean = false

  activeProjectId: number | null = null

  projects: ObservableMap<Project['id'], Project> = observable.map()

  get activeProject(): Project | null {
    if (this.activeProjectId === null) {
      return null
    }
    const activeProject = this.projects.get(this.activeProjectId)
    if (activeProject === undefined) {
      return null
    }
    return activeProject
  }

  setActiveProjectId(id: number | null) {
    this.setActiveProjectId(id)
    appLocalStorage.setActiveProjectId(id)
  }

  initActiveProject(projectId?: number) {
    if (projectId !== undefined && projectId !== this.activeProjectId) {
      this.setActiveProjectId(projectId)
    }
    if (projectId === undefined) {
      const localActiveProjectId = appLocalStorage.getActiveProjectId()
      this.setActiveProjectId(localActiveProjectId)
    }
  }

  constructor() {
    makeAutoObservable(this)
    this.initActiveProject()
  }
}

export const projectStore = new ProjectStore()
