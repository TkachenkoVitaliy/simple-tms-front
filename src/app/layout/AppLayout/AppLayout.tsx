import { useEffect, useState } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'

import { projectStore } from 'entities/Project/model/store/projectStore'

import { RouteParams } from 'shared/types/router'

function AppLayout() {
  const params = useParams<RouteParams>()

  // TODO: по-хорошему перенести обработку ошибок в вышестоящий компонент App, который будет стоять над всеми Layout
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error != null) {
      throw new Error(error)
    }
  }, [error])

  useEffect(() => {
    const projectId = Number(params.projectId)
    if (params.projectId !== undefined && Number.isNaN(projectId)) {
      window.history.pushState({}, '', '/projects')
    }
    projectStore
      .initActiveProject(params.projectId === undefined ? undefined : projectId)
      .catch((caughtError: Error) => {
        setError(caughtError.message)
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
