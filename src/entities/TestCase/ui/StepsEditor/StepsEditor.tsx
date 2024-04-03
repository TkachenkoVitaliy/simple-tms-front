/* eslint-disable max-lines */
import { memo, useCallback, useState } from 'react'

import { Button, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { RepeatableStepSelector } from 'entities/TestCase/ui/RepeatableStepSelector'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { swapArrayItems } from 'shared/lib/utils'
import { DraggableWrapper } from 'shared/ui/DraggableWrapper'

import {
  TestCaseStep,
  TestStep,
  TestStepRepeatable,
} from '../../model/types/testCase'
import { StepEditor } from '../StepEditor/StepEditor'

import styles from './StepsEditor.module.scss'

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

  const { testCaseStore } = useProjectStores()

  const [showStepSelector, setShowStepSelector] = useState<boolean>(false)

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

  const onReorder = (newItems: ReordItem[]) => {
    const reorderedData: WrappedTestCaseStep[] = []
    newItems.forEach((item, index) => {
      const foundItem = data.find(
        (wrappedTestCaseStep) => wrappedTestCaseStep.id === item.id,
      )
      if (foundItem) {
        foundItem.item.orderNumber = index + 1
        reorderedData.push(foundItem)
      }
    })
    updateState(reorderedData)
  }

  const swapItem = (itemIndex: number, otherItemIndex: number) => {
    const swappedArray = swapArrayItems(data, itemIndex, otherItemIndex)
    swappedArray[itemIndex].item.orderNumber = itemIndex + 1
    swappedArray[otherItemIndex].item.orderNumber = otherItemIndex + 1
    updateState(swappedArray)
  }

  const removeItem = (index: number) => {
    const newArray = [...data]
    newArray.splice(index, 1)
    // eslint-disable-next-line no-plusplus
    for (let i = index; i < newArray.length; i++) {
      newArray[i].item.orderNumber = i + 1
    }
    updateState(newArray)
  }

  const addItem = (repeatable: boolean, step?: TestStep) => {
    const newUuid = uuidv4()
    const newState: WrappedTestCaseStep[] = [
      ...data,
      {
        id: newUuid,
        item: {
          orderNumber: data.length + 1,
          testStep: step || {
            id: null,
            name: repeatable ? '' : null,
            repeatable,
            action: '',
            expected: '',
            projectId: testCaseStore.projectId,
          },
        },
      },
    ]
    updateState(newState)
  }

  const addSimpleStep = () => addItem(false)

  const createRepeatableStep = () => addItem(true)

  const selectRepeatableStep = useCallback(
    (stepRepeatable: TestStepRepeatable) => {
      addItem(true, stepRepeatable)
    },
    [addItem],
  )

  return (
    <div>
      <Typography>{TITLE}</Typography>
      <DraggableWrapper
        Wrapper={<div className="wrapper" />}
        onReordering={onReorder}
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
      <div className={styles.actions}>
        <Button
          variant="outlined"
          onClick={addSimpleStep}
        >
          ADD SIMPLE STEP
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowStepSelector(true)}
        >
          ADD REPEATABLE STEP
        </Button>
        <Button
          variant="outlined"
          onClick={createRepeatableStep}
        >
          CREATE REPEATABLE STEP
        </Button>
      </div>
      <RepeatableStepSelector
        open={showStepSelector}
        onClose={() => setShowStepSelector(false)}
        onSelect={selectRepeatableStep}
      />
    </div>
  )
})
