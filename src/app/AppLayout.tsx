import styled from '@mui/material/styles/styled'
import { Outlet } from 'react-router-dom'
import { Navbar } from 'widgets/Navbar/ui/Navbar'
import { Sidebar } from 'widgets/Sidebar'

export function AppLayout() {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)
  console.log(Offset)

  return (
    <div className="app">
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
