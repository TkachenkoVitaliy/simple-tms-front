import { NodeModel } from '@minoru/react-dnd-treeview'
import { TestNodeData } from 'entities/TestNode/model/types'
import { SuiteOption } from 'shared/types/autocompleteTypes'

export const sampleData: NodeModel<TestNodeData>[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Suite 1',
  },
  // {
  //   id: 2,
  //   parent: 1,
  //   droppable: false,
  //   text: 'Test 1 aaaaaaaaaa bbbbbbbbbbbb ccccccccccccc dddddddddddd',
  //   data: {
  //     children: [],
  //     type: 'CASE',
  //     id: 2,
  //   },
  // },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: 'Test 2',
    data: {
      children: [],
      type: 'CASE',
      id: 3,
      parentId: 0,
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
      type: 'CASE',
      id: 6,
      parentId: 0,
    },
  },
  {
    id: 7,
    parent: 0,
    droppable: false,
    text: 'Test 4',
    data: {
      children: [],
      type: 'CASE',
      id: 7,
      parentId: 0,
    },
  },
  {
    id: 2,
    parent: 0,
    droppable: true,
    text: 'Suite 4',
  },
]

export const suites: SuiteOption[] = [
  { id: 0, name: 'Not selected' },
  ...sampleData
    .filter((item) => item.droppable)
    .map((item) => {
      return {
        id: item.id,
        name: item.text,
      }
    }),
]
