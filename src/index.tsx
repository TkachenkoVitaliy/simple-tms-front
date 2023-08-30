import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './app/App'

import './app/styles/index.scss'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
