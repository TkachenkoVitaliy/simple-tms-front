import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { memo } from 'react'
import { ThemeName } from 'shared/consts/theme'
import { useTheme } from 'shared/lib/hooks/useTheme'

export const ThemeSwitcher = memo(() => {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton onClick={toggleTheme}>
      {theme === ThemeName.DARK ? (
        <DarkModeOutlined color="info" />
      ) : (
        <LightModeOutlined color="warning" />
      )}
    </IconButton>
  )
})
