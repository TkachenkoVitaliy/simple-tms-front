/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/function-component-definition */
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import { useState, useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import { Draggable } from '../Draggable/Draggable'

export interface DraggableWrapperProps {
  Wrapper: React.ReactElement<{ children?: React.ReactNode }>
  // children: React.ReactNode
  children:
    | React.ReactElement<{ id: string }>
    | React.ReactElement<{ id: string }>[]
  onReordering: (newOrdering: { id: string }[]) => void
}

export const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { Wrapper, children, onReordering } = props
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

  console.log(children)

  return (
    <DndProvider backend={MultiBackend}>
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
