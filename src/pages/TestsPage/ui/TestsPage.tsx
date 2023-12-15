import { PageFrame } from 'shared/ui/PageFrame'
import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  const left = (
    <PageFrame>
      <div style={{ width: '100%' }}>LEFT</div>
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
        min: '10%',
        max: '90%',
      }}
    />
  )
}

export default TestsPage
