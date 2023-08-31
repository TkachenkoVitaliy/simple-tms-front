import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { AppThemeProvider } from 'app/providers/AppThemeProvider'
import { ThemeName } from 'shared/consts/theme'

import './app/styles/index.scss'
import { AppRouter } from 'app/providers/AppRouter'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <AppThemeProvider initialThemeName={ThemeName.DARK}>
    <CssBaseline>
      <AppRouter />
    </CssBaseline>
  </AppThemeProvider>,
)
