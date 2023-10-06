import { Oval } from 'react-loader-spinner'
import { Typography, TypographyProps, useTheme } from '@mui/material'

import { useEffect, useState } from 'react'

import styles from './Loader.module.scss'

export interface LoaderProps {
  size?: number
  typography?: TypographyProps['variant']
}

export const Loader = ({ size = 110, typography = 'h5' }: LoaderProps) => {
  const loading = 'Loading'

  const [text, setText] = useState<string>(`${loading}...`)
  const { palette } = useTheme()
  const { primary, secondary } = palette.text

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        return prev.length - loading.length >= 3 ? `${loading}.` : `${prev}.`
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.wrapper}>
      <Typography
        variant={typography}
        sx={{ marginBottom: `${size / 7.5}px` }}
      >
        {text}
      </Typography>
      <Oval
        height={size}
        width={size}
        color={primary}
        visible
        ariaLabel="oval-loading"
        secondaryColor={secondary}
        strokeWidth={size / 20}
        strokeWidthSecondary={size / 20}
      />
    </div>
  )
}
