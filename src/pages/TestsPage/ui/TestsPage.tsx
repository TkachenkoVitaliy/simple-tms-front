import { Divider, useTheme } from '@mui/material'
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

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <div
        style={{
          ...style,
          width: '100%',
          minWidth: '1px',
          overflowY: 'auto',
        }}
      >
        <div style={{ width: '100%', height: '100%', overflowX: 'hidden' }}>
          <TestsTree />
        </div>
      </div>
      <Divider
        component="div"
        orientation="vertical"
      />
      <Resizable
        // style={{ ...style, borderLeft: `1px solid ${divider}` }}
        style={{ ...style }}
        defaultSize={{
          width: '70%',
          height: '100%',
        }}
        maxWidth="87%"
        minWidth="13%"
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <div style={{ ...style, width: '100%', minWidth: '1px', padding: '0' }}>
          <Outlet />
        </div>
      </Resizable>
    </div>
  )
}

export default TestsPage
