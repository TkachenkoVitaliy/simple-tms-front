import { Skeleton, SkeletonProps } from '@mui/material'

export interface TMSSkeletonProps {
  children: SkeletonProps['children']
  animation?: SkeletonProps['animation']
  height?: SkeletonProps['height']
  width?: SkeletonProps['width']
  variant?: SkeletonProps['variant']
  isLoading: boolean
}

export const TMSSkeleton = (props: TMSSkeletonProps) => {
  const { children, animation, height, width, variant, isLoading } = props
  return isLoading ? (
    <Skeleton
      sx={{ margin: '0 auto', borderRadius: '10px' }}
      animation={animation || 'wave'}
      height={height}
      width={width}
      variant={variant || 'rectangular'}
      component="div"
    >
      {children}
    </Skeleton>
  ) : (
    children
  )
}
