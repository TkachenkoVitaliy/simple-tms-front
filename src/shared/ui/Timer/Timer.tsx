import { useStopwatch } from 'react-timer-hook'

export interface TimerProps {
  startSecondsOffset?: number
}

export const Timer = (props: TimerProps) => {
  const { startSecondsOffset = 0 } = props
  const stopwatchOffset = new Date()
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 0)

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset })

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  )
}
