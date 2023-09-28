import { ProjectAPI } from 'entities/Project/api/projectApi'
import { makeAutoObservable } from 'mobx'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { IProject } from 'shared/types/projectTypes'

class AppStore {
  activeProject: IProject | null = null

  projects: IProject[] = []

  async setActiveProject(project: IProject | null) {
    if (project !== null) {
      const projectsNew: IProject[] = []
      let index = -1
      this.projects.forEach((item, idx) => {
        if (item.id !== project.id) {
          projectsNew[idx] = item
        } else {
          index = idx
        }
      })

      if (index >= 0) {
        projectsNew[index] = await ProjectAPI.getProject(project.id)
        this.setProjects(projectsNew)
        this.activeProject = this.projects[index]
        localStorage.setItem(
          LOCAL_STORAGE_ACTIVE_PROJECT,
          project.id.toString(),
        )
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    }
    this.activeProject = project
  }

  setProjects(projects: IProject[]) {
    this.projects = projects
  }

  async createProject(newProject: IProject) {
    const createdProject = await ProjectAPI.createProject(newProject)
    this.setActiveProject(createdProject)
  }

  async updateProject(editedProject: IProject) {
    const updatedProject = await ProjectAPI.updateProject(editedProject)
    this.setActiveProject(updatedProject)
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteProject(id: number) {
    await ProjectAPI.deleteProject(id)
  }

  async loadProjects() {
    const data = await ProjectAPI.getAllProjects()
    this.setProjects(
      [{ id: 0, name: 'New Project', description: '' }, ...data].sort(
        (first, second) => second.id - first.id,
      ),
    )

    const localStorageActiveProjectId = localStorage.getItem(
      LOCAL_STORAGE_ACTIVE_PROJECT,
    )
    if (localStorageActiveProjectId) {
      const activeProjectFromLocalStorage = this.projects.find(
        (project) => project.id.toString() === localStorageActiveProjectId,
      )
      if (activeProjectFromLocalStorage) {
        this.setActiveProject(activeProjectFromLocalStorage)
      }
    }
  }

  constructor() {
    makeAutoObservable(this)
    this.loadProjects()
  }
}

export const appStore = new AppStore()
