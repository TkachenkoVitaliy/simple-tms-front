import { NodeModel } from '@minoru/react-dnd-treeview'
import { TreeData } from 'shared/types/treeData'

export const sampleData: NodeModel<TreeData>[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Suite 1',
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: 'Test 1 aaaaaaaaaa bbbbbbbbbbbb ccccccccccccc dddddddddddd',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: 'Test 2',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Suite 2',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Suite 3',
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: 'Test 3',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 7,
    parent: 0,
    droppable: false,
    text: 'Test 4',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 8,
    parent: 0,
    droppable: true,
    text: 'Suite 4',
  },
]
