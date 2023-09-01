import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { memo } from 'react'
import { ThemeName } from 'shared/consts/theme'
import { useTheme } from 'shared/lib/hooks/useTheme'

export const ThemeSwitcher = memo(() => {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton
      onClick={toggleTheme}
      component="button"
    >
      {theme === ThemeName.DARK ? (
        <DarkModeOutlined color="info" />
      ) : (
        <LightModeOutlined color="warning" />
      )}
    </IconButton>
  )
})
