import { DropOptions, NodeModel, TreeMethods } from '@minoru/react-dnd-treeview'
import { memo, useEffect, useRef } from 'react'
import { TreeNode } from 'shared/ui/TreeNode/TreeNode'
import { TreeNodeDrag } from 'shared/ui/TreeNodeDrag/TreeNodeDrag'
import { useNavigate, useParams } from 'react-router-dom'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { RouteParams } from 'shared/types/routerTypes'
import { TMSTree } from 'shared/ui/TMSTree/TMSTree'
import {
  TestNodeData,
  UpdateTestsNodeParent,
} from 'entities/TestNode/model/types'
import { testNodeStore } from 'entities/TestNode/model/testNodeStore'
import { observer } from 'mobx-react-lite'
import { testSuiteStore } from 'entities/TestNode/TestSuite/model/testSuiteStore'
import { TestsActions } from './TestsActions'

import styles from './TestsLayout.module.scss'

export const TestsLayout = memo(
  observer(() => {
    const { projectId } = useParams<RouteParams>()

    useEffect(() => {
      if (
        !!projectId &&
        projectId !== projectsStore.activeProject?.id.toString()
      ) {
        projectsStore.setActiveProjectById(projectId)
      } else if (projectsStore.activeProject?.id) {
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
        if (
          projectsStore.activeProject?.id &&
          dragSource.data &&
          dropTargetId
        ) {
          const update: UpdateTestsNodeParent = {
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
        <TestsActions
          canExpand={!testNodeStore.isAllSuitesOpened}
          canCollapse={!testNodeStore.isAllSuitesClosed}
          onExpand={handleOpenAll}
          onCollapse={handleCloseAll}
        />

        <TMSTree
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
                  await testSuiteStore.setEditSuite(node.data.id as number)
                  navigate(node.data.id.toString())
                }
              }}
            />
          )}
          dragPreviewRender={(monitorProps) => (
            <TreeNodeDrag monitorProps={monitorProps} />
          )}
        />
      </div>
    )
  }),
)
