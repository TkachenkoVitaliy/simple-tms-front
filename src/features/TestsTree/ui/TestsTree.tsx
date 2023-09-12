/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import {
  DndProvider,
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from '@minoru/react-dnd-treeview'
import { memo, useState } from 'react'
import { TreeNode } from 'shared/ui/TreeNode/TreeNode'
import { sampleData } from 'mock/sample_data'
import { TreeNodeDrag } from 'shared/ui/TreeNodeDrag/TreeNodeDrag'
import styles from './TestsTree.module.scss'

export const TestsTree = memo(() => {
  const [treeData, setTreeData] =
    useState<NodeModel<{ fileType?: string; fileSize?: string }>[]>(sampleData)
  const handleDrop = (
    newTree: NodeModel<{ fileType?: string; fileSize?: string }>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
  ) => {
    setTreeData(newTree)
    console.log(newTree, options)
  }

  return (
    <DndProvider
      backend={MultiBackend}
      options={getBackendOptions()}
    >
      <div className={styles.treeApp}>
        <Tree
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
  )
})
