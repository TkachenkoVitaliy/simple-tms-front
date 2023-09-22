import { Delete, DeleteForever } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { memo } from 'react'

export interface StepValue {
  action: string
  expected: string
}

export interface StepEditorProps {
  value: StepValue
  onChange: (value: StepValue, id?: number | string | undefined) => void
  id?: number | string
  index: number
}

export const StepEditor = memo((props: StepEditorProps) => {
  const { value, onChange, id, index } = props

  const EditorMinHeight = '100px'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'min-content 1fr 1fr min-content',
        gap: '10px',
        padding: '20px',
        border: '1px solid',
        borderRadius: '6px',
        borderColor: 'var(--mui-palette-divider)',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Avatar>{index + 1}</Avatar>
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
          style={{ minHeight: EditorMinHeight, cursor: 'default' }}
          height="100%"
          visibleDragbar={false}
          value={value.action}
          onChange={(newVal) =>
            onChange({ action: newVal || '', expected: value.expected }, id)
          }
          preview="edit"
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
          style={{ minHeight: EditorMinHeight, cursor: 'default' }}
          height="100%"
          visibleDragbar={false}
          value={value.expected}
          onChange={(newVal) =>
            onChange({ action: value.action, expected: newVal || '' }, id)
          }
          preview="edit"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <IconButton
          className="delete"
          draggable
          onDragStart={(event) => event.preventDefault()}
        >
          <DeleteForever />
        </IconButton>
      </div>
    </div>
  )
})
