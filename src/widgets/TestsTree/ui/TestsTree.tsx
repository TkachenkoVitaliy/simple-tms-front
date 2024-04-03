import { useCallback, useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'

import { DropOptions, NodeModel, TreeMethods } from '@minoru/react-dnd-treeview'
import { useNavigate, useParams } from 'react-router-dom'

import { PageLoader } from 'widgets/PageLoader'

import { TestsTreeActionsPanel } from 'features/TestsTreeActionsPanel'

import { projectStore } from 'entities/Project'
import {
  TestNodeData,
  TestNodeType,
  TreeNode,
  TreeNodeDrag,
  UpdateTestNodeParent,
} from 'entities/TestNode'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { RouteParams } from 'shared/types/router'
import { TMSTree } from 'shared/ui/TMSTree'

import styles from './TestsTree.module.scss'

// TODO: refactor

export const TestsTree = observer(() => {
  const { projectId } = useParams<RouteParams>()
  const root = document.documentElement
  const { testNodeStore } = useProjectStores()

  useEffect(() => {
    if (!!projectId && projectId !== projectStore.activeProjectId?.toString()) {
      const projectIdValue = Number(projectId)
      if (Number.isNaN(projectIdValue)) {
        throw new Error(`Wrong project id - ${projectId}`)
      }
      projectStore.setActiveProjectId(projectIdValue)
    } else if (projectStore.activeProjectId) {
      testNodeStore.loadNodes()
    }
  }, [projectId, projectStore.activeProjectId])

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

  const onDeleteNode = useCallback(
    (id: number, type: TestNodeType) => {
      testNodeStore.deleteNode(id, type)
    },
    [projectId, testNodeStore],
  )

  if (testNodeStore.isLoading) {
    return <PageLoader message="" />
  }

  return (
    <div
      className={styles.wrapper}
      // TODO: подумать как сделать лучше
      ref={(wrapperRef) => {
        if (wrapperRef?.offsetTop) {
          root.style.setProperty(
            '--tests-tree-top-offset',
            `${wrapperRef.offsetTop}px`,
          )
        }
      }}
    >
      <TestsTreeActionsPanel
        canExpand={!testNodeStore.isAllSuitesOpened}
        canCollapse={!testNodeStore.isAllSuitesClosed}
        onExpand={handleOpenAll}
        onCollapse={handleCloseAll}
      />
      {testNodeStore.nodes.length < 1 ? null : (
        <TMSTree
          className={styles.border}
          nodes={testNodeStore.nodes}
          onChangeOpen={(newOpenIds) =>
            testNodeStore.setOpenedSuites(newOpenIds.length)
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
                if (node.data && node.data.type === TestNodeType.SUITE) {
                  navigate(node.id.toString())
                }
                if (node.data && node.data.type === TestNodeType.CASE) {
                  navigate(node.id.toString())
                }
              }}
              onDelete={onDeleteNode}
            />
          )}
          dragPreviewRender={(monitorProps) => (
            <TreeNodeDrag monitorProps={monitorProps} />
          )}
        />
      )}
    </div>
  )
})
