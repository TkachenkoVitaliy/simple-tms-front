import { projectStore } from 'entities/Project/model/store/projectStore'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'

// TODO: создать Sidebar
function AppLayout() {
  const params = useParams()

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error != null) {
      throw new Error(error)
    }
  }, [error])

  useEffect(() => {
    const projectId = Number(params.projectId)
    projectStore
      .initActiveProject(Number.isNaN(projectId) ? undefined : projectId)
      .catch((catchedError: Error) => {
        setError(catchedError.message)
      })
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
