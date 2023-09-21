import { DndProvider, useDragLayer } from 'react-dnd'
import { getItemStyles } from 'shared/lib/itemStyles'
import { DraggableWrapperProps } from '../DraggableWrapper/DraggableWrapper'

export interface DragLayerProps {
  previewFunc: (index: number) => React.ReactNode
}

export function DragLayer(props: DragLayerProps) {
  const { previewFunc } = props

  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  function renderItem() {
    return previewFunc(item.index)
  }

  if (!isDragging) {
    return null
  }

  console.log(initialOffset, currentOffset)

  const res = (
    <div
      style={{
        ...getItemStyles(currentOffset, initialOffset),
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
      }}
    >
      {renderItem()}
    </div>
  )

  return res
}
