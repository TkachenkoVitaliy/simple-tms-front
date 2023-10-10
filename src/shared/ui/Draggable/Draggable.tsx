import type { Identifier, XYCoord } from 'dnd-core'
import React, { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

export interface DragItem {
  id: string
  index: number
  type: string
}

export interface DraggableProps {
  move: (dragIndex: number, hoverIndex: number) => void
  index: number
  id: string
  children: React.ReactElement<{ index: number }>
  customDragLayer?: boolean
  type: string
}

export function Draggable(props: DraggableProps) {
  const { id, move, index, children, customDragLayer, type } = props
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      move(dragIndex, hoverIndex)
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type,
    item: () => {
      return {
        id,
        index,
        width: ref.current?.firstElementChild?.getBoundingClientRect().width,
        type,
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    if (customDragLayer) {
      preview(getEmptyImage(), { captureDraggingState: true })
    }
  }, [customDragLayer])

  drag(drop(ref))

  return (
    <div
      className="draggable"
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  )
}
