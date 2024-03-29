import { observer } from 'mobx-react-lite'

import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { TestsTree } from 'widgets/TestsTree'

import { projectStore } from 'entities/Project'

import { RouteParams } from 'shared/types/router'
import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  const outlet = useOutlet()
  const navigate = useNavigate()
  const { projectId } = useParams<RouteParams>()

  const left = (
    <PageFrame>
      <TestsTree />
    </PageFrame>
  )

  const right = outlet ? (
    <PageFrame>
      <Outlet />
    </PageFrame>
  ) : null

  if (
    projectStore.activeProjectId === null ||
    projectStore.activeProjectId.toString() !== projectId
  ) {
    navigate('../../')
  }

  return (
    <ResizableWrapper
      firstElement={left}
      secondElement={right}
      secondElementWidth={{
        default: '50%',
        min: '42%',
        max: '80%',
      }}
    />
  )
}

export default observer(TestsPage)
