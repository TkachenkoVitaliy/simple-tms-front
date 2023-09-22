import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { ToggleButtonOption } from 'shared/types/autocompleteTypes'

export interface TMSToggleButtonGroupProps {
  direction?: 'row' | 'column'
  spacing?: number
  options: ToggleButtonOption[]
  value: ToggleButtonOption['value']
  onChange: (newValue: ToggleButtonOption['value']) => void
  marginBetween?: string
  buttonAlign?: 'start' | 'center' | 'end'
  buttonWidth?: string
  stackWidth?: string
}

export function TMSToggleButtonGroup(props: TMSToggleButtonGroupProps) {
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
        onChange={(_, val) => {
          if (val !== null) onChange(val)
        }}
      >
        {options.map((option) => (
          <ToggleButton
            value={option.value}
            key={option.value}
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
