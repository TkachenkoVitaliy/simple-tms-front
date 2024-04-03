/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'
import { Add, ArrowRight, Delete, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { TestNodeData } from 'entities/TestNode'

import { classNames } from 'shared/lib/utils'
import { TMSMenu } from 'shared/ui/TMSMenu'

import { TypeIcon } from '../TypeIcon/TypeIcon'

import styles from './TreeNode.module.scss'

export interface TreeNodeProps {
  className?: string
  node: NodeModel<TestNodeData>
  depth: number
  isOpen: boolean
  onToggle: (id: NodeModel['id']) => void
  onClick?: () => void
  onDelete: (id: TestNodeData['id'], type: TestNodeData['type']) => void
}

const DEFAULT_INDENT = 24

// TODO: refactor

export const TreeNode = (props: TreeNodeProps) => {
  const { className, onClick, onToggle, isOpen, node, depth, onDelete } = props
  const { id, droppable, data, parent, text } = node
  const indent = depth * DEFAULT_INDENT
  const navigate = useNavigate()

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onToggle(id)
  }

  const handleClick = (_: React.MouseEvent<HTMLDivElement>) => onClick?.()

  const dragOverProps = useDragOver(id, isOpen, onToggle)

  return (
    <div
      className={classNames(`tree-node ${styles.root}`, {}, [className])}
      style={{ marginInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        // TODO: нужно обдумать как сделать эти стили нормально, а не таким огромным куском
        className={classNames('', {
          [styles.expandIconWrapper]: (node.data?.children.length || 0) > 0,
          [styles.withoutExpandIconWrapper]:
            (node.data?.children.length || 0) <= 0,
          [styles.isOpen]: (node.data?.children.length || 0) > 0 && isOpen,
        })}
      >
        {(node.data?.children.length || 0) > 0 && (
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
        <Typography
          noWrap
          variant="body2"
        >
          {node.text}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
        {droppable && (
          <TMSMenu
            id={`create-${id}`}
            icon={<Add />}
            options={[
              // TODO: переделать однотипно (suite и case)
              {
                label: 'Suite',
                onSelect: () => {
                  navigate('suite/new', { state: { parentId: data?.id } })
                },
              },
              {
                label: 'Case',
                onSelect: () => {
                  navigate('case/new', { state: { parentId: data?.id } })
                },
              },
            ]}
          />
        )}
        <IconButton
          size="small"
          onClick={() => {
            if (node.data) onDelete(node.data.id, node.data.type)
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  )
}
