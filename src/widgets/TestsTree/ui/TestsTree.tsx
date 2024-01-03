import { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'

import { DropOptions, NodeModel, TreeMethods } from '@minoru/react-dnd-treeview'
import { useNavigate, useParams } from 'react-router-dom'

import { projectStore } from 'entities/Project'
import {
  TestNodeData,
  testNodeStore,
  TreeNode,
  TreeNodeDrag,
  UpdateTestNodeParent,
} from 'entities/TestNode'

import { RouteParams } from 'shared/types/router'
import { TMSTree } from 'shared/ui/TMSTree'

import styles from './TestsTree.module.scss'

// TODO: refactor

export const TestsTree = observer(() => {
  const { projectId } = useParams<RouteParams>()

  useEffect(() => {
    if (!!projectId && projectStore.activeProjectId?.toString()) {
      projectStore.setActiveProjectId(Number(projectId))
    } else if (projectStore.activeProjectId) {
      testNodeStore.fetchNodes()
    }
  }, [projectId])

  const navigate = useNavigate()
  const ref = useRef<TreeMethods>(null)

  const handleDrop = async (
    _newTree: NodeModel<TestNodeData>[],
    options: DropOptions<TestNodeData>,
  ) => {
    const { dragSource, dropTargetId, dropTarget } = options

    if (dragSource !== undefined && dragSource.parent !== dropTargetId) {
      if (projectStore.activeProjectId && dragSource.data && dropTargetId) {
        const update: UpdateTestNodeParent = {
          nodeId: Number(dragSource.data.id),
          parentId: dropTarget?.data ? Number(dropTarget.data.id) : null,
          type: dragSource.data.type,
        }
        testNodeStore.updateTestNode(update)
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
      {/* <TestsActions
        canExpand={!testNodeStore.isAllSuitesOpened}
        canCollapse={!testNodeStore.isAllSuitesClosed}
        onExpand={handleOpenAll}
        onCollapse={handleCloseAll}
      /> */}

      {/* <TMSTree
        nodes={testNodeStore.nodes}
        onChangeOpen={(newOpenIds) =>
          testNodeStore.setOpenedSuite(newOpenIds.length)
        }
        onDrop={handleDrop}
        rootId="0"
        ref={ref}
        nodeRender={(node, { depth, isOpen, onToggle }) => (
          <TreeNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
            onClick={async () => {
              if (node.data && node.data.type === 'SUITE') {
                navigate(node.id.toString())
              }
            }}
          />
        )}
        dragPreviewRender={(monitorProps) => (
          <TreeNodeDrag monitorProps={monitorProps} />
        )}
      /> */}
    </div>
  )
})
