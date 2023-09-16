import { Outlet } from 'react-router-dom'
import { Navbar } from 'widgets/Navbar/ui/Navbar'
import { Sidebar } from 'widgets/Sidebar'

export function AppLayout() {
  return (
    <div className="app wmde-markdown-var">
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
