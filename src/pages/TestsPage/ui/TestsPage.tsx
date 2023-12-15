import { ResizableWrapper } from 'shared/ui/ResizableWrapper'

function TestsPage() {
  return (
    <ResizableWrapper
      firstElement={<div style={{ width: '100%' }}>LEFT</div>}
      secondElement={<div style={{ width: '100%' }}>RIGHT</div>}
      secondElementWidth={{
        default: '50%',
        min: '10%',
        max: '90%',
      }}
    />
  )
}

export default TestsPage
