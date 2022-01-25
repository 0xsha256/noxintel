import prettyBytes from 'pretty-bytes'

export function getMemoryUsage(): Record<string, number> {
  const { heapUsed, rss } = process.memoryUsage()
  return { heap: heapUsed, rss }
}

export function memory(): string {
  const { heap, rss } = getMemoryUsage()
  return `\n${prettyBytes(heap)} (RSS: ${prettyBytes(rss)})\n`
}
