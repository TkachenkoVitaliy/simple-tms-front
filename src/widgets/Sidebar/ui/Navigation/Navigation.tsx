import { Box, List, SvgIconTypeMap } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { classNames } from 'shared/lib/utils'
import { AppRoute } from 'shared/types/router'

import { OverridableComponent } from '@mui/material/OverridableComponent'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { NavigationItem } from '../NavigationItem/ui/NavigationItem'
import styles from './Navigation.module.scss'

export interface NavigationItem {
  path: string
  label: string
  Icon:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | (OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
        muiName: string
      })
  showWithoutActiveProject?: boolean
  end?: boolean
}

export interface NavigationProps {
  className?: string
  items: NavigationItem[]
  isCollapsed: boolean
}

export const Navigation = observer((props: NavigationProps) => {
  const { className, items, isCollapsed } = props

  return (
    <Box className={classNames(styles.navigation, {}, [className])}>
      <List className={styles.list}>
        {items.map((item) => (
          <NavigationItem
            collapsed={isCollapsed}
            key={item.label}
            path={item.path?.replace(
              ':projectId',
              projectStore.activeProjectId?.toString() || '0',
            )}
            label={item.label}
            Icon={item.Icon}
            end={!!item.end}
          />
        ))}
      </List>
    </Box>
  )
})
