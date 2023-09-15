import { ToggleButtonOption } from 'shared/types/autocompleteTypes'
import Manual from 'shared/assets/manual.svg'
import Auto from 'shared/assets/auto.svg'

export enum TestTypes {
  MANUAL = 'manual',
  AUTO = 'auto',
}

export const testTypes: ToggleButtonOption[] = [
  {
    value: TestTypes.MANUAL,
    icon: (
      <Manual
        style={{
          width: '24px',
          height: '24px',
          fill: 'var(--mui-palette-text-primary)',
        }}
      />
    ),
  },
  {
    value: TestTypes.AUTO,
    icon: (
      <Auto
        style={{
          width: '24px',
          height: '24px',
          fill: 'var(--mui-palette-text-primary)',
        }}
      />
    ),
  },
]
