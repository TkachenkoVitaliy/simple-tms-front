/* eslint-disable react/function-component-definition */
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import { useState, useCallback } from 'react'
import update from 'immutability-helper'
import { Draggable } from '../Draggable/Draggable'

export interface DraggableWrapperProps {
  Wrapper: React.FC<{ children?: React.ReactNode }>
  // children: React.ReactNode
  children:
    | React.ReactElement<{ id: string }>
    | React.ReactElement<{ id: string }>[]
  onReordering: (newOrdering: { id: string }[]) => void
}

export const DraggableWrapper = (props: DraggableWrapperProps) => {
  const { Wrapper, children, onReordering } = props
  const type = 'Draggable'

  const [data, setData] = useState<{ id: string }[]>([
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
  ])

  const move = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevData: { id: string }[]) =>
      update(prevData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevData[dragIndex] as { id: string }],
        ],
      }),
    )
  }, [])

  console.log(children)

  return (
    <DndProvider backend={MultiBackend}>
      <Wrapper>
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
            move={(dragIndex, hoverIndex) => {
              console.log(dragIndex, hoverIndex)
            }}
            id={children.props.id}
            index={0}
          >
            <children.type {...children.props} />
          </Draggable>
        )}
      </Wrapper>
    </DndProvider>
  )
}
