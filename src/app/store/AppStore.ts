import { makeAutoObservable } from 'mobx'
import { mockProjects } from 'mock/Projects'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { IProject } from 'shared/types/projectTypes'

class AppStore {
  activeProject: IProject | null = null

  projects: IProject[] = []

  setActiveProject(project: IProject | null) {
    this.activeProject = project
    if (project !== null) {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_PROJECT, project.id.toString())
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_PROJECT)
    }
  }

  setProjects(projects: IProject[]) {
    this.projects = projects
  }

  loadProjects() {
    this.setProjects(
      [{ id: 0, name: 'New Project', description: '' }, ...mockProjects].sort(
        (first, second) => second.id - first.id,
      ),
    )
  }

  constructor() {
    makeAutoObservable(this)
    this.loadProjects()
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
}

export const appStore = new AppStore()
