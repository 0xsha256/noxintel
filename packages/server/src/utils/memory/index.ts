import prettyBytes from 'pretty-bytes'

export function getMemoryUsage(): Record<string, number> {
  const { heapUsed, rss } = process.memoryUsage()
  return { heap: heapUsed, rss }
}

export function memory(): string {
  const { heap, rss } = getMemoryUsage()
  return `\n${prettyBytes(heap)} (RSS: ${prettyBytes(rss)})\n`
}

function bytesToSize(bytes: number) {
  if (bytes == 0) return 0
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return Math.round(bytes / Math.pow(1024, i))
}

export function heap(): number {
  const { heap } = getMemoryUsage()
  return Number(bytesToSize(heap))
}

export function rss(): number {
  const { rss } = getMemoryUsage()
  return Number(bytesToSize(rss))
}

