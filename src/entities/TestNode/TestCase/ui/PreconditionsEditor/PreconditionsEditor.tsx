import { Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { memo } from 'react'

export interface PreconditionsEditorProps {
  preconditions: string
  setPreconditions: React.Dispatch<React.SetStateAction<string>>
}

export const PreconditionsEditor = memo((props: PreconditionsEditorProps) => {
  const { preconditions, setPreconditions } = props
  const title = 'Preconditions'

  return (
    <div style={{ marginTop: '18px' }}>
      <Typography>{title}</Typography>
      <MDEditor
        style={{ minHeight: '200px' }}
        height="100%"
        visibleDragbar={false}
        value={preconditions}
        onChange={(newVal) => setPreconditions(newVal || '')}
        preview="edit"
      />
    </div>
  )
})
