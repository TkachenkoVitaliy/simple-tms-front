import { Spinner } from 'shared/ui/Spinner'

import styles from './PageLoader.module.scss'

export interface PageLoaderProps {
  message?: string
}

export const PageLoader = (props: PageLoaderProps) => {
  const { message } = props
  const DEFAULT_MESSAGE = 'Идет загрузка страницы'

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <h2>{message === undefined ? DEFAULT_MESSAGE : message}</h2>
        <Spinner className={styles.spinner} />
      </div>
    </div>
  )
}
