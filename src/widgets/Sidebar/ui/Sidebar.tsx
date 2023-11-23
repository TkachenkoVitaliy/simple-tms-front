import { observer } from 'mobx-react-lite'
import { memo, useMemo, useState } from 'react'
import { appLocalStorage, classNames } from 'shared/lib/utils'
import { Box, Drawer, List, Toolbar } from '@mui/material'
import { useFlatAppRouter } from 'shared/lib/hooks/useFlatAppRouter'
import styles from './Sidebar.module.scss'

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

    const getSidebarItems = useMemo(() => {
      return flatAppRoutes.map((route) => {
        if (route.label !== undefined && route.Icon !== undefined) {
          return <div>{route.label}</div>
        }
        return null
      })
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
          <Box
            className={styles.box}
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   justifyContent: 'space-between',
            //   height: '100%',
            // }}
          >
            <List sx={{ paddingTop: '2px', paddingBottom: '2px' }}>
              {getSidebarItems}
            </List>
          </Box>
        </Drawer>
      </aside>
    )
  }),
)
