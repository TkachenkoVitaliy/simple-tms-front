import { createContext } from 'react'
import { ThemeName } from 'shared/consts/themeNames'

export interface ThemeContextProps {
  theme?: ThemeName
  setTheme?: (theme: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})
