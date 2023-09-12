/* eslint-disable prettier/prettier */
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
import { Button } from '@mui/material'
import { UnfoldLess, UnfoldMore } from '@mui/icons-material'
import styles from './TestsTree.module.scss'

export const TestsTree = memo(() => {
  const [treeData, setTreeData] = useState<NodeModel<TreeData>[]>(
    createChildren(sampleData),
  )
  const ref = useRef<TreeMethods>(null)
  const handleDrop = (
    newTree: NodeModel<TreeData>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: DropOptions<TreeData>,
  ) => {
    const { dragSource, dropTargetId } = options

    if (dragSource !== undefined)
      setTreeData(
        updateChildren(dragSource.id, dragSource.parent, dropTargetId, newTree),
      )
    console.log(newTree, options)
  }
  const handleOpenAll = () => ref.current?.openAll()
  const handleCloseAll = () => ref.current?.closeAll()

  return (
    <div style={{ height: 'max-content' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: '1em',
        }}
      >
        <Button onClick={handleOpenAll}>
          <UnfoldMore />
          Expand all
        </Button>
        <Button onClick={handleCloseAll}>
          <UnfoldLess />
          Collapse all
        </Button>
      </div>
      {/* <Button onClick={() => console.log('TREE', treeData)}>Tree</Button> */}

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
