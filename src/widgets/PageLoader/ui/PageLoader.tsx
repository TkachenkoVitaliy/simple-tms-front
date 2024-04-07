import { Spinner } from 'shared/ui/Spinner'

import styles from './PageLoader.module.scss'

export interface PageLoaderProps {
  message?: string
}

export const PageLoader = (props: PageLoaderProps) => {
  const { message } = props

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        {message === undefined ? null : <h2>{message}</h2>}
        <Spinner className={styles.spinner} />
      </div>
    </div>
  )
}
