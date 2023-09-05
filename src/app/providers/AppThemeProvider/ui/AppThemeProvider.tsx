import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { ReactNode, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from 'shared/consts/localstorage'
import { ThemeName } from 'shared/consts/theme'
import { ThemeContext } from 'shared/lib/context/ThemeContext'

const defaultThemeName: ThemeName = localStorage.getItem(
  LOCAL_STORAGE_THEME_KEY,
) as ThemeName

const ligthTheme = createTheme({
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
  [ThemeName.LIGHT]: ligthTheme,
  [ThemeName.DARK]: darkTheme,
}

interface AppThemeProviderProps {
  initialThemeName?: ThemeName
  children: ReactNode
}

function AppThemeProvider({
  initialThemeName,
  children,
}: AppThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(
    defaultThemeName || initialThemeName,
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

  return (
    <ThemeContext.Provider value={defaultProps}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppThemeProvider
