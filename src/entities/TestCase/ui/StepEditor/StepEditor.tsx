/* eslint-disable max-lines */
import { memo, useEffect } from 'react'

import { DeleteForever } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import MDEditor, { PreviewType } from '@uiw/react-md-editor'
import { useForm } from 'react-hook-form'

import ArrowDown from 'shared/assets/svg/arrows/arrow-down.svg'
import ArrowUp from 'shared/assets/svg/arrows/arrow-up.svg'
import { FormTextField } from 'shared/ui/FormTextField'

import {
  NewTestStep,
  TestStep,
  TestStepRepeatable,
} from '../../model/types/testCase'

import styles from './StepEditor.module.scss'

const EDITOR_MIN_HEIGHT = '100px'

type FormInputs = {
  name: TestStepRepeatable['name']
}

export interface StepEditorProps {
  value: TestStep | NewTestStep
  onChange?: (value: TestStep | NewTestStep, orderNumber: number) => void
  index: number
  lastIndex: number
  margin?: string
  swapItem?: (indexFirst: number, indexSecond: number) => void
  removeItem?: (index: number) => void
  preview?: PreviewType
  setItemValidity?: (isValid: boolean, index: number) => void
}

export const StepEditor = memo((props: StepEditorProps) => {
  const {
    value,
    onChange,
    index,
    lastIndex,
    margin,
    swapItem,
    removeItem,
    preview,
    setItemValidity,
  } = props

  let titleElement = null

  if (value.repeatable) {
    const methods = useForm<FormInputs>({
      mode: 'onTouched',
      values: {
        name: value.name as string,
      },
    })

    const {
      control,
      formState: { isValid },
    } = methods

    const formValues = methods.watch()

    useEffect(() => {
      setItemValidity?.(isValid, index)
    }, [isValid])

    useEffect(() => {
      onChange?.({ ...value, name: formValues.name }, index + 1)
    }, [formValues])

    titleElement = (
      <FormTextField
        name="name"
        control={control}
        rules={{ required: 'This field is required' }}
        emptyHelperText=" "
        validateOnFocus
        disableDrag
      />
    )
  }

  const swapWithPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (swapItem) {
      swapItem(index, index - 1)
    }
  }

  const swapWithNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (swapItem) {
      swapItem(index, index + 1)
    }
  }

  return (
    <div
      className={styles.stepWrapper}
      style={{ margin }}
    >
      {value.repeatable ? titleElement : null}
      <div className={styles.step}>
        <div className={styles.leftSide}>
          <IconButton
            draggable
            onDragStart={(event) => event.preventDefault()}
            disabled={index < 1}
            className={index < 1 ? 'disabledTms' : ''}
            onClick={swapWithPrev}
          >
            <ArrowUp fill="var(--mui-palette-text-primary)" />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {index + 1}
          </Avatar>
          <IconButton
            draggable
            onDragStart={(event) => event.preventDefault()}
            disabled={index >= lastIndex}
            className={index >= lastIndex ? 'disabledTms' : ''}
            onClick={swapWithNext}
          >
            <ArrowDown fill="var(--mui-palette-text-primary)" />
          </IconButton>
        </div>
        <div
          style={{
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'min-content 1fr',
          }}
        >
          <div style={{ marginBottom: '10px' }}>Action</div>
          <MDEditor
            draggable
            onDragStart={(event) => event.preventDefault()}
            style={{ minHeight: EDITOR_MIN_HEIGHT, cursor: 'default' }}
            height="100%"
            visibleDragbar={false}
            value={value.action}
            onChange={(newVal) => {
              onChange?.({ ...value, action: newVal || '' }, index + 1)
            }}
            preview={preview || 'edit'}
          />
        </div>
        <div
          style={{
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'min-content 1fr',
          }}
        >
          <div style={{ marginBottom: '10px' }}>Expected</div>
          <MDEditor
            draggable
            onDragStart={(event) => event.preventDefault()}
            style={{ minHeight: EDITOR_MIN_HEIGHT, cursor: 'default' }}
            height="100%"
            visibleDragbar={false}
            value={value.expected}
            onChange={(newVal) => {
              onChange?.({ ...value, expected: newVal || '' }, index + 1)
            }}
            preview={preview || 'edit'}
          />
        </div>
        <div className={styles.rightSide}>
          <IconButton
            draggable
            onDragStart={(event) => event.preventDefault()}
            onClick={() => removeItem?.(index)}
            disabled={lastIndex < 1}
            className={lastIndex < 1 ? 'disabledTms delete' : 'delete'}
          >
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    </div>
  )
})
