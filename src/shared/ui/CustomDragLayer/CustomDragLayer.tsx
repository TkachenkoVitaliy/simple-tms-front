import React from 'react'

import { useDragLayer } from 'react-dnd'

import { getItemStyles } from 'shared/lib/utils'

export interface CustomDragLayerProps {
  previewFunc: (index: number) => React.ReactElement
  type: string
}

export function CustomDragLayer(
  props: CustomDragLayerProps,
): JSX.Element | null {
  const { previewFunc, type } = props

  const dragLayer = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  const { isDragging, item, currentOffset } = dragLayer

  if (!isDragging || item?.type !== type) {
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

  console.log('dsad')

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(var(--drag-layer-bg), var(--drag-layer-bg))',
        boxShadow: '10px 10px 10px 1px #121212',
        borderRadius: '6px',
        width: 'fit-content',
        height: 'fit-content',
        ...getItemStyles(currentOffset),
      }}
    >
      {renderItem}
    </div>
  )
}
