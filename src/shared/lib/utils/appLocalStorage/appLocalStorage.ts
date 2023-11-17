import { ThemeName } from 'shared/consts/themeNames'

enum AppLocalStorageItems {
  THEME = 'theme',
  ACTIVE_PROJECT = 'active_project',
  SIDEBAR_STATE = 'sidebar_state',
}

export const appLocalStorage = {
  getTheme(): ThemeName {
    const localThemeName = localStorage.getItem(AppLocalStorageItems.THEME)
    if (localThemeName !== ThemeName.DARK) {
      localStorage.setItem(AppLocalStorageItems.THEME, ThemeName.LIGHT)
      return ThemeName.LIGHT
    }
    return ThemeName.DARK
  },
  setTheme(themeName: ThemeName) {
    localStorage.setItem(AppLocalStorageItems.THEME, themeName)
  },
  getActiveProjectId(): number | null {
    const localActiveProject = localStorage.getItem(
      AppLocalStorageItems.ACTIVE_PROJECT,
    )
    if (localActiveProject == null) {
      return null
    }
    const activeProjectId = Number(localActiveProject)
    if (!Number.isInteger(activeProjectId)) {
      localStorage.removeItem(AppLocalStorageItems.ACTIVE_PROJECT)
      return null
    }
    return activeProjectId
  },
  setActiveProjectId(projectId: number | null) {
    if (projectId == null) {
      localStorage.removeItem(AppLocalStorageItems.ACTIVE_PROJECT)
    } else {
      localStorage.setItem(
        AppLocalStorageItems.ACTIVE_PROJECT,
        projectId.toString(),
      )
    }
  },
  isSidebarCollapsed(): boolean {
    const sidebarState = localStorage.getItem(
      AppLocalStorageItems.SIDEBAR_STATE,
    )
    if (sidebarState === 'collapsed') {
      return true
    }
    localStorage.setItem(AppLocalStorageItems.SIDEBAR_STATE, 'expanded')
    return false
  },
}
