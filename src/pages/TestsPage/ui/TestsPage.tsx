import { Outlet, useOutlet } from 'react-router-dom'

import { TestsTree } from 'widgets/TestsTree'

import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  const outlet = useOutlet()

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

  return (
    <ResizableWrapper
      firstElement={left}
      secondElement={right}
      secondElementWidth={{
        default: '50%',
        min: '30%',
        max: '80%',
      }}
    />
  )
}

export default TestsPage
