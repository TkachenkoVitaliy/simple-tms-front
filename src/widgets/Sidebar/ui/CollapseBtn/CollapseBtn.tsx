import { memo } from 'react'

import { ArrowBackIosNew } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

import styles from './CollapseBtn.module.scss'

export interface CollapseBtnProps {
  toggleCollapsed: () => void
  isCollapsed: boolean
}

export const CollapseBtn = memo((props: CollapseBtnProps) => {
  const { toggleCollapsed, isCollapsed } = props
  return (
    <Box className={styles.box}>
      <IconButton onClick={toggleCollapsed}>
        <ArrowBackIosNew
          className={isCollapsed ? styles.arrowCollapsed : styles.arrowExpanded}
        />
      </IconButton>
    </Box>
  )
})
