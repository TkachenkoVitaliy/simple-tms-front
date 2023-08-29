import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Lazy from './Lazy'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Lazy />
  </BrowserRouter>,
)
