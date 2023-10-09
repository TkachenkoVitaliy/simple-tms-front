import { Description, Folder } from '@mui/icons-material'
import { memo } from 'react'
import { TreeData } from 'shared/types/treeData'

export interface TypeIconProps {
  droppable: boolean
  type?: TreeData['type']
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
