import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import { memo, useState } from 'react'

export interface MenuOption {
  label: string
  onSelect: () => void
}

export interface TMSMenuProps {
  id: string
  icon?: JSX.Element
  label?: string
  options: MenuOption[]
}

export const TMSMenu = memo((props: TMSMenuProps) => {
  const { options, label, icon, id } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (option?: MenuOption) => {
    option?.onSelect()
    setAnchorEl(null)
  }

  return (
    <div>
      {label ? (
        <Button
          id={id}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="inherit"
          variant="outlined"
          sx={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}
        >
          {icon}
          {label}
        </Button>
      ) : (
        <IconButton
          id={id}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="inherit"
          size="small"
          sx={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}
        >
          {icon}
          {label}
        </IconButton>
      )}
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        slotProps={{ paper: { style: { minWidth: anchorEl?.offsetWidth } } }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.label}
              onClick={() => handleClose(option)}
              sx={{ width: '100%' }}
            >
              {option.label}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
})
