import { Skeleton, SkeletonProps } from '@mui/material'

export interface TMSSkeletonProps {
  className?: string
  children?: SkeletonProps['children']
  animation?: SkeletonProps['animation']
  height?: SkeletonProps['height']
  width?: SkeletonProps['width']
  variant?: SkeletonProps['variant']
  isLoading: boolean
}

export const TMSSkeleton = (props: TMSSkeletonProps) => {
  const { className, children, animation, height, width, variant, isLoading } =
    props
  return isLoading ? (
    <Skeleton
      className={className}
      animation={animation || 'wave'}
      height={height}
      width={width}
      variant={variant || 'rounded'}
      component="div"
    >
      {children}
    </Skeleton>
  ) : (
    children
  )
}
