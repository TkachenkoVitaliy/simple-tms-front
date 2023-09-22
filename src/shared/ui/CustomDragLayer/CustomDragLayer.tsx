import { useDragLayer } from 'react-dnd'
import { getItemStyles } from 'shared/lib/drag/itemStyles'
import React from 'react'

export interface CustomDragLayerProps {
  previewFunc: (index: number) => React.ReactElement
}

export function CustomDragLayer(
  props: CustomDragLayerProps,
): JSX.Element | null {
  const { previewFunc } = props

  const dragLayer = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  const { isDragging, item, currentOffset } = dragLayer

  if (!isDragging) {
    return null
  }

  const element = previewFunc(item.index)

  const renderItem = React.cloneElement(element, {
    ...element.props,
    style: {
      ...element.props.style,
      width: `${item.width}px`,
    },
  })

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(#2F2F2F, #2F2F2F)',
        boxShadow: '10px 10px 10px 1px #121212',
        width: 'fit-content',
        height: 'fit-content',
        ...getItemStyles(currentOffset),
      }}
    >
      {renderItem}
    </div>
  )
}
