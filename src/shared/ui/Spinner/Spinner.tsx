import { useMemo } from 'react'

import { useTheme } from '@mui/material'
import { Oval } from 'react-loader-spinner'

import { classNames } from 'shared/lib/utils'

import styles from './Spinner.module.scss'

export interface SprinnerProps {
  className?: string
  size?: number
  padding?: number
}

export const Spinner = ({
  size = 130,
  padding = 10,
  className,
}: SprinnerProps) => {
  const { palette } = useTheme()
  const { primary, secondary } = palette.text

  const spinnerSize = useMemo(() => size - 2 * padding, [size, padding])

  return (
    <div
      className={classNames(styles.wrapper, {}, [className])}
      style={{ padding: `${padding}px` }}
    >
      <Oval
        height={spinnerSize}
        width={spinnerSize}
        color={primary}
        visible
        ariaLabel="oval-loading"
        secondaryColor={secondary}
        strokeWidth={spinnerSize / 20}
        strokeWidthSecondary={spinnerSize / 20}
      />
    </div>
  )
}
