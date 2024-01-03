import { ForwardedRef, ReactElement, forwardRef } from 'react'

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

import { classNames } from 'shared/lib/utils'

import styles from './TMSTree.module.scss'

// TODO: подумать, возможно это не shared слой
// TODO: refactor

export interface TMSTreeProps<T> {
  className?: string
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
  ref: ForwardedRef<TreeMethods>,
) {
  const {
    className,
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
      <div className={classNames(styles.treeApp, {}, [className])}>
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

export const TMSTree = forwardRef<TreeMethods, TMSTreeProps<unknown>>(
  TMSTreeInner,
) as <T>(
  // eslint-disable-next-line no-use-before-define
  props: TMSTreeProps<T> & { ref?: ForwardedRef<TreeMethods> },
) => ReturnType<typeof TMSTreeInner>
