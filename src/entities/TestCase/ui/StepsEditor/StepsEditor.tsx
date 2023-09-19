import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import update from 'immutability-helper'
import { Typography } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import { Draggable } from 'shared/ui/Draggable/Draggable'

export interface StepsEditorProps {}

interface IData {
  id: string
  text: string
}

export const StepsEditor = memo((props: StepsEditorProps) => {
  const [data, setData] = useState<IData[]>([
    {
      id: '1',
      text: '11111',
    },
    {
      id: '2',
      text: '22222',
    },
    {
      id: '3',
      text: '33333',
    },
    {
      id: '4',
      text: '4444',
    },
  ])

  const move = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevData: IData[]) =>
      update(prevData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevData[dragIndex] as IData],
        ],
      }),
    )
  }, [])

  return (
    <div>
      <Typography>Steps</Typography>
      <DndProvider backend={MultiBackend}>
        {data.map((item, index) => {
          return (
            <Draggable
              id={item.id}
              key={item.id}
              move={move}
              index={index}
              content={
                <div style={{ border: '2px solid white', padding: '20px' }}>
                  <input value={item.text} />
                </div>
              }
            />
          )
        })}
      </DndProvider>
    </div>
  )
})
