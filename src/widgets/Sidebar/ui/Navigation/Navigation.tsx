import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { List, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { projectStore } from 'entities/Project'

import { NavigationItem } from '../NavigationItem/NavigationItem'

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

  const showedItems = useMemo(() => {
    return items.filter(
      (item) =>
        projectStore.activeProject !== null || item.showWithoutActiveProject,
    )
  }, [projectStore.activeProjectId])

  return (
    <List className={styles.list}>
      {showedItems.map((item) => (
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
  )
})
