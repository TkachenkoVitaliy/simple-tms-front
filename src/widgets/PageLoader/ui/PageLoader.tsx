import { Spinner } from 'shared/ui/Spinner'
import styles from './PageLoader.module.scss'

export const PageLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <h2>Идет загрузка страницы</h2>
        <Spinner className={styles.spinner} />
      </div>
    </div>
  )
}
