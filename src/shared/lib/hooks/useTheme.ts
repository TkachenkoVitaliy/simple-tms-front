import { useContext } from 'react'

import { ThemeName } from 'shared/consts/themeNames'

import { ThemeContext } from '../context/ThemeContext'
import { appLocalStorage } from '../utils'

export interface UseThemeResult {
  theme: ThemeName
  toggleTheme: () => void
}

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT
    setTheme?.(newTheme)
    appLocalStorage.setTheme(newTheme)
  }

  return {
    theme: theme || ThemeName.LIGHT,
    toggleTheme,
  }
}
