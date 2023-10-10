import { NodeModel } from '@minoru/react-dnd-treeview'
import { TreeData } from 'shared/types/treeData'

export function createChildren(
  models: NodeModel<TreeData>[],
): NodeModel<TreeData>[] {
  const map = new Map<string | number, NodeModel<TreeData>>()
  models.forEach((node) => map.set(node.id, node))

  models.forEach((node) => {
    if (node.parent !== 0) {
      const parent = map.get(node.parent)
      if (parent && !parent?.data?.children) {
        parent.data = parent?.data
          ? parent.data
          : {
              children: [],
              id: parent.id,
              type: parent.droppable ? 'SUITE' : 'CASE',
              parentId: 0,
            }
        parent.data.children.push(node.id)
      }
    }
  })

  return Array.from(map, (entry) => entry[1])
}

export function updateChildren(
  dragSourceId: string | number,
  dragSourceParent: string | number,
  dropTargetId: string | number,
  models: NodeModel<TreeData>[],
) {
  const map = new Map<string | number, NodeModel<TreeData>>()
  models.forEach((node) => {
    if (node.id === dragSourceParent || node.id === dropTargetId)
      map.set(node.id, node)
  })

  const prevParent = map.get(dragSourceParent)

  if (prevParent) {
    if (!prevParent?.data?.children) {
      prevParent.data = prevParent?.data
        ? prevParent.data
        : {
            children: [],
            id: prevParent.id,
            type: prevParent.droppable ? 'SUITE' : 'CASE',
            parentId: 0,
          }
    }

    const { children } = prevParent.data
    prevParent.data.children =
      children.filter((value) => value !== dragSourceId) || []
  }

  const newParent = map.get(dropTargetId)

  if (newParent) {
    if (!newParent?.data?.children) {
      newParent.data = newParent?.data
        ? newParent.data
        : {
            children: [],
            id: newParent.id,
            type: newParent.droppable ? 'SUITE' : 'CASE',
            parentId: 0,
          }
    }

    newParent.data.children.push(dragSourceId)
  }

  return models
}
