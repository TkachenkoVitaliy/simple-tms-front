import { Typography, Divider } from '@mui/material'

export interface TMSStepperProps<T> {
  steps: T[]
  itemComponent: (item: T) => JSX.Element
  activeBorderRadius?: string
  getKey: (item: T) => string
  isCurrent: (item: T) => boolean
  statusText?: (items: T[]) => string
}

export function TMSStepper<T>(props: TMSStepperProps<T>) {
  const {
    steps,
    itemComponent,
    activeBorderRadius,
    getKey,
    isCurrent,
    statusText,
  } = props

  const getItemView = (step: T) => {
    return (
      <div
        key={getKey(step)}
        style={{
          borderWidth: '3px',
          borderColor: isCurrent(step)
            ? 'var(--mui-pallete-info-main)'
            : 'var(--mui-palette-text-primary)',
          borderRadius: activeBorderRadius || '50%',
          borderStyle: 'solid',
          width: 'fit-content',
          height: 'min-content',
          boxSizing: 'content-box',
          margin: '8px',
          cursor: 'default',
          color: isCurrent(step)
            ? 'var(--mui-pallete-info-main)'
            : 'var(--mui-palette-text-primary)',
        }}
      >
        {itemComponent(step)}
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'fit-content',
          margin: '0 auto',
        }}
      >
        {steps.map((item) => getItemView(item))}
      </div>
      {statusText && (
        <Typography
          align="center"
          variant="h4"
          style={{ width: '100%', margin: '18px 0' }}
        >
          {statusText(steps)}
        </Typography>
      )}
      <Divider variant="fullWidth" />
    </div>
  )
}
