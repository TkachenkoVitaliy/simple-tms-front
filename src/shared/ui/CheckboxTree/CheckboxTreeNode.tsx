import { memo, useCallback, useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { ExpandLess } from '@mui/icons-material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'

import { CheckboxTree, CheckboxTreeProps } from './CheckboxTree'

export type CheckboxTreeNodeProps<T> = Omit<CheckboxTreeProps<T>, 'data'> & {
  item: T
}

const INDENT_DEFAULT = 36

export function CheckboxTreeNode<T>(props: CheckboxTreeNodeProps<T>) {
  const { item, ...treeProps } = props
  const {
    getId,
    getChildren,
    depth = 1,
    indent = INDENT_DEFAULT,
    getLabel,
  } = treeProps

  const checkboxContext = useCheckboxTreeContext()

  const children = useMemo(() => getChildren(item), [getChildren, item])

  const isExpanded = useMemo(
    () => checkboxContext.get(getId(item).toString()),
    [getId, item],
  )

  const getSecondaryAction = useCallback(() => {
    if (children === undefined) return null
    if (isExpanded === undefined) return null

    const toggleExpanded = () => {
      console.log(isExpanded)
      checkboxContext.set(getId(item).toString(), !isExpanded)
    }

    return (
      <IconButton onClick={toggleExpanded}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    )
  }, [item, getId, getChildren])

  return (
    <ul style={{ marginInlineStart: indent * depth }}>
      <li>
        <ListItem
          disablePadding
          sx={{ margin: '4px 0px' }}
          secondaryAction={getSecondaryAction()}
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
      {children !== undefined && isExpanded ? (
        <CheckboxTree
          {...treeProps}
          data={children}
          depth={1}
        />
      ) : null}
    </ul>
  )
}
