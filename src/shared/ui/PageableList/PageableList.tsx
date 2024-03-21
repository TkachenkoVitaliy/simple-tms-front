import { List } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'

export interface PageableListProps<T, ID extends string | number> {
  data: T[]
  getLabel: (item: T) => string
  getId: (item: T) => ID
  itemsPerPage: number
  onSelect?: (id: ID) => unknown
}

export function PageableList<T, ID extends string | number>(
  props: PageableListProps<T, ID>,
) {
  const { data, getLabel, getId, itemsPerPage, onSelect } = props

  const createItem = (
    onSelect: PageableListProps<T, ID>['onSelect'],
    getId: PageableListProps<T, ID>['getId'],
    getLabel: PageableListProps<T, ID>['getLabel'],
    item: T,
  ) => {
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
  }

  return (
    <List>
      {data.map((item) => createItem(onSelect, getId, getLabel, item))}
    </List>
  )
}
