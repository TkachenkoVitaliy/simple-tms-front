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
import { memo, useRef, useState } from 'react'
import { TreeNode } from 'shared/ui/TreeNode/TreeNode'
import { sampleData } from 'mock/sample_data'
import { TreeNodeDrag } from 'shared/ui/TreeNodeDrag/TreeNodeDrag'
import { TreeData } from 'shared/types/treeData'
import { createChildren, updateChildren } from 'shared/lib/tree'
import { Button, ButtonGroup } from '@mui/material'
import { Create, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { TMSMenu } from 'shared/ui/TMSMenu/TMSMenu'
import styles from './TestsTree.module.scss'

export const TestsTree = memo(() => {
  const [treeData, setTreeData] = useState<NodeModel<TreeData>[]>(
    createChildren(sampleData),
  )
  const ref = useRef<TreeMethods>(null)
  const handleDrop = (
    newTree: NodeModel<TreeData>[],
    options: DropOptions<TreeData>,
  ) => {
    const { dragSource, dropTargetId } = options

    if (dragSource !== undefined)
      setTreeData(
        updateChildren(dragSource.id, dragSource.parent, dropTargetId, newTree),
      )
  }
  const handleOpenAll = () => ref.current?.openAll()
  const handleCloseAll = () => ref.current?.closeAll()

  return (
    <div style={{ height: 'max-content' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
        }}
      >
        <TMSMenu
          id="create-root"
          icon={<Create />}
          label="Create"
          options={[
            {
              label: 'Suite',
              onSelect: () => {
                console.log('SUITE')
              },
            },
            {
              label: 'Case',
              onSelect: () => {
                console.log('CASE')
              },
            },
          ]}
        />
        <div />
        <ButtonGroup
          size="small"
          variant="outlined"
          color="inherit"
        >
          <Button
            onClick={handleOpenAll}
            component="button"
          >
            <UnfoldMore />
            Expand
          </Button>
          <Button
            onClick={handleCloseAll}
            component="button"
          >
            <UnfoldLess />
            Collapse
          </Button>
        </ButtonGroup>
      </div>

      <DndProvider
        backend={MultiBackend}
        options={getBackendOptions()}
      >
        <div className={styles.treeApp}>
          <Tree
            ref={ref}
            tree={treeData}
            rootId={0}
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
