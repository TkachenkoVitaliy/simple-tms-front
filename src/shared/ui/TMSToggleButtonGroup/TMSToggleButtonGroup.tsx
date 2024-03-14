import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'

import { ToggleButtonOption } from './types'

export interface TMSToggleButtonGroupProps<T> {
  direction?: 'row' | 'column'
  spacing?: number
  options: ToggleButtonOption<T>[]
  value: ToggleButtonOption<T>['value']
  onChange: (newValue: ToggleButtonOption<T>['value']) => void
  marginBetween?: string
  buttonAlign?: 'start' | 'center' | 'end'
  buttonWidth?: string
  stackWidth?: string
}

export function TMSToggleButtonGroup<T>(props: TMSToggleButtonGroupProps<T>) {
  const {
    direction,
    spacing,
    options,
    value,
    onChange,
    marginBetween,
    buttonAlign,
    buttonWidth,
    stackWidth,
  } = props

  return (
    <Stack
      direction={direction || 'row'}
      spacing={spacing}
      width={stackWidth}
    >
      <ToggleButtonGroup
        orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        value={value}
        exclusive
      >
        {options.map((option) => (
          <ToggleButton
            value={option.value}
            key={option.value.toString()}
            style={{ justifyContent: buttonAlign, width: buttonWidth }}
          >
            {option.icon}
            {option.name && (
              <div style={{ paddingLeft: marginBetween }}>{option.name}</div>
            )}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
}
