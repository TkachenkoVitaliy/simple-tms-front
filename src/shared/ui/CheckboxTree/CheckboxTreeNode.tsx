import { useMemo } from 'react'

import { Checkbox, FormControlLabel, ListItemIcon } from '@mui/material'

import { CheckboxTree, CheckboxTreeProps } from './CheckboxTree'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export type CheckboxTreeNodeProps<T> = Omit<CheckboxTreeProps<T>, 'data'> & {
  item: T
}
export function CheckboxTreeNode<T>(props: CheckboxTreeNodeProps<T>) {
  const { item, ...treeProps } = props
  const { getId, getChildren, depth = 1, indent = 24, getLabel } = treeProps

  const children = useMemo(() => getChildren(item), [props])

  return (
    <ul style={{ marginInlineStart: indent * depth }}>
      <li>
        <ListItem
          disablePadding
          sx={{ margin: '4px 0px' }}
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
