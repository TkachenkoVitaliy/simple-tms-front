export function toHHMMSS(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60)
  const seconds = timeInSeconds - hours * 3600 - minutes * 60

  let hoursString
  let minutesString
  let secondsString

  if (hours < 10) {
    hoursString = `0${hours}`
  }
  if (minutes < 10) {
    minutesString = `0${minutes}`
  }
  if (seconds < 10) {
    secondsString = `0${seconds}`
  }
  return `${hoursString}:${minutesString}:${secondsString}`
}
