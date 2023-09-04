import { makeAutoObservable } from 'mobx'
import { IProject } from 'mock/Projects'
import { LOCAL_STORAGE_ACTIVE_PROJECT } from 'shared/consts/localstorage'

class AppStore {
  activeProject: IProject | null = null

  setActiveProject(project: IProject | null) {
    this.activeProject = project
    if (project !== null) {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_PROJECT, project.id.toString())
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const appStore = new AppStore()
