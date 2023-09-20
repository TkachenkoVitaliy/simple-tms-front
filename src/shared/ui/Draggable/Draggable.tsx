import type { Identifier, XYCoord } from 'dnd-core'
import React, { CSSProperties, ReactElement, RefObject, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export interface DragItem {
  id: string
  index: number
  type: string
}

export interface DraggableProps {
  // <{
  //   style?: CSSProperties
  //   ref?: RefObject<HTMLElement>
  //   'data-handler-id'?: Identifier | null
  // }>
  move: (dragIndex: number, hoverIndex: number) => void
  index: number
  id: string
  children: React.ReactNode
}

export const Draggable = (props: DraggableProps) => {
  const { id, move, index, children } = props
  const type = 'Draggable'

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

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  const renderElement = () => {
    // return React.cloneElement(content, {
    //   ref,
    //   'data-handler-id': handlerId,
    //   style: {
    //     ...content.props.style,
    //     opacity,
    //   },
    // })

    return (
      <div
        ref={ref}
        style={{ opacity, margin: '10px' }}
        data-handler-id={handlerId}
      >
        {children}
      </div>
    )
  }

  return renderElement()
}
