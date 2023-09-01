import { Box, Button, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import S from 'shared/assets/s.svg'

export const Navbar = memo(() => {
  const location = useLocation()

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
          {location.pathname}
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
})
