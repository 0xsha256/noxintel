/**
 * Caculates the time left of something
 * @param {startTime}
 * @param {transferred}
 * @param {total}
 * @returns Estimated time left
 */
export default (startTime: number, transferred: number, total: number) => {
  const elapsedTime = (new Date().getTime()) - startTime
  const chunksPerTime = transferred / elapsedTime
  const estimatedTotalTime = total / chunksPerTime
  const timeLeftInSeconds = (estimatedTotalTime - elapsedTime) / 1000
  return Math.round(timeLeftInSeconds * 10) / 10
}