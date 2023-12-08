import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { ReactNode, useEffect, useMemo, useState } from 'react'
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
