import { Outlet } from 'react-router-dom'
import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'

// TODO: создать Sidebar
function AppLayout() {
  return (
    <div className="app">
      <Header />
      <div className="content-page">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
