import { Description, Folder } from '@mui/icons-material'

import { TestNodeType } from 'shared/consts/types/testNodeType'

import { TestNodeData } from '../../model/types/testNode'

export interface TypeIconProps {
  type?: TestNodeData['type']
}

// TODO: refactor

export const TypeIcon = (props: TypeIconProps) => {
  const { type } = props
  // if (droppable) {
  //   return <Folder />
  // }

  switch (type) {
    case TestNodeType.SUITE:
      return <Folder />
    case TestNodeType.CASE:
      return <Description />
    default:
      return null
  }
}
