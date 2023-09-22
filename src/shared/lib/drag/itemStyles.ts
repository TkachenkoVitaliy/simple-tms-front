import type { XYCoord } from 'react-dnd'

export function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`

  const styles: React.CSSProperties = {
    transform,
    WebkitTransform: transform,
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 1000000,
    // top,
    top: '0px',
    // left,
    left: '0px',
  }

  console.log(styles)
  return styles
}
