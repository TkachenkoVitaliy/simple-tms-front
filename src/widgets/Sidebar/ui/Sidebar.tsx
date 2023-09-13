import { memo, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { appRoutes } from 'app/providers/AppRouter/model/appRoutes'
import { IconButton, List } from '@mui/material'
import { ThemeSwitcher } from 'features/ThemeSwitcher/ui/ThemeSwitcher'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { ArrowBackIosNew } from '@mui/icons-material'
import { SidebarNavItem } from './SidebarNavItem'

import styles from './Sidebar.module.scss'

export const Sidebar = memo(
  observer(() => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
      <aside
        className={styles.sidebar}
        style={{ width: collapsed ? '50px' : '200px', transition: 'all 0.3s' }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? '50px' : '200px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: collapsed ? '50px' : '200px',
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
                  // Костыль переписать на определение в роутах
                  if (
                    appStore.activeProject?.id.toString ||
                    item.showWithoutActiveProject
                  ) {
                    return (
                      <SidebarNavItem
                        collapsed={collapsed}
                        key={item.label}
                        path={item
                          .path()
                          .replace(
                            ':projectId',
                            appStore.activeProject?.id.toString() || '0',
                          )}
                        label={item.label}
                        Icon={item.Icon}
                        end={!!item.end}
                      />
                    )
                  }
                }
                return null
              })}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <IconButton onClick={() => setCollapsed(!collapsed)}>
                <ArrowBackIosNew
                  sx={
                    collapsed
                      ? { rotate: '180deg', transition: 'all 0.3s' }
                      : { transition: 'all 0.3s' }
                  }
                />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ThemeSwitcher />
            </Box>
          </Box>
        </Drawer>
      </aside>
    )
  }),
)
