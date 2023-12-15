import { Replay } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useRouteError } from 'react-router-dom'

import styles from './ErrorPage.module.scss'

interface RouterError {
  statusText?: string
  message?: string
}

function ErrorPage() {
  // TODO: прочитать о правильной обработке ошибок (как в контексте React Router Dom так и ошибок от бекенда)
  const error = useRouteError() as RouterError

  const reload = () => {
    window.location.reload()
  }

  return (
    <div className={styles.errorPage}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Oops!</h1>
        <p className={styles.text}>Sorry, an unexpected error has occurred.</p>
        <p className={styles.text}>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button
          className={styles.btn}
          color="primary"
          variant="contained"
          onClick={reload}
          startIcon={<Replay />}
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
