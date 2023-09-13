/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react'
import { Add, ArrowRight, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'
import { TreeData } from 'shared/types/treeData'
import { useNavigate } from 'react-router-dom'
import styles from './TreeNode.module.scss'
import { TypeIcon } from '../TypeIcon/TypeIcon'
import { TMSMenu } from '../TMSMenu/TMSMenu'

export interface TreeNodeProps {
  node: NodeModel<TreeData>
  depth: number
  isOpen: boolean
  onToggle: (id: NodeModel['id']) => void
}

export const TreeNode = memo((props: TreeNodeProps) => {
  const { id, droppable, data } = props.node
  const indent = props.depth * 24
  const navigate = useNavigate()

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('HANDLE - ', id)
    props.onToggle(id)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(props.node)
    if (!droppable) {
      console.log('!!!', id.toString())
      navigate(id.toString())
      e.stopPropagation()
    }
  }

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ marginInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={
          (props.node.data?.children.length || 0) > 0
            ? `${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ''}`
            : styles.withoutExpandIconWrapper
        }
      >
        {(props.node.data?.children.length || 0) > 0 && (
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
      <div
        className={styles.labelGridItem}
        onMouseUp={handleClick}
      >
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
        {droppable && (
          <TMSMenu
            id={`create-${id}`}
            icon={<Add />}
            options={[
              {
                label: 'Suite',
                onSelect: () => console.log('suite'),
              },
              {
                label: 'Case',
                onSelect: () => console.log('cae'),
              },
            ]}
          />
        )}
        {/* <IconButton size="small">
          <Add />
        </IconButton> */}
        <IconButton size="small">
          <Edit />
        </IconButton>
      </div>
    </div>
  )
})
