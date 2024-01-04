import { TestsTree } from 'widgets/TestsTree'

import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  const left = (
    <PageFrame>
      <TestsTree />
    </PageFrame>
  )

  const right = (
    <PageFrame>
      <div style={{ width: '100%' }}>RIGHT</div>
    </PageFrame>
  )

  return (
    <ResizableWrapper
      firstElement={left}
      secondElement={right}
      secondElementWidth={{
        default: '50%',
        min: '20%',
        max: '80%',
      }}
    />
  )
}

export default TestsPage
