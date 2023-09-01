import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

export interface SidebarNavItemProps {
  path: string
  label: string
  Icon:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
}

export const SidebarNavItem = memo((props: SidebarNavItemProps) => {
  const { path, label, Icon } = props

  return (
    <ListItem disablePadding>
      <NavLink
        to={path}
        end
        key={label}
        style={{ width: '100%' }}
      >
        {({ isActive }) => (
          <ListItemButton selected={isActive}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  )
})
