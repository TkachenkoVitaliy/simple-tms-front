import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'

import { TestNodeData } from 'entities/TestNode'

import { TypeIcon } from '../TypeIcon/TypeIcon'

import styles from './TreeNodeDrag.module.scss'

// TODO: refactor

export interface TreeNodeDragProps {
  monitorProps: DragLayerMonitorProps<TestNodeData>
}

export const TreeNodeDrag = ({ monitorProps }: TreeNodeDragProps) => {
  const { item } = monitorProps

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <TypeIcon
          droppable={item.droppable || false}
          type={item?.data?.type}
        />
      </div>
      <div className={styles.label}>{item.text}</div>
    </div>
  )
}
