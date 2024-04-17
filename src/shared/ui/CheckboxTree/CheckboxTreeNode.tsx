import { useCallback, useMemo } from 'react'

import { ExpandLess } from '@mui/icons-material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { useCheckboxTreeContext } from 'shared/ui/CheckboxTree/useCheckboxTreeContext'

import { CheckboxTree, CheckboxTreeProps } from './CheckboxTree'

export type CheckboxTreeNodeProps<T> = Omit<
  CheckboxTreeProps<T>,
  'data' | 'forceState'
> & {
  item: T
}

const INDENT_DEFAULT = 36

export function CheckboxTreeNode<T>(props: CheckboxTreeNodeProps<T>) {
  console.log('CheckboxTreeNode render')
  const { item, ...treeProps } = props
  const {
    getId,
    getChildren,
    indent = INDENT_DEFAULT,
    getLabel,
    isRoot,
  } = treeProps

  const [checkboxState, setCheckBoxState] = useCheckboxTreeContext()

  const children = useMemo(() => getChildren(item), [getChildren, item])

  const isExpanded = useMemo(() => {
    console.log('isExpandedMap', checkboxState)
    const isExp = checkboxState.get(getId(item).toString())
    console.log('isExpanded', isExp)
    return isExp
  }, [getId, item, checkboxState])

  const getSecondaryAction = useCallback(() => {
    if (children === undefined) return null
    if (isExpanded === undefined) return null

    const toggleExpanded = () => {
      const newMap = new Map(checkboxState)
      newMap.set(getId(item).toString(), !isExpanded)
      setCheckBoxState(newMap)
    }

    return (
      <IconButton onClick={toggleExpanded}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    )
  }, [item, getId, getChildren, checkboxState, setCheckBoxState])

  return (
    <ul style={{ marginInlineStart: indent * (isRoot ? 0 : 1) }}>
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
      {children && isExpanded ? (
        <CheckboxTree
          {...treeProps}
          data={children}
          isRoot={false}
        />
      ) : null}
    </ul>
  )
}
