/* eslint-disable max-lines */
import { DropOptions, NodeModel, TreeMethods } from '@minoru/react-dnd-treeview'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TreeNode } from 'shared/ui/TreeNode/TreeNode'
import { TreeNodeDrag } from 'shared/ui/TreeNodeDrag/TreeNodeDrag'
import { TreeData } from 'shared/types/treeData'
import { useParams } from 'react-router-dom'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { RouteParams } from 'shared/types/routerTypes'
import { TMSTree } from 'shared/ui/TMSTree/TMSTree'
import { TestsAPI, UpdateTestsNodeParent } from '../api/testsApi'

import styles from './TestsTree.module.scss'
import { TestsActions } from './TestsActions'

export const TestsLayout = memo(() => {
  const { projectId } = useParams<RouteParams>()
  const [treeData, setTreeData] = useState<NodeModel<TreeData>[]>([])

  useEffect(() => {
    if (projectsStore.activeProject?.id) {
      TestsAPI.getProjectTestsNodes(projectsStore.activeProject.id).then(
        (data) => setTreeData(data),
      )
    }
  }, [projectId])

  const calculateSuiteCount = useCallback(() => {
    return treeData.reduce((count, treeNode) => {
      if ((treeNode.data?.children.length || 0) > 0) {
        return count + 1
      }
      return count
    }, 0)
  }, [treeData])

  const [openedSuites, setOpenedSuites] = useState<number>(0)
  const allSuitesIsOpened = useMemo(() => {
    return openedSuites >= calculateSuiteCount()
  }, [treeData, openedSuites])
  const allSuitesIsClosed = useMemo(() => openedSuites === 0, [openedSuites])

  const ref = useRef<TreeMethods>(null)
  const handleDrop = async (
    newTree: NodeModel<TreeData>[],
    options: DropOptions<TreeData>,
  ) => {
    const { dragSource, dropTargetId, dropTarget } = options

    if (dragSource !== undefined && dragSource.parent !== dropTargetId) {
      if (projectsStore.activeProject?.id && dragSource.data && dropTargetId) {
        const update: UpdateTestsNodeParent = {
          nodeId: Number(dragSource.data.id),
          parentId: dropTarget?.data ? Number(dropTarget.data.id) : null,
          type: dragSource.data.type,
        }
        await TestsAPI.updateTestsNodeParent(update)

        TestsAPI.getProjectTestsNodes(projectsStore.activeProject.id).then(
          (data) => setTreeData(data),
        )
      }
    }
  }
  const handleOpenAll = () => {
    ref.current?.openAll()
  }
  const handleCloseAll = () => {
    ref.current?.closeAll()
  }

  return (
    <div className={styles.wrapper}>
      <TestsActions
        canExpand={!allSuitesIsOpened}
        canCollapse={!allSuitesIsClosed}
        onExpand={handleOpenAll}
        onCollapse={handleCloseAll}
      />

      <TMSTree
        nodes={treeData}
        onChangeOpen={(newOpenIds) => setOpenedSuites(newOpenIds.length)}
        onDrop={handleDrop}
        rootId="0"
        ref={ref}
        nodeRender={(node, { depth, isOpen, onToggle }) => (
          <TreeNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        )}
        dragPreviewRender={(monitorProps) => (
          <TreeNodeDrag monitorProps={monitorProps} />
        )}
      />
    </div>
  )
})
