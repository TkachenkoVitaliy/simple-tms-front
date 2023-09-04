import { Button, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import S from 'shared/assets/s.svg'

export const Navbar = memo(
  observer(() => {
    return (
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="text"
            sx={{ textTransform: 'none' }}
            component="button"
          >
            <S
              width={24}
              height={24}
              fill="#fff"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ paddingLeft: '10px', color: 'white' }}
            >
              SimpleTMS
            </Typography>
          </Button>

          <Typography
            variant="h6"
            component="div"
          >
            {appStore.activeProject?.name || ''}
          </Typography>
          <Button
            color="inherit"
            component="button"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    )
  }),
)
