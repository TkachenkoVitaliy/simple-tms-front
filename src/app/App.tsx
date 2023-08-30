import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Icon from 'shared/assets/shutdown.svg'
import { Navbar } from '../widgets/Navbar/ui/Navbar'
import { AppRouter } from './providers/AppRouter'

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Icon />
        <div className="app">
          <Navbar />
          <div className="content-page">
            <div>Sidebar</div>
            <AppRouter />
          </div>
        </div>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
