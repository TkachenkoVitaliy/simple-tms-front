/* eslint-disable max-lines */
import { memo } from 'react'

import { DeleteForever } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import MDEditor, { PreviewType } from '@uiw/react-md-editor'

import ArrowDown from 'shared/assets/svg/arrows/arrow-down.svg'
import ArrowUp from 'shared/assets/svg/arrows/arrow-up.svg'

import { NewTestStep, TestStep } from '../../model/types/testCase'

import styles from './StepEditor.module.scss'

const EDITOR_MIN_HEIGHT = '100px'

export interface StepEditorProps {
  value: TestStep | NewTestStep
  onChange?: (value: TestStep | NewTestStep, orderNumber: number) => void
  id: string
  index: number
  lastIndex: number
  margin?: string
  swapItem?: (indexFirst: number, indexSecond: number) => void
  removeItem?: (index: number) => void
  preview?: PreviewType
}

export const StepEditor = memo((props: StepEditorProps) => {
  const {
    value,
    onChange,
    id,
    index,
    lastIndex,
    margin,
    swapItem,
    removeItem,
    preview,
  } = props

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
  )
})
