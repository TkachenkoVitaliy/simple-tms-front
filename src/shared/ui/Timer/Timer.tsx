import { useEffect } from 'react'

import { useStopwatch } from 'react-timer-hook'

export interface TimerProps {
  startSecondsOffset?: number
  setTotalSeconds?: (totalSeconds: number) => void
  label?: string
}

export const Timer = (props: TimerProps) => {
  const { startSecondsOffset = 0, setTotalSeconds, label = '' } = props
  const stopwatchOffset = new Date()
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + startSecondsOffset)

  const { totalSeconds, seconds, minutes, hours, days } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset,
  })

  useEffect(() => {
    if (setTotalSeconds) {
      setTotalSeconds(totalSeconds)
    }
  }, [totalSeconds, setTotalSeconds])

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px' }}>
        <span>{label}</span>
        <span>
          {days * 24 + hours < 10 ? `0${days * 24 + hours}` : days * 24 + hours}
        </span>
        :<span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  )
}
