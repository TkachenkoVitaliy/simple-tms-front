import { useCallback, useMemo } from 'react'

import { ExpandLess } from '@mui/icons-material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, ListItemIcon } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { FlatTreeItem } from 'shared/ui/CheckboxTree/CheckboxTreeRoot'

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
    setSelected,
  } = treeProps

  const [checkedState, setCheckedState] = useCheckboxTreeContext()

  function updateParentState(
    parentId: string | null,
    state: Map<string, FlatTreeItem>,
  ) {
    const parent = parentId === null ? undefined : state.get(parentId)

    if (parent !== undefined) {
      const children = parent.childrenIds
        ?.map((childId) => state.get(childId))
        .map((elem) => elem?.checkState)

      const allChecked = children
        ?.filter((el) => el !== undefined)
        .every((el) => el === 'checked')
      const allUnchecked = children
        ?.filter((el) => el !== undefined)
        .every((el) => el === 'unchecked')

      if (allChecked) {
        parent.checkState = 'checked'
      } else if (allUnchecked) {
        parent.checkState = 'unchecked'
      } else {
        parent.checkState = 'indeterminate'
      }

      if (parent.parentId !== null) {
        updateParentState(parent.parentId, state)
      }
    }
  }

  const toggleNodeChecked = (node: T) => {
    const copyCheckedState = new Map(checkedState)
    const id = getId(node)
    const itemState = copyCheckedState.get(id)
    if (itemState !== undefined) {
      const state = itemState.checkState
      if (state === 'checked') {
        itemState.checkState = 'unchecked'
        if (
          itemState.childrenIds !== undefined &&
          itemState.childrenIds.length > 0
        ) {
          itemState.childrenIds.forEach((childId) => {
            const child = copyCheckedState.get(childId)
            if (child) child.checkState = 'unchecked'
          })
        }
      }
      if (state === 'unchecked' || state === 'indeterminate') {
        itemState.checkState = 'checked'
        if (
          itemState.childrenIds !== undefined &&
          itemState.childrenIds.length > 0
        ) {
          itemState.childrenIds.forEach((childId) => {
            const child = copyCheckedState.get(childId)
            if (child) child.checkState = 'checked'
          })
          itemState.expanded = true
        }
      }
      updateParentState(itemState.parentId, copyCheckedState)
      setCheckedState(copyCheckedState)

      const selected: string[] = []
      copyCheckedState.forEach((val) => {
        if (val.checkState === 'checked') {
          selected.push(val.id)
        }
      })
      setSelected(selected)
    }
  }

  const children = useMemo(() => getChildren(item), [getChildren, item])

  const isExpanded = useMemo(() => {
    return checkedState.get(getId(item))?.expanded
  }, [getId, item, checkedState])

  const getSecondaryAction = useCallback(() => {
    if (children === undefined) return null
    if (isExpanded === undefined) return null

    const toggleExpanded = () => {
      const newMap = new Map(checkedState)
      const node = newMap.get(getId(item))
      if (node !== undefined) {
        node.expanded = node.expanded !== undefined ? !node.expanded : undefined
        newMap.set(getId(item), node)
        setCheckedState(newMap)
      }
    }

    return (
      <IconButton onClick={toggleExpanded}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    )
  }, [item, getId, getChildren, checkedState, setCheckedState])

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
            onClick={() => toggleNodeChecked(item)}
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
                checked={
                  checkedState.get(getId(item))?.checkState === 'checked'
                }
                indeterminate={
                  checkedState.get(getId(item))?.checkState === 'indeterminate'
                }
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
