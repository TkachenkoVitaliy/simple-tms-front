import { Description, Folder } from '@mui/icons-material'
import { TestNodeData } from 'entities/TestNode/model/types'
import { memo } from 'react'

export interface TypeIconProps {
  droppable: boolean
  type?: TestNodeData['type']
}

export const TypeIcon = memo((props: TypeIconProps) => {
  if (props.droppable) {
    return <Folder />
  }

  switch (props.type) {
    case 'CASE':
      return <Description />
    default:
      return null
  }
})
