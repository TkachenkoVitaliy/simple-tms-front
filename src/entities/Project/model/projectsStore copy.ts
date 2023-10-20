import { makeAutoObservable } from 'mobx'
import { IProject } from 'shared/types/projectTypes'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { ProjectAPI } from '../api/projectApi'

const NEW_PROJECT_DEFAULT = { id: 0, name: 'New Project', description: '' }

class ProjectsStore {
  projects: IProject[] = []

  private activeProjectId: string | null = null

  private setProjects(projects: IProject[]) {
    this.projects = projects
  }

  setActiveProjectId(activeProjectId: string | null) {
    this.activeProjectId = activeProjectId
  }

  get getActiveProjectId() {
    return Number.isNaN()
  }

  get activeProject() {
    return this.projects.filter(
      (project) => project.id.toString() === this.activeProjectId,
    )
  }

  get projectsWithCreateItem() {
    return [...this.projects, NEW_PROJECT_DEFAULT]
  }

  async fetchProjects() {
    const projects = await ProjectAPI.getAllProjects()
    this.setProjects(projects)
  }

  init(projectIdPathParam: string | null) {
    if (projectIdPathParam != null) {
      this.setActiveProjectId = projectIdPathParam
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const projectsStore = new ProjectsStore()
