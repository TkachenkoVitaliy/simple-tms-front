import { observer } from 'mobx-react-lite'

export interface TMSStepperProps<T> {
  steps: T[]
  itemComponent: (item: T) => JSX.Element
  activeBorderRadius?: string
  getKey: (item: T) => string
  isCurrent: (item: T) => boolean
}

function Stepper<T>(props: TMSStepperProps<T>) {
  const { steps, itemComponent, activeBorderRadius, getKey, isCurrent } = props

  const getItemView = (step: T) => {
    return (
      <div
        key={getKey(step)}
        style={{
          borderWidth: '3px',
          borderColor: isCurrent(step)
            ? 'var(--mui-palette-info-main)'
            : 'var(--mui-palette-text-primary)',
          borderRadius: activeBorderRadius || '50%',
          borderStyle: 'solid',
          width: 'fit-content',
          height: 'min-content',
          boxSizing: 'content-box',
          margin: '8px',
          cursor: 'default',
          color: isCurrent(step)
            ? 'var(--mui-palette-info-main)'
            : 'var(--mui-palette-text-primary)',
        }}
      >
        {itemComponent(step)}
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '20px' }}>
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
    </div>
  )
}

export const TMSStepper = observer(Stepper)
