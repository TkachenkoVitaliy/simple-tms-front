import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SimpleLogo from 'shared/assets/svg/s-logo.svg'
import styles from './Header.module.scss'
import { ProjectSelect } from 'features/ProjectSelect'

export const Header = memo(
  observer(() => {
    const navigate = useNavigate()

    const onLogoClick = () => {
      navigate('/')
    }

    return (
      <AppBar
        className={styles.header}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className={styles.toolbar}>
          <Button
            className={styles.logoBtn}
            variant="text"
            component="button"
            onClick={onLogoClick}
          >
            <SimpleLogo
              width={24}
              height={24}
              fill="#fff"
            />
            <Typography
              className={styles.logoText}
              variant="h6"
              component="div"
            >
              SimpleTMS
            </Typography>
          </Button>
          <ProjectSelect />
          <Button
            className={styles.authBtn}
            component="button"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    )
  }),
)
