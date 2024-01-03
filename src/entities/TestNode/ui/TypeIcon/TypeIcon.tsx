import { Description, Folder } from '@mui/icons-material'

import {
  TestNodeData,
  TestNodeType,
} from 'entities/TestNode/model/types/testNode'

export interface TypeIconProps {
  droppable: boolean
  type?: TestNodeData['type']
}

// TODO: refactor

export const TypeIcon = (props: TypeIconProps) => {
  const { droppable, type } = props
  if (droppable) {
    return <Folder />
  }

  switch (type) {
    case TestNodeType.CASE:
      return <Description />
    default:
      return null
  }
}
