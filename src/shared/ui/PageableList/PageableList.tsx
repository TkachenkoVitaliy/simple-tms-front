import { useCallback } from 'react'

import { List } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'

export interface PageableListProps<T, ID extends string | number> {
  data: T[]
  getLabel: (item: T) => string
  getId: (item: T) => ID
  onSelect?: (id: ID) => unknown
  itemRenderFunc?: (item: T) => JSX.Element
}

export function PageableList<T, ID extends string | number>(
  props: PageableListProps<T, ID>,
) {
  const { data, getLabel, getId, onSelect, itemRenderFunc } = props

  const createItem = useCallback(
    (item: T) => {
      if (itemRenderFunc !== undefined) {
        return itemRenderFunc(item)
      }
      if (onSelect === undefined) {
        return <ListItem key={getId(item)}>{getLabel(item)}</ListItem>
      }
      return (
        <ListItemButton
          key={getId(item)}
          onClick={() => onSelect(getId(item))}
        >
          {getLabel(item)}
        </ListItemButton>
      )
    },
    [onSelect, getLabel, getId, itemRenderFunc],
  )

  return <List>{data.map((item) => createItem(item))}</List>
}
