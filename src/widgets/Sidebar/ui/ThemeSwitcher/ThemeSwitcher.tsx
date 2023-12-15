import { memo } from 'react'

import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

import { ThemeName } from 'shared/consts/themeNames'
import { useTheme } from 'shared/lib/hooks/useTheme'

import styles from './ThemeSwitcher.module.scss'

export const ThemeSwitcher = memo(() => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Box className={styles.box}>
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
    </Box>
  )
})
