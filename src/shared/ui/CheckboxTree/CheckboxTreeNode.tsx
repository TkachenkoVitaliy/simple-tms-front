import { useCallback, useMemo } from 'react'

import { ExpandLess } from '@mui/icons-material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { CheckboxTree, CheckboxTreeProps } from './CheckboxTree'
import { useCheckboxTreeContext } from './useCheckboxTreeContext'

export type CheckboxTreeNodeProps<T> = Omit<
  CheckboxTreeProps<T>,
  'data' | 'forceState'
> & {
  item: T
}

const INDENT_DEFAULT = 36

export function CheckboxTreeNode<T>(props: CheckboxTreeNodeProps<T>) {
  const { item, ...treeProps } = props
  const {
    getId,
    getChildren,
    indent = INDENT_DEFAULT,
    getLabel,
    getIcon,
    isRoot,
  } = treeProps

  const [expandState, setExpandState, checkedState, setCheckedState] =
    useCheckboxTreeContext()

  const toggleNodeChecked = (item: T) => {
    console.log('toggle', item, expandState, checkedState)
    const id = getId(item)
    const checked = checkedState.has(id)
    console.log(checked)
    const newCheckedState = new Set(checkedState)
    if (checked) {
      newCheckedState.delete(id)
    } else {
      newCheckedState.add(id)
    }
    console.log(newCheckedState)
    setCheckedState(newCheckedState)
  }

  const children = useMemo(() => getChildren(item), [getChildren, item])

  const isExpanded = useMemo(() => {
    return expandState.get(getId(item).toString())
  }, [getId, item, expandState])

  const getSecondaryAction = useCallback(() => {
    if (children === undefined) return null
    if (isExpanded === undefined) return null

    const toggleExpanded = () => {
      const newMap = new Map(expandState)
      newMap.set(getId(item).toString(), !isExpanded)
      setExpandState(newMap)
    }

    return (
      <IconButton onClick={toggleExpanded}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    )
  }, [item, getId, getChildren, expandState, setExpandState])

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
                checked={checkedState.has(getId(item))}
                onChange={() => toggleNodeChecked(item)}
                edge="start"
                disableRipple
              />
            </ListItemIcon>
            {getIcon !== undefined && (
              <ListItemIcon>{getIcon(item)}</ListItemIcon>
            )}
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
