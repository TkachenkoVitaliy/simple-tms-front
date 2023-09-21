import type { XYCoord } from 'react-dnd'

export function getItemStyles(
  currentOffset: XYCoord | null,
  initialOffset: XYCoord | null,
) {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const x1 = initialOffset?.x || 0
  const y1 = initialOffset?.y || 0

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}
