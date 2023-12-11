import { observer } from 'mobx-react-lite'
import { memo, useMemo, useState } from 'react'
import { appLocalStorage, classNames } from 'shared/lib/utils'
import { Box, Drawer, Toolbar } from '@mui/material'
import { useFlatAppRouter } from 'shared/lib/hooks/useFlatAppRouter'
import { Navigation, NavigationItem } from '../Navigation/Navigation'
import styles from './Sidebar.module.scss'
import { CollapseBtn } from '../CollapseBtn/CollapseBtn'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

export const Sidebar = memo(
  observer(() => {
    const [isCollapsed, setCollapsed] = useState<boolean>(
      appLocalStorage.isSidebarCollapsed,
    )

    const flatAppRoutes = useFlatAppRouter()

    const toggleCollapsed = () => {
      setCollapsed((prev) => {
        appLocalStorage.setSideBarCollapsed(!prev)
        return !prev
      })
    }

    const getNavigationItems = useMemo((): NavigationItem[] => {
      const navigationItems: NavigationItem[] = []

      flatAppRoutes.forEach((route) => {
        if (route.label && route.Icon && route.path) {
          navigationItems.push({
            path: route.path,
            label: route.label,
            Icon: route.Icon,
            showWithoutActiveProject: route.showWithoutActiveProject,
            end: route.end,
          })
        }
      })

      return navigationItems
    }, [flatAppRoutes])

    return (
      <aside
        className={classNames(styles.sidebar, { collapsed: isCollapsed }, [
          'side',
        ])}
      >
        <Drawer
          className={classNames(styles.drawer, { collapsed: isCollapsed })}
          variant="permanent"
          sx={{
            // TODO: убрать коменнтарии после проверки работоспособности вариант через CSS
            // width: isCollapsed ? '50px' : '200px',
            // transition: 'width 0.2s ease-in-out',
            // overflowX: 'hidden',
            '& .MuiDrawer-paper': {
              width: isCollapsed ? '50px' : '200px',
              boxSizing: 'border-box',
              transition: 'width 0.2s ease-in-out',
              overflowX: 'hidden',
            },
          }}
        >
          <Toolbar />
          <Box className={styles.container}>
            <Navigation
              className={styles.box}
              items={getNavigationItems}
              isCollapsed={isCollapsed}
            />
            <CollapseBtn
              toggleCollapsed={toggleCollapsed}
              isCollapsed={isCollapsed}
            />
            <ThemeSwitcher />
          </Box>
        </Drawer>
      </aside>
    )
  }),
)