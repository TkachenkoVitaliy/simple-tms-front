import styles from './PageFrame.module.scss'

export interface PageFrameProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const PageFrame = (props: PageFrameProps) => {
  const { children, style } = props
  return (
    <div
      className={styles.frame}
      style={style}
    >
      {children}
    </div>
  )
}
