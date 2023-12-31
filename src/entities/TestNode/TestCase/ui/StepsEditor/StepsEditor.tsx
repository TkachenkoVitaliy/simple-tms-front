import { DraggableWrapper } from 'shared/ui/DraggableWrapper/DraggableWrapper'
import { Button, Typography } from '@mui/material'
import { swapArrayItems } from 'shared/lib/arrayHelper'
import { useCallback, useEffect } from 'react'
import { StepEditor, StepValue } from '../StepEditor/StepEditor'

export interface StepData {
  id: string
  step: StepValue
}

interface ReordItem {
  id: string
}

export interface StepsEditorProps {
  data: StepData[]
  setData: React.Dispatch<React.SetStateAction<StepData[]>>
}

export function StepsEditor(props: StepsEditorProps) {
  const { data, setData } = props
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

  const swapItem = (itemIndex: number, otherItemIndex: number) => {
    setData(swapArrayItems(data, itemIndex, otherItemIndex))
  }

  const removeItem = (index: number) => {
    const newArr = [...data]
    newArr.splice(index, 1)
    setData(newArr)
  }

  return (
    <div>
      <Typography>{title}</Typography>
      <DraggableWrapper
        Wrapper={<div className="wrapper" />}
        onReordering={onReord}
        type="StepsEditor"
        renderDragLayer={(index) => (
          <div>
            <StepEditor
              value={data[index]?.step}
              id={data[index]?.id}
              index={index}
              lastIndex={data.length - 1}
            />
          </div>
        )}
      >
        {data.map((item, index) => (
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
              margin="20px 0"
              lastIndex={data.length - 1}
              swapItem={swapItem}
              removeItem={removeItem}
            />
          </div>
        ))}
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
