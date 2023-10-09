/* eslint-disable max-lines */
/* eslint-disable react/no-unstable-nested-components */
import {
  DndProvider,
  DropOptions,
  MultiBackend,
  NodeModel,
  Tree,
  TreeMethods,
  getBackendOptions,
} from '@minoru/react-dnd-treeview'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TreeNode } from 'shared/ui/TreeNode/TreeNode'
import { TreeNodeDrag } from 'shared/ui/TreeNodeDrag/TreeNodeDrag'
import { TreeData } from 'shared/types/treeData'
import { updateChildren } from 'shared/lib/tree'
import { Button, ButtonGroup } from '@mui/material'
import { Add, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { TMSMenu } from 'shared/ui/TMSMenu/TMSMenu'
import { useNavigate, useParams } from 'react-router-dom'
import { projectsStore } from 'entities/Project/model/projectsStore'
import { RouteParams } from 'shared/types/routerTypes'
import { TestsAPI } from '../api/testsApi'

import styles from './TestsTree.module.scss'

export const TestsTree = memo(() => {
  const navigate = useNavigate()
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
  const handleDrop = (
    newTree: NodeModel<TreeData>[],
    options: DropOptions<TreeData>,
  ) => {
    const { dragSource, dropTargetId } = options

    console.log(newTree, options)

    if (dragSource !== undefined)
      setTreeData(
        updateChildren(dragSource.id, dragSource.parent, dropTargetId, newTree),
      )
  }
  const handleOpenAll = () => ref.current?.openAll()
  const handleCloseAll = () => ref.current?.closeAll()

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <TMSMenu
          id="create-root"
          icon={<Add />}
          label="Create"
          options={[
            {
              label: 'Suite',
              onSelect: () => {
                navigate('suite/0')
              },
            },
            {
              label: 'Case',
              onSelect: () => {
                navigate('create')
              },
            },
          ]}
        />
        <div />
        <ButtonGroup
          size="small"
          variant="outlined"
          color="inherit"
          disableElevation
        >
          <Button
            onClick={handleCloseAll}
            component="button"
            disabled={allSuitesIsClosed}
            style={{ borderRightColor: 'inherit' }}
          >
            <UnfoldLess />
          </Button>
          <Button
            onClick={handleOpenAll}
            component="button"
            disabled={allSuitesIsOpened}
          >
            <UnfoldMore />
          </Button>
        </ButtonGroup>
      </div>

      <DndProvider
        backend={MultiBackend}
        options={getBackendOptions()}
      >
        <div className={styles.treeApp}>
          <Tree
            onChangeOpen={(newOpenIds) => setOpenedSuites(newOpenIds.length)}
            ref={ref}
            tree={treeData}
            rootId="0"
            render={(node, { depth, isOpen, onToggle }) => (
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
            onDrop={handleDrop}
            enableAnimateExpand
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
          />
        </div>
      </DndProvider>
    </div>
  )
})
