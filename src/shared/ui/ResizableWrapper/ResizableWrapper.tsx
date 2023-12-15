import { Divider } from '@mui/material'
import { Resizable } from 're-resizable'

import { setResizeCssVars } from 'shared/lib/utils'

const style = {
  minHeight: '100%',
  height: '100%',
  padding: '16px',
  overflow: 'auto',
}

export interface ResizableWrapperProps {
  firstElement: React.ReactNode
  secondElement: React.ReactNode
  secondElementWidth: {
    min: string
    max: string
    default: string
  }
}

// TODO: сделать реализацию для вертикального расположение элементов (divider orientation=horizontal)
export const ResizableWrapper = (props: ResizableWrapperProps) => {
  const { firstElement, secondElement, secondElementWidth } = props
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {firstElement}
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
        style={{
          ...style,
          display: !!firstElement && !!secondElement ? 'block' : 'none',
        }}
        defaultSize={{
          width: secondElementWidth.default,
          height: 'auto',
        }}
        maxWidth={secondElementWidth.max}
        minWidth={secondElementWidth.min}
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
        {secondElement}
      </Resizable>
    </div>
  )
}
