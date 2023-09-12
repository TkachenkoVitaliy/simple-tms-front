import { NodeModel } from '@minoru/react-dnd-treeview'
import { TreeData } from 'shared/types/treeData'

export const sampleData: NodeModel<TreeData>[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: 'File 1-1',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: 'File 1-2',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: 'File 2-1-1',
    data: {
      children: [],
      type: 'case',
    },
  },
  {
    id: 7,
    parent: 0,
    droppable: false,
    text: 'File 3',
    data: {
      children: [],
      type: 'case',
    },
  },
]
