/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react'
import { Add, ArrowRight, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'
import { useNavigate } from 'react-router-dom'
import { LocationState } from 'shared/types/routerTypes'
import { TestNodeData } from 'entities/TestNode/model/types'
import { testSuiteStore } from 'entities/TestNode/TestSuite/model/testSuiteStore'
import { TypeIcon } from '../TypeIcon/TypeIcon'
import { TMSMenu } from '../TMSMenu/TMSMenu'

import styles from './TreeNode.module.scss'

export interface TreeNodeProps {
  node: NodeModel<TestNodeData>
  depth: number
  isOpen: boolean
  onToggle: (id: NodeModel['id']) => void
  onClick?: () => void
}

export const TreeNode = memo((props: TreeNodeProps) => {
  const { onClick } = props
  const { id, droppable, data, parent, text } = props.node
  const indent = props.depth * 24
  const navigate = useNavigate()

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    props.onToggle(id)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.()
    // const locationState: LocationState = {
    //   parentId: parent.toString().replace('case/', '').replace('suite/', ''),
    //   title: text,
    // }
    // navigate(id.toString(), { state: locationState })
    // e.stopPropagation()
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
        <Typography
          noWrap
          variant="body2"
        >
          {props.node.text}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
        {droppable && (
          <TMSMenu
            id={`create-${id}`}
            icon={<Add />}
            options={[
              {
                label: 'Suite',
                onSelect: () => {
                  if (data?.id) {
                    const id = Number(data.id)
                    testSuiteStore.setCreateSuite(id)
                  }
                  navigate('suite')
                },
              },
              {
                label: 'Case',
                onSelect: () => navigate('case', { state: { parentId: id } }),
              },
            ]}
          />
        )}
        <IconButton size="small">
          <Edit />
        </IconButton>
      </div>
    </div>
  )
})
