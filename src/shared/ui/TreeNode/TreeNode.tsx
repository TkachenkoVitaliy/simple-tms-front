/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react'
import { ArrowRight } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'
import { TreeData } from 'shared/types/treeData'
import styles from './TreeNode.module.scss'
import { TypeIcon } from '../TypeIcon/TypeIcon'

export interface TreeNodeProps {
  node: NodeModel<TreeData>
  depth: number
  isOpen: boolean
  onToggle: (id: NodeModel['id']) => void
}

export const TreeNode = memo((props: TreeNodeProps) => {
  const { id, droppable, data } = props.node
  const indent = props.depth * 24

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('HANDLE - ', id)
    props.onToggle(id)
  }

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

  return (
    <div
      onClick={() => {
        if (!droppable) console.log('CLICK', id)
      }}
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ''
        }`}
      >
        {props.node.droppable && (
          <div
            className={styles.iconWrapper}
            onClick={handleToggle}
          >
            <ArrowRight />
          </div>
        )}
      </div>
      <div className={styles.iconWrapper}>
        <TypeIcon
          droppable={droppable || false}
          type={data?.type}
        />
      </div>
      <div className={styles.labelGridItem}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  )
})
