import { createWriteStream, existsSync, mkdirSync } from 'fs'
import got from 'got'
import { resolve } from 'path'
import stream from 'stream'
import { promisify } from 'util'
import ora from 'ora'
import timeLeft from '../../../../utils/time-left'

const pipeline = promisify(stream.pipeline)
const path = (str: string) => resolve(__dirname, str)

export default async (prefix: string, url: string): Promise<unknown> => {
  const tmp = path('../tmp')
  existsSync(tmp) ? {} : mkdirSync(tmp)
  const fileName = resolve(__dirname, '../tmp/no-unit-register.json.gz')

  const downloadStream = got.stream(url)
  const fileWriterStream = createWriteStream(fileName)
  const startTime = Number(new Date())
  const spin = ora().start()

  downloadStream.on('downloadProgress', ({ transferred, total }) => {

    const percentage = Math.round((100 * transferred) / total)

    spin.text = percentage === 100 ?
      'Download done' :
      `Downloading ${prefix}-units ${percentage}% | ${timeLeft(startTime, transferred, total)}s left`
  })

  const result = await pipeline(downloadStream, fileWriterStream).then(() => true)

  return result
}