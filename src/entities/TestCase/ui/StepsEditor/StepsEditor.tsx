import { useState } from 'react'
import { DraggableWrapper } from 'shared/ui/DraggableWrapper/DraggableWrapper'
import { TestInput } from 'shared/ui/TestInput'
import { Button, Typography } from '@mui/material'
import { StepEditor, StepValue } from '../StepEditor/StepEditor'

interface StepData {
  id: string
  step: StepValue
}

interface ReordItem {
  id: string
}

export function StepsEditor() {
  const [data, setData] = useState<StepData[]>([
    {
      id: '0',
      step: {
        action: '',
        expected: '',
      },
    },
  ])

  const title = 'Steps'

  const onChangeStep = (value: StepValue, id?: string | number) => {
    if (id !== undefined) {
      const stringId = id.toString()
      const newData: StepData[] = data.map((item) => ({
        id: item.id,
        step: item.id === stringId ? value : item.step,
      }))
      setData(newData)
    }
  }

  const onReord = (newItems: ReordItem[]) => {
    const newData: StepData[] = []
    newItems.forEach((item) => {
      const foundedDataItem = data.find((dataItem) => dataItem.id === item.id)
      if (foundedDataItem) {
        newData.push(foundedDataItem)
      }
    })
    setData(newData)
  }

  // const onReord = (newItems: ReordItem[]) => {
  //   const newData: IData[] = []
  //   newItems.forEach((item) => {
  //     const foundedDataItem = data.find((dataItem) => dataItem.id === item.id)
  //     if (foundedDataItem) {
  //       newData.push(foundedDataItem)
  //     }
  //   })
  //   setData(newData)
  // }

  // const onChangeInputVal = (value: string, id?: string | number) => {
  //   if (id !== undefined) {
  //     const stringId = id.toString()
  //     const newData: IData[] = data.map((item) => ({
  //       id: item.id,
  //       text: item.id === stringId ? value : item.text,
  //     }))
  //     setData(newData)
  //   }
  // }

  return (
    <div>
      <Typography>{title}</Typography>
      <DraggableWrapper
        Wrapper={<div className="wrapper" />}
        onReordering={onReord}
        renderDragLayer={(index) => {
          console.log(index, data[index], data)

          return (
            <div>
              <StepEditor
                value={data[index]?.step}
                onChange={onChangeStep}
                id={data[index]?.id}
                index={index}
              />
            </div>
          )
        }}
      >
        {data.map((item, index) => {
          return (
            <div
              key={item.id}
              id={item.id}
            >
              <StepEditor
                key={item.id}
                value={item.step}
                onChange={onChangeStep}
                id={item.id}
                index={index}
              />
            </div>
          )
          // (
          //   <div
          //     key={item.id}
          //     style={{
          //       border: '2px solid white',
          //       padding: '20px',
          //       margin: '20px',
          //     }}
          //     id={item.id}
          //   >
          //     <TestInput
          //       index={index + 1}
          //       id={item.id}
          //       value={item.text}
          //       onChange={onChangeInputVal}
          //     />
          //   </div>
          // )
        })}
      </DraggableWrapper>
      <Button
        variant="outlined"
        onClick={() =>
          setData([
            ...data,
            {
              id: (data.length + 1).toString(),
              step: {
                action: '',
                expected: '',
              },
            },
          ])
        }
      >
        ADD
      </Button>
    </div>
  )
}
