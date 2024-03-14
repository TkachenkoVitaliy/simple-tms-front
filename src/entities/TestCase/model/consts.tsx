import Auto from 'shared/assets/svg/auto.svg'
import HighPriority from 'shared/assets/svg/highprior.svg'
import LowPriority from 'shared/assets/svg/lowprior.svg'
import Manual from 'shared/assets/svg/manual.svg'
import NormalPriority from 'shared/assets/svg/medprior.svg'
import { ToggleButtonOption } from 'shared/ui/TMSToggleButtonGroup'

import { CasePriority, CaseType } from './types/testCase'

const WIDTH = '24px'
const HEIGHT = '24px'
const FILL_DEFAULT = 'var(--mui-palette-text-primary)'
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
  fill: FILL_DEFAULT,
}
const FILL_RED = '#d32f2f'
const FILL_BLUE = '#42a5f5'
const FILL_GREEN = '#81c784'

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
    icon: <HighPriority style={{ ...STYLE, fill: FILL_RED }} />,
    name: CasePriority.HIGH,
  },

  {
    value: CasePriority.NORMAL,
    icon: <NormalPriority style={{ ...STYLE, fill: FILL_BLUE }} />,
    name: CasePriority.NORMAL,
  },
  {
    value: CasePriority.LOW,
    icon: <LowPriority style={{ ...STYLE, fill: FILL_GREEN }} />,
    name: CasePriority.LOW,
  },
]
