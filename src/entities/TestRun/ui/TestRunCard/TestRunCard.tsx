import { observer } from 'mobx-react-lite'

import { Card, TextField } from '@mui/material'

import { useProjectStores } from 'shared/lib/hooks/useProjectStores'
import { classNames, toHHMMSS } from 'shared/lib/utils'
import { TMSCardContent } from 'shared/ui/TMSCardContent'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import styles from './TestRunCard.module.scss'

export interface TestRunCardProps {
  className?: string
}

export const TestRunCard = observer((props: TestRunCardProps) => {
  const { className } = props
  const { testRunStore } = useProjectStores()

  return (
    <TMSSkeleton
      className={classNames(styles.skeleton, {}, [className])}
      isLoading={testRunStore.isLoading}
      width="50%"
    >
      <Card
        className={classNames(styles.card, {}, [className])}
        variant="elevation"
        raised
      >
        <TMSCardContent>
          <TextField
            value={testRunStore.testRun?.name}
            label="Test Run"
          />
          <TextField
            value={testRunStore.testRun?.testPlan.name}
            label="Test Plan"
          />
          <TextField
            value={toHHMMSS(
              testRunStore.testRun ? testRunStore.testRun.timer : 0,
            )}
            label="Timer (HH:MM:SS)"
          />
        </TMSCardContent>
      </Card>
    </TMSSkeleton>
  )
})
