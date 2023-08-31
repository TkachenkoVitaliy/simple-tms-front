import { useContext } from 'react'
import { ThemeName } from 'shared/consts/theme'
import { LOCAL_STORAGE_THEME_KEY } from 'shared/consts/localstorage'
import { ThemeContext } from '../context/ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: ThemeName
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT
    setTheme?.(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme: theme || ThemeName.LIGHT,
    toggleTheme,
  }
}
