import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'dnd-multi-backend'
import update from 'immutability-helper'
import { Typography } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import { Draggable } from 'shared/ui/Draggable/Draggable'
import { DraggableWrapper } from 'shared/ui/DraggableWrapper/DraggableWrapper'

interface IData {
  id: string
  text: string
}

interface ReordItem {
  id: string
}

export function StepsEditor() {
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

  // const move = useCallback((dragIndex: number, hoverIndex: number) => {
  //   setData((prevData: IData[]) =>
  //     update(prevData, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevData[dragIndex] as IData],
  //       ],
  //     }),
  //   )
  // }, [])

  // return (
  //   <div>
  //     <Typography>Steps</Typography>
  //     <DndProvider backend={MultiBackend}>
  //       {data.map((item, index) => {
  //         return (
  //           <Draggable
  //             id={item.id}
  //             key={item.id}
  //             move={move}
  //             index={index}
  //           >
  //             <div style={{ border: '2px solid white', padding: '20px' }}>
  //               <input value={item.text} />
  //             </div>
  //           </Draggable>
  //         )
  //       })}
  //     </DndProvider>
  //   </div>
  // )

  const onReord = (newItems: ReordItem[]) => {
    console.log(newItems)
  }

  return (
    <div>
      EEEE
      <DraggableWrapper
        // eslint-disable-next-line react/no-unstable-nested-components
        Wrapper={() => <div />}
        onReordering={onReord}
      >
        {data.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{ border: '2px solid white', padding: '20px' }}
              id={item.id}
            >
              <input value={item.text} />
            </div>
          )
        })}
      </DraggableWrapper>
    </div>
  )
}
