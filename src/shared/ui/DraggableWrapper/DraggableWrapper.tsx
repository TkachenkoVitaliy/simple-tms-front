/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/function-component-definition */
import { DndProvider, useDragLayer } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import { usePreview } from 'react-dnd-preview'
import { useState, useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import { Height } from '@mui/icons-material'
import { getItemStyles } from 'shared/lib/itemStyles'
import { Draggable } from '../Draggable/Draggable'
import { DragLayer, DragLayerProps } from '../DragLayer/DragLayer'

export interface DraggableWrapperProps {
  Wrapper: React.ReactElement<{ children?: React.ReactNode }>
  // children: React.ReactNode
  children:
    | React.ReactElement<{ id: string }>
    | React.ReactElement<{ id: string }>[]
  onReordering: (newOrdering: { id: string }[]) => void
  previewFunc?: DragLayerProps['previewFunc']
}

export const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { Wrapper, children, onReordering, previewFunc } = props
  const type = 'Draggable'

  let data = Array.isArray(children)
    ? children.map((child) => ({
        id: child.props.id,
      }))
    : [{ id: children.props.id }]

  useEffect(() => {
    data = Array.isArray(children)
      ? children.map((child) => ({
          id: child.props.id,
        }))
      : [{ id: children.props.id }]
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

  // const MyPreview = () => {
  //   const preview = usePreview()
  //   if (!preview.display) {
  //     return null
  //   }
  //   const { itemType, item, style, monitor, ref } = preview
  //   console.log(preview)
  //   return <div style={{ ...style, height: '90px', zIndex: 100000 }}>ABRA </div>
  // }

  // console.log(children)

  return (
    <DndProvider backend={MultiBackend}>
      {previewFunc ? <DragLayer previewFunc={previewFunc} /> : null}
      <Wrapper.type {...Wrapper.props}>
        {Array.isArray(children) ? (
          children.map((child, index) => {
            return (
              <Draggable
                key={child.props.id}
                move={move}
                id={child.props.id}
                index={index}
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
