import { makeAutoObservable } from 'mobx'
import { IProject } from 'shared/types/projectTypes'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { ProjectAPI } from '../api/projectApi'

const NEW_PROJECT_DEFAULT = { id: 0, name: 'New Project', description: '' }

class ProjectsStore {
  projects: IProject[] = []

  activeProject: IProject | null = null

  setProjects(projects: IProject[]) {
    this.projects = projects
  }

  setActiveProject(project: IProject | null) {
    this.activeProject = project
    if (project === null) {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    } else {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_PROJECT, project.id.toString())
    }
  }

  setActiveProjectById(projectId: string) {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_PROJECT, projectId)
    this.initProjects()
  }

  async loadProjects() {
    const projects = await ProjectAPI.getAllProjects()
    this.setProjects([...projects, NEW_PROJECT_DEFAULT])
  }

  async deleteProject(id: number) {
    await ProjectAPI.deleteProject(id)
    if (this.activeProject?.id === id) {
      this.setActiveProject(null)
    }
  }

  async createProject(project: IProject) {
    const createdProject = await ProjectAPI.createProject(project)
    this.setActiveProject(createdProject)
  }

  async updateProject(project: IProject) {
    const updatedProject = await ProjectAPI.updateProject(project)
    this.setActiveProject(updatedProject)
  }

  async initProjects() {
    await this.loadProjects()
    const activeProjectId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    if (activeProjectId) {
      const activeProject = this.projects.find(
        (project) => project.id.toString() === activeProjectId,
      )
      this.setActiveProject(activeProject || null)
    }
  }

  constructor() {
    makeAutoObservable(this)
    this.initProjects()
  }
}

export const projectsStore = new ProjectsStore()

// TODO: придумать как синхронизировать с react-router (при узменении в url pathparam - projectId)
