import { useMemo } from 'react'

import ExpandMore from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { CheckboxTree, CheckboxTreeProps } from './CheckboxTree'

export type CheckboxTreeNodeProps<T> = Omit<CheckboxTreeProps<T>, 'data'> & {
  item: T
}

const INDENT_DEFAULT = 36

export function CheckboxTreeNode<T>(props: CheckboxTreeNodeProps<T>) {
  const { item, ...treeProps } = props
  const {
    getChildren,
    depth = 1,
    indent = INDENT_DEFAULT,
    getLabel,
  } = treeProps

  const children = useMemo(() => getChildren(item), [props])

  return (
    <ul style={{ marginInlineStart: indent * depth }}>
      <li>
        <ListItem
          disablePadding
          sx={{ margin: '4px 0px' }}
          secondaryAction={
            children !== undefined ? (
              <IconButton>
                <ExpandMore />
              </IconButton>
            ) : null
          }
        >
          <ListItemButton
            dense
            sx={{
              bgcolor: 'var(--mui-palette-background-paper)',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'var(--mui-palette-background-paper-hover)',
              },
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={getLabel(item)} />
          </ListItemButton>
        </ListItem>
      </li>
      {children !== undefined ? (
        <CheckboxTree
          {...treeProps}
          data={children}
          depth={1}
        />
      ) : null}
    </ul>
  )
}
