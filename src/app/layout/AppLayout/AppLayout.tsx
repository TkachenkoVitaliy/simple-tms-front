import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'

// TODO: создать Sidebar
function AppLayout() {
  const params = useParams()
  console.log(params)

  useEffect(() => {
    console.log('projectId', params.projectId)
  }, [params.projectId])

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
