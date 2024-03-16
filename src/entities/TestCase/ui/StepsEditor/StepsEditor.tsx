/* eslint-disable max-lines */
import { memo, useMemo, useState } from 'react'

import { Button, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { projectStore } from 'entities/Project'

import { swapArrayItems } from 'shared/lib/utils'
import { DraggableWrapper } from 'shared/ui/DraggableWrapper'

import { TestCaseStep } from '../../model/types/testCase'
import { StepEditor } from '../StepEditor/StepEditor'

const TITLE = 'Steps'

interface ReordItem {
  id: string
}

export interface StepsEditorProps {
  values: TestCaseStep[]
  setValues: (values: TestCaseStep[]) => void
}

type WrappedTestCaseStep = ReordItem & { item: TestCaseStep }

export const StepsEditor = memo((props: StepsEditorProps) => {
  const { values, setValues } = props

  console.log('values', values)

  const [data, setData] = useState<WrappedTestCaseStep[]>(
    values.map((item) => ({
      id: uuidv4(),
      item,
    })),
  )

  const mapToValues = (data: WrappedTestCaseStep[]) => {
    return data.map((item) => item.item)
  }

  const updateState = (newState: WrappedTestCaseStep[]) => {
    setValues(mapToValues(newState))
    setData(newState)
  }

  // const data: WrappedTestCaseStep[] = useMemo(() => {
  //   return values.map((item) => ({
  //     id: uuidv4(),
  //     item,
  //   }))
  // }, [values])

  const onChangeStep = (
    newStepValue: TestCaseStep['testStep'],
    orderNumber: number,
  ) => {
    const updatedValues: WrappedTestCaseStep[] = data.map(
      (wrappedTestCaseStep) => {
        if (wrappedTestCaseStep.item.orderNumber === orderNumber) {
          return {
            id: wrappedTestCaseStep.id,
            item: { ...wrappedTestCaseStep.item, testStep: newStepValue },
          }
        }
        return wrappedTestCaseStep
      },
    )
    updateState(updatedValues)
  }

  const onReord = (newItems: ReordItem[]) => {
    const reoderedData: WrappedTestCaseStep[] = []
    newItems.forEach((item, index) => {
      const foundItem = data.find(
        (wrappedTestCaseStep) => wrappedTestCaseStep.id === item.id,
      )
      if (foundItem) {
        foundItem.item.orderNumber = index + 1
        reoderedData.push(foundItem)
      }
    })
    updateState(reoderedData)
    // newItems.forEach((item, index) => {
    //   const foundedDataItem = data.find((dataItem) => dataItem.id === item.id)
    //   if (foundedDataItem) {
    //     reoderedValues.push({
    //       orderNumber: index + 1,
    //       testStep: foundedDataItem.item.testStep,
    //     })
    //   }
    // })
    // setValues(reoderedValues)
  }

  const swapItem = (itemIndex: number, otherItemIndex: number) => {
    const swappedArray = swapArrayItems(data, itemIndex, otherItemIndex)
    swappedArray[itemIndex].item.orderNumber = itemIndex + 1
    swappedArray[otherItemIndex].item.orderNumber = otherItemIndex + 1
    updateState(swappedArray)
    console.log(JSON.stringify(swappedArray))
    // const swappedArray = swapArrayItems(values, itemIndex, otherItemIndex)
    // swappedArray[itemIndex].orderNumber = itemIndex + 1
    // swappedArray[otherItemIndex].orderNumber = otherItemIndex + 1
    // setValues(swappedArray)
  }

  const removeItem = (index: number) => {
    const newArray = [...data]
    newArray.splice(index, 1)
    // eslint-disable-next-line no-plusplus
    for (let i = index; i < newArray.length; i++) {
      newArray[i].item.orderNumber = i + 1
    }
    updateState(newArray)
    // const newArray = [...values]
    // newArray.splice(index, 1)
    // // eslint-disable-next-line no-plusplus
    // for (let i = index; i < newArray.length; i++) {
    //   newArray[i].orderNumber = i + 1
    // }
    // setValues(newArray)
  }

  const addItem = () => {
    const newUuid = uuidv4()
    const newState: WrappedTestCaseStep[] = [
      ...data,
      {
        id: newUuid,
        item: {
          orderNumber: data.length + 1,
          testStep: {
            id: null,
            name: null,
            repeatable: false,
            action: '',
            expected: '',
            projectId: projectStore.activeProjectId || undefined,
          },
        },
      },
    ]
    updateState(newState)
  }

  return (
    <div>
      <Typography>{TITLE}</Typography>
      <DraggableWrapper
        Wrapper={<div className="wrapper" />}
        onReordering={onReord}
        type="StepsEditor"
        renderDragLayer={(index) => (
          <div>
            <StepEditor
              value={data[index]?.item.testStep}
              index={index}
              lastIndex={data.length - 1}
              preview="preview"
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
              value={item.item.testStep}
              onChange={onChangeStep}
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
        onClick={addItem}
      >
        ADD
      </Button>
    </div>
  )
})
