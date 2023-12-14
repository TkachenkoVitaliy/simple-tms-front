import { Theme } from '@mui/material'

export function updateCss(theme: Theme) {
  const root = document.documentElement
  const { mode, primary, success, text, divider, background, info } =
    theme.palette

  root.setAttribute('data-color-mode', mode)

  root.style.setProperty(
    '--drag-layer-bg',
    mode === 'dark' ? '#2f2f2f' : '#ffffff',
  )

  root.style.setProperty(
    '--drag-layer-shadow',
    mode === 'dark' ? '#121212' : '#f5f5f5',
  )

  root.style.setProperty('--mui-pallete-info-main', info.main)

  root.style.setProperty('--mui-contrast-text', primary.contrastText)

  root.style.setProperty('--mui-success-light', success.light)

  root.style.setProperty('--mui-palette-text-primary', text.primary)

  root.style.setProperty('--mui-palette-text-secondary', text.secondary)

  root.style.setProperty('--mui-palette-primary-main', primary.main)

  root.style.setProperty('--mui-palette-divider', divider)

  root.style.setProperty('--mui-palatte-background-default', background.default)

  root.style.setProperty(
    '--mui-palette-background-paper',
    mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
  )
}
