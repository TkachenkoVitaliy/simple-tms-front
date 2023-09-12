import { memo } from 'react'
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'
import styles from './TreeNodeDrag.module.scss'
import { TypeIcon } from '../TypeIcon/TypeIcon'

export interface TreeNodeDragProps {
  monitorProps: DragLayerMonitorProps<{ fileType?: string; fileSize?: string }>
}

export const TreeNodeDrag = memo((props: TreeNodeDragProps) => {
  const { item } = props.monitorProps

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <TypeIcon
          droppable={item.droppable || false}
          fileType={item?.data?.fileType}
        />
      </div>
      <div className={styles.label}>{item.text}</div>
    </div>
  )
})
