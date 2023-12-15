import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'

import { appRoutes } from 'app/config/routes'
import { AppRouterProvider } from 'app/providers/AppRouterProvider'
import { AppThemeProvider } from 'app/providers/AppThemeProvider'

import { PageLoader } from 'widgets/PageLoader'

import { ThemeName } from 'shared/consts/themeNames'

import './app/styles/index.scss'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <AppThemeProvider initialThemeName={ThemeName.LIGHT}>
    <CssBaseline>
      <AppRouterProvider
        routes={appRoutes}
        pageFallback={<PageLoader />}
      />
    </CssBaseline>
  </AppThemeProvider>,
)
