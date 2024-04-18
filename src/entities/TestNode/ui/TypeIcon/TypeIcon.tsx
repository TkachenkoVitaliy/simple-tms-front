import { Description, Folder } from '@mui/icons-material'

import { TestNodeType } from 'shared/consts/types/testNodeType'

import { TestNodeData } from '../../model/types/testNode'

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
      return <Description />
  }
}
