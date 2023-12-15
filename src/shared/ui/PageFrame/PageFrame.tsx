import styles from './PageFrame.module.scss'

export interface PageFrameProps {
  children: React.ReactNode
}

export const PageFrame = (props: PageFrameProps) => {
  const { children } = props
  return <div className={styles.frame}>{children}</div>
}
