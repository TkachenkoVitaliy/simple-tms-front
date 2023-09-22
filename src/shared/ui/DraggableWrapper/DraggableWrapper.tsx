import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import { useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import { Draggable } from '../Draggable/Draggable'
import {
  CustomDragLayer,
  CustomDragLayerProps,
} from '../CustomDragLayer/CustomDragLayer'

export interface DraggableWrapperProps {
  Wrapper: React.ReactElement<{ children?: React.ReactNode }>
  children:
    | React.ReactElement<{ id: string }>
    | React.ReactElement<{ id: string }>[]
  onReordering: (newOrdering: { id: string }[]) => void
  renderDragLayer?: CustomDragLayerProps['previewFunc']
}

export const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { Wrapper, children, onReordering, renderDragLayer } = props
  const type = 'Draggable'

  let data = Array.isArray(children)
    ? children.map((child) => ({
        id: child.props.id,
      }))
    : [{ id: children.props.id }]

  console.log('INIT', data)

  useEffect(() => {
    console.log('EFFECT CHILDREN', children)
    data = Array.isArray(children)
      ? children.map((child) => ({
          id: child.props.id,
        }))
      : [{ id: children.props.id }]
    console.log('EFFECT', data)
  }, [children])

  const move = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const copyData = [...data]
      const newData = update(copyData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, copyData[dragIndex] as { id: string }],
        ],
      })
      data = newData
      onReordering(data)
    },
    [children],
  )

  return (
    <DndProvider backend={MultiBackend}>
      {renderDragLayer && <CustomDragLayer previewFunc={renderDragLayer} />}
      <Wrapper.type {...Wrapper.props}>
        {Array.isArray(children) ? (
          children.map((child, index) => {
            return (
              <Draggable
                key={child.props.id}
                move={move}
                id={child.props.id}
                index={index}
                customDragLayer={!!renderDragLayer}
              >
                <child.type {...child.props} />
              </Draggable>
            )
          })
        ) : (
          <Draggable
            key={children.props.id}
            move={move}
            id={children.props.id}
            index={0}
          >
            <children.type {...children.props} />
          </Draggable>
        )}
      </Wrapper.type>
    </DndProvider>
  )
}
