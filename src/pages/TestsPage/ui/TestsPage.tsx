import { useTheme } from '@mui/material'
import { TestsTree } from 'features/TestsTree'
import { Resizable } from 're-resizable'
import { Outlet } from 'react-router-dom'

const style = {
  minHeight: '100%',
  height: '100%',
  padding: '16px',
}

function TestsPage() {
  const theme = useTheme()
  const { divider } = theme.palette
  console.log(divider)

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Resizable
        style={{ ...style, borderRight: `2px solid ${divider}` }}
        defaultSize={{
          width: '30%',
          height: '100%',
        }}
        maxWidth="80%"
        minWidth="10%"
      >
        <div style={{ width: '100%', height: '100%' }}>
          <TestsTree />
        </div>
      </Resizable>
      <div style={{ ...style, width: '100%', minWidth: '1px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default TestsPage
