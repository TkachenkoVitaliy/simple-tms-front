import { ObservableMap, makeAutoObservable, observable } from 'mobx'
import { appLocalStorage } from 'shared/lib/utils'
import { ProjectAPI } from 'entities/Project/api/projectApi'
import { resolve } from 'path'
import { Project } from '../types/project'

class ProjectStore {
  isRegistryInited: boolean = false

  isLoading: boolean = false

  activeProjectId: number | null = null

  projectsRegistry: ObservableMap<Project['id'], Project> = observable.map()

  setRegistryInited(isInited: boolean) {
    this.isRegistryInited = isInited
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  get activeProject(): Project | null {
    if (this.activeProjectId === null) {
      return null
    }
    const activeProject = this.projectsRegistry.get(this.activeProjectId)
    if (activeProject === undefined) {
      return null
    }
    return activeProject
  }

  get projects(): Project[] {
    return Array.from(this.projectsRegistry.values())
  }

  setActiveProjectId = (id: number | null) => {
    console.log('setActiveProjectId', id)
    if (id !== null && this.projectsRegistry.get(id) === undefined) {
      throw new Error(`Not found project with id - ${id}`)
    }
    appLocalStorage.setActiveProjectId(id)
    this.activeProjectId = id
  }

  loadProjects = async () => {
    this.isLoading = true
    return ProjectAPI.getAll()
      .then(({ data }) => {
        console.log('data', data)
        this.projectsRegistry.clear()
        data.forEach((project) =>
          this.projectsRegistry.set(project.id, project),
        )
        this.setRegistryInited(true)
        console.log(this.isRegistryInited)
      })
      .finally(() => {
        this.setLoading(false)
      })
  }

  // projectId из path params
  initActiveProject = async (projectId?: number) => {
    if (!this.isRegistryInited) {
      await this.loadProjects()
    }

    console.log('init', projectId)

    if (projectId !== undefined && projectId !== this.activeProjectId) {
      this.setActiveProjectId(projectId)
      return
    }
    if (projectId === undefined) {
      const localActiveProjectId = appLocalStorage.getActiveProjectId()
      this.setActiveProjectId(localActiveProjectId)
    }
  }

  constructor() {
    makeAutoObservable(this)
    console.log('constructor')
  }
}

export const projectStore = new ProjectStore()
