import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { ThemeName } from 'shared/consts/themeNames'
import { AppThemeProvider } from 'app/providers/AppThemeProvider'
import AppRouterProvider from 'app/providers/AppRouterProvider/AppRouterProvider'
import { appRoutes } from 'app/config/routes'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <AppThemeProvider initialThemeName={ThemeName.LIGHT}>
    <CssBaseline>
      <AppRouterProvider routes={appRoutes} />
    </CssBaseline>
  </AppThemeProvider>,
)
