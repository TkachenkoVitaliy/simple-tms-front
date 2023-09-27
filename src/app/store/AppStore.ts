import { AxiosInstance } from 'axios'
import { makeAutoObservable } from 'mobx'
import API from 'shared/api/api'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'
import { IProject } from 'shared/types/projectTypes'

class AppStore {
  api: AxiosInstance

  activeProject: IProject | null = null

  projects: IProject[] = []

  setActiveProject(project: IProject | null) {
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
        this.api.get(`/projects/${project.id}`).then((response) => {
          projectsNew[index] = response.data
          this.setProjects(projectsNew)
          this.activeProject = this.projects[index]
        })
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

  async loadProjects() {
    const response = await this.api.get('/projects')
    this.setProjects(
      [{ id: 0, name: 'New Project', description: '' }, ...response.data].sort(
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

  constructor(api: AxiosInstance) {
    makeAutoObservable(this)
    this.api = api
    this.loadProjects()
  }
}

export const appStore = new AppStore(API)
