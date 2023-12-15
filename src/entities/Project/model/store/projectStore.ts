import { ObservableMap, makeAutoObservable, observable } from 'mobx'
import { appLocalStorage } from 'shared/lib/utils'
import { ProjectAPI } from 'entities/Project/api/projectApi'
import { Project } from '../types/project'

class ProjectStore {
  isRegistryInited: boolean = false

  isLoading: boolean = false

  activeProjectId: number | null = null

  newProject: Project = {
    id: 0,
    name: '',
    description: '',
  }

  editableProject: Project = {
    ...this.newProject,
  }

  projectsRegistry: ObservableMap<Project['id'], Project> = observable.map()

  setRegistryInited(isInited: boolean) {
    this.isRegistryInited = isInited
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  setEditableProject(project: Project) {
    this.editableProject = project
  }

  loadEditableProject = async (projectId: number) => {
    this.setLoading(true)
    ProjectAPI.getById(projectId)
      .then((response) => {
        this.setEditableProject(response.data)
      })
      .finally(() => this.setLoading(false))
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
    if (!this.isRegistryInited) return
    if (id !== null && this.projectsRegistry.get(id) === undefined) {
      const localId = appLocalStorage.getActiveProjectId()
      if (localId === id) {
        appLocalStorage.setActiveProjectId(null)
      }
      throw new Error(`Not found project with id - ${id}`)
    }
    appLocalStorage.setActiveProjectId(id)
    this.activeProjectId = id
  }

  saveProject = async (project: Project) => {
    this.isLoading = true
    const response = await ProjectAPI.save({
      ...project,
      id: project.id || null,
    })
    const savedProject = response.data
    // reload projects registry
    await this.loadProjects()
    // update edited project
    this.setEditableProject(
      // нужно нормально отработать ситуацию когда не нашелся проект с таким id
      this.projectsRegistry.get(savedProject.id) || this.newProject,
    )
  }

  deleteProject = async (projectId: Project['id']) => {
    this.isLoading = true
    await ProjectAPI.delete(projectId)
    await this.loadProjects()
  }

  loadProjects = async () => {
    this.isLoading = true
    return ProjectAPI.getAll()
      .then(({ data }) => {
        this.projectsRegistry.clear()
        data.forEach((project) =>
          this.projectsRegistry.set(project.id, project),
        )
        this.setRegistryInited(true)
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
  }
}

export const projectStore = new ProjectStore()
