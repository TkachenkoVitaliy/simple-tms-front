import { memo } from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { appRoutes } from 'app/providers/AppRouter/model/appRoutes'
import { List } from '@mui/material'
import { ThemeSwitcher } from 'features/ThemeSwitcher/ui/ThemeSwitcher'
import styles from './Sidebar.module.scss'
import { SidebarNavItem } from './SidebarNavItem'

export const Sidebar = memo(() => {
  return (
    <aside className={styles.sidebar}>
      <Drawer
        variant="permanent"
        sx={{
          width: '200px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '200px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <List sx={{ paddingTop: '2px', paddingBottom: '2px' }}>
            {appRoutes.map((item) => {
              if (item.label !== undefined && item.Icon !== undefined) {
                return (
                  <SidebarNavItem
                    key={item.label}
                    path={item.path}
                    label={item.label}
                    Icon={item.Icon}
                  />
                )
              }
              return null
            })}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ThemeSwitcher />
          </Box>
        </Box>
      </Drawer>
    </aside>
  )
})
