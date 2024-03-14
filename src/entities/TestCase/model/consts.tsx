import Auto from 'shared/assets/svg/auto.svg'
import HighPriority from 'shared/assets/svg/highprior.svg'
import LowPriority from 'shared/assets/svg/lowprior.svg'
import Manual from 'shared/assets/svg/manual.svg'
import NormalPriority from 'shared/assets/svg/medprior.svg'
import { ToggleButtonOption } from 'shared/ui/TMSToggleButtonGroup'

import { CasePriority, CaseType } from './types/testCase'

const WIDTH = '24px'
const HEIGHT = '24px'
const FILL = 'var(--mui-palette-text-primary)'
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
  fill: FILL,
}

export const testCaseTypes: ToggleButtonOption<CaseType>[] = [
  {
    value: CaseType.MANUAL,
    icon: <Manual style={STYLE} />,
  },
  {
    value: CaseType.AUTO,
    icon: <Auto style={STYLE} />,
  },
]

export const testCasePriorities: ToggleButtonOption<CasePriority>[] = [
  {
    value: CasePriority.HIGH,
    icon: (
      <HighPriority
        style={{ width: '24px', height: '24px', fill: '#d32f2f' }}
      />
    ),
    name: CasePriority.HIGH,
  },

  {
    value: CasePriority.NORMAL,
    icon: (
      <NormalPriority
        style={{ width: '24px', height: '24px', fill: '#42a5f5' }}
      />
    ),
    name: CasePriority.NORMAL,
  },
  {
    value: CasePriority.LOW,
    icon: (
      <LowPriority style={{ width: '24px', height: '24px', fill: '#81c784' }} />
    ),
    name: CasePriority.LOW,
  },
]
