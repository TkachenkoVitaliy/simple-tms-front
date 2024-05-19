export interface TMSStepperProps<T> {
  steps: T[]
  itemComponent: (item: T) => JSX.Element
  activeBorderRadius?: string
  getKey: (item: T) => string
  isCurrent: (item: T) => boolean
}

export function TMSStepper<T>(props: TMSStepperProps<T>) {
  const { steps, itemComponent, activeBorderRadius, getKey, isCurrent } = props

  const getItemView = (step: T) => {
    return (
      <div
        key={getKey(step)}
        style={{
          border: '2px',
          borderColor: isCurrent(step)
            ? 'var(--mui-pallete-info-main)'
            : 'var(--mui-palette-text-primary)',
          borderRadius: activeBorderRadius || '50%',
          borderStyle: 'solid',
          width: 'fit-content',
          height: 'min-content',
          boxSizing: 'content-box',
          margin: '8px',
        }}
      >
        {itemComponent(step)}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {steps.map((item) => getItemView(item))}
    </div>
  )
}
