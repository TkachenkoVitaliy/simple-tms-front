import { ReactNode, useEffect, useMemo, useState } from 'react'

import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import { ThemeName } from 'shared/consts/themeNames'
import { ThemeContext } from 'shared/lib/context/ThemeContext'
import { appLocalStorage, updateCss } from 'shared/lib/utils'

const lightTheme = createTheme({
  palette: {
    mode: ThemeName.LIGHT,
  },
})

const darkTheme = createTheme({
  palette: {
    mode: ThemeName.DARK,
  },
})

const themes = {
  [ThemeName.LIGHT]: lightTheme,
  [ThemeName.DARK]: darkTheme,
}

export interface AppThemeProviderProps {
  initialThemeName: ThemeName
  children: ReactNode
}

export const AppThemeProvider = (props: AppThemeProviderProps) => {
  const localThemeName = appLocalStorage.getTheme()

  const { initialThemeName, children } = props
  const [themeName, setThemeName] = useState<ThemeName>(
    localThemeName || initialThemeName,
  )

  // TODO: вынести куда-то отдельно
  window.onresize = () => {
    const root = document.documentElement
    root.style.setProperty('--window-height', `${window.innerHeight}px`)
  }

  const defaultProps = useMemo(
    () => ({
      theme: themeName,
      setTheme: setThemeName,
    }),
    [themeName],
  )

  const currentTheme = useMemo(() => {
    return themes[themeName]
  }, [themeName])

  useEffect(() => {
    updateCss(currentTheme)
  }, [themeName])

  return (
    <ThemeContext.Provider value={defaultProps}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
