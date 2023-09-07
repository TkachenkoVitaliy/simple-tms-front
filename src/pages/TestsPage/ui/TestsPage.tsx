import { Outlet } from 'react-router-dom'

function TestsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ width: '100%', height: '100%' }}>TestsPage</div>
      <div
        className="testContent"
        style={{ width: '100%', height: '100%' }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default TestsPage
