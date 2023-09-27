import { Divider } from '@mui/material'
import { TestsTree } from 'features/TestsTree'
import { Resizable } from 're-resizable'
import { Outlet, useOutlet } from 'react-router-dom'
import { setResizeCssVars } from 'shared/lib/resize/setResizeCssVars'

const style = {
  minHeight: '100%',
  height: '100%',
  padding: '16px',
  overflow: 'auto',
}

function TestsPage() {
  const outlet = useOutlet()

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
        ref={(ref) => {
          if (ref?.resizable) {
            setResizeCssVars(ref.resizable)
          }
        }}
        style={{ ...style, display: outlet ? 'block' : 'none' }}
        defaultSize={{
          width: '70%',
          height: 'auto',
        }}
        maxWidth="82%"
        minWidth="38%"
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
        onResize={(e, d, ref) => {
          setResizeCssVars(ref)
        }}
      >
        <div
          style={{
            width: '100%',
            minWidth: '1px',
            padding: '0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </div>
      </Resizable>
    </div>
  )
}

export default TestsPage
