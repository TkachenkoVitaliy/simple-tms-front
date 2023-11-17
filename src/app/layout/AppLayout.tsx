import { Outlet } from 'react-router-dom'

// TODO: создать Navbar, Sidebar
export function AppLayout() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <div className="content-page">
        {/* <Sidebar /> */}
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
