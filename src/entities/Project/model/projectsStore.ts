import { makeAutoObservable } from 'mobx'
import { IProject } from 'shared/types/projectTypes'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { ProjectAPI } from '../api/projectApi'

class ProjectsStore {
  projects: IProject[] = []

  activeProject: IProject | null = null

  setProjects(projects: IProject[]) {
    this.projects = projects
  }

  setActiveProject(project: IProject | null) {
    this.activeProject = project
  }

  async loadProjects() {
    const projects = await ProjectAPI.getAllProjects()
    this.setProjects([
      { id: 0, name: 'New Project', description: '' },
      ...projects,
    ])
  }

  async deleteProject(id: number) {
    await ProjectAPI.deleteProject(id)
    if (this.activeProject?.id === id) {
      this.setActiveProject(null)
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    }
    await this.loadProjects()
  }

  initActiveProject() {
    const activeProjectId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    if (activeProjectId) {
      const activeProject = this.projects.find(
        (project) => project.id.toString() === activeProjectId,
      )
      if (!activeProject) {
        throw new Error("Can't initialize active project")
        localStorage.removeItem(LOCAL_STORAGE_ACTIVE_PROJECT)
      }
      this.setActiveProject(activeProject || null)
    }
  }

  constructor() {
    makeAutoObservable(this)
    this.loadProjects()
    this.initActiveProject()
  }
}

export const projectsStore = new ProjectsStore()
