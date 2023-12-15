import { memo } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { NavLink } from 'react-router-dom'

import { classNames } from 'shared/lib/utils'

import styles from './NavigationItem.module.scss'

export interface NavigationItemProps {
  collapsed: boolean
  path: string
  label: string
  Icon:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
  end?: boolean
}

export const NavigationItem = memo((props: NavigationItemProps) => {
  const { path, label, Icon, collapsed, end } = props

  return (
    <ListItem disablePadding>
      <NavLink
        className={styles.navLink}
        to={path}
        end={!!end}
        key={label}
      >
        {({ isActive }) => (
          <ListItemButton
            className={classNames(styles.btn, {
              [styles.collapsed]: collapsed,
            })}
            selected={isActive}
          >
            <ListItemIcon className={styles.icon}>
              <Icon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary={label} />}
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  )
})
