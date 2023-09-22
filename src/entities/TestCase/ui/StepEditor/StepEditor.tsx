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

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>{index + 1}</div>
      <div>
        Action
        <MDEditor
          style={{ minHeight: '200px' }}
          height="100%"
          visibleDragbar={false}
          value={value.action}
          onChange={(newVal) =>
            onChange({ action: newVal || '', expected: value.expected }, id)
          }
          preview="edit"
        />
      </div>
      <div>
        Expected
        <MDEditor
          style={{ minHeight: '200px' }}
          height="100%"
          visibleDragbar={false}
          value={value.expected}
          onChange={(newVal) =>
            onChange({ action: value.action, expected: newVal || '' }, id)
          }
          preview="edit"
        />
      </div>
    </div>
  )
})
