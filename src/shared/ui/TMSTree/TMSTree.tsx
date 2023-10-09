/* eslint-disable no-use-before-define */
import {
  Classes,
  DndProvider,
  DragLayerMonitorProps,
  DropOptions,
  MultiBackend,
  NodeModel,
  RenderParams,
  Tree,
  TreeMethods,
  getBackendOptions,
} from '@minoru/react-dnd-treeview'
import { ReactElement, forwardRef } from 'react'

import styles from './TMSTree.module.scss'

export interface TMSTreeProps<T> {
  nodes: NodeModel<T>[]
  onChangeOpen?: (newOpenIds: NodeModel<T>['id'][]) => void
  onDrop: (tree: NodeModel<T>[], options: DropOptions<T>) => void
  rootId: NodeModel<T>['id']
  nodeRender: (node: NodeModel<T>, params: RenderParams) => ReactElement
  dragPreviewRender?: (monitorProps: DragLayerMonitorProps<T>) => ReactElement
  classes?: Classes
}

function TMSTreeInner<T>(
  props: TMSTreeProps<T>,
  ref: React.ForwardedRef<TreeMethods>,
) {
  const {
    nodes,
    onChangeOpen,
    onDrop,
    rootId,
    nodeRender,
    dragPreviewRender,
    classes,
  } = props

  return (
    <DndProvider
      backend={MultiBackend}
      options={getBackendOptions()}
    >
      <div className={styles.treeApp}>
        <Tree
          onChangeOpen={onChangeOpen}
          ref={ref}
          tree={nodes}
          rootId={rootId}
          render={nodeRender}
          dragPreviewRender={dragPreviewRender}
          onDrop={onDrop}
          enableAnimateExpand
          classes={
            classes || {
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }
          }
        />
      </div>
    </DndProvider>
  )
}

// export const TMSTree = forwardRef(TMSTreeInner) as <T>(
//   props: TMSTreeProps<T> & { ref?: React.ForwardedRef<TreeMethods> },
// ) => ReturnType<typeof TMSTreeInner>

export const TMSTree = forwardRef<TreeMethods, TMSTreeProps<unknown>>(
  TMSTreeInner,
) as <T>(
  props: TMSTreeProps<T> & { ref?: React.ForwardedRef<TreeMethods> },
) => ReturnType<typeof TMSTreeInner>
