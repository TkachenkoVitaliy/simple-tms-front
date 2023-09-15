import LowPriority from 'shared/assets/prior/lowprior.svg'
import NormalPriority from 'shared/assets/prior/medprior.svg'
import HighPriority from 'shared/assets/prior/highprior.svg'
import { ToggleButtonOption } from 'shared/types/autocompleteTypes'

export enum Priorities {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

export const priorities: ToggleButtonOption[] = [
  {
    value: Priorities.HIGH,
    icon: (
      <HighPriority
        style={{ width: '24px', height: '24px', fill: '#d32f2f' }}
      />
    ),
    name: Priorities.HIGH,
  },

  {
    value: Priorities.NORMAL,
    icon: (
      <NormalPriority
        style={{ width: '24px', height: '24px', fill: '#42a5f5' }}
      />
    ),
    name: Priorities.NORMAL,
  },
  {
    value: Priorities.LOW,
    icon: (
      <LowPriority style={{ width: '24px', height: '24px', fill: '#81c784' }} />
    ),
    name: Priorities.LOW,
  },
]
