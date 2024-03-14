import Auto from 'shared/assets/svg/auto.svg'
import Manual from 'shared/assets/svg/manual.svg'
import { ToggleButtonOption } from 'shared/ui/TMSToggleButtonGroup'

import { CaseType } from './types/testCase'

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
