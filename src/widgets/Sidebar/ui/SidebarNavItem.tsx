import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

export interface SidebarNavItemProps {
  collapsed: boolean
  path: string
  label: string
  Icon:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
}

export const SidebarNavItem = memo((props: SidebarNavItemProps) => {
  const { path, label, Icon, collapsed } = props

  return (
    <ListItem disablePadding>
      <NavLink
        to={path}
        end
        key={label}
        style={{
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {({ isActive }) => (
          <ListItemButton
            selected={isActive}
            sx={collapsed ? { padding: '8px 0', width: '49px' } : {}}
          >
            <ListItemIcon
              sx={
                collapsed
                  ? {
                      width: '49px',
                      minWidth: '49px',
                      display: 'flex',
                      justifyContent: 'center',
                    }
                  : {}
              }
            >
              <Icon />
            </ListItemIcon>
            {collapsed || <ListItemText primary={label} />}
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  )
})
