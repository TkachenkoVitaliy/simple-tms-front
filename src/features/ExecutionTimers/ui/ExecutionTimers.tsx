import { Timer } from 'shared/ui/Timer'

export interface ExecutionTimersProps {
  testRunTimer: number
  caseTimer: number
  setCaseTimer: (timer: number) => void
}

export const ExecutionTimers = (props: ExecutionTimersProps) => {
  const { testRunTimer, caseTimer, setCaseTimer } = props

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Timer
        label="Case Timer - "
        startSecondsOffset={caseTimer}
        setTotalSeconds={setCaseTimer}
      />
      <Timer
        label="Test run Timer - "
        startSecondsOffset={testRunTimer}
      />
    </div>
  )
}
