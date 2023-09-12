import { Description, Folder } from '@mui/icons-material'
import { memo } from 'react'

export interface TypeIconProps {
  droppable: boolean
  fileType?: string
}

export const TypeIcon = memo((props: TypeIconProps) => {
  if (props.droppable) {
    return <Folder />
  }

  switch (props.fileType) {
    case 'case':
      return <Description />
    default:
      return null
  }
})
