import { createWriteStream, existsSync, mkdirSync } from 'fs'
import got from 'got'
import { resolve } from 'path'
import stream from 'stream'
import { promisify } from 'util'
import ora, { Ora } from 'ora'
import timeLeft from '../../../../utils/time-left'

const pipeline = promisify(stream.pipeline)
const path = (str: string) => resolve(__dirname, str)
const prod = process.env.NODE_ENV === 'prod'

type Option = { prefix: string, url: string }
/**
 * Downloads a dataset containing all business units from a government register
 * @param {Option}
 * @returns boolean
 */
export default async (data: Option): Promise<unknown> => {
  const country = data.prefix
  const date = new Date().toISOString().split('T')[0]

  if (existsSync(path(`../../tmp/${country}-${date}-units.json.gz`))) {
    return true
  }

  const tmp = path('../../tmp')
  existsSync(tmp) ? {} : mkdirSync(tmp)

  const fileName = path(`../../tmp/${country}-${date}-units.json.gz`)

  const downloadStream = got.stream(data.url)
  const fileWriterStream = createWriteStream(fileName)
  const startTime = Number(new Date())
  let spin: Ora

  downloadStream.on('downloadProgress', ({ transferred, total }) => {
    const percentage = Math.round((100 * transferred) / total)

    if (!prod) {
      if (transferred === 0) spin = ora().start()
      spin.text = percentage === 100 ?
        'Download done' :
        `Downloading ${data.prefix}-units ${percentage}% | ${timeLeft(startTime, transferred, total)}s left`
    }
  })

  return await pipeline(downloadStream, fileWriterStream).then(() => true).catch(() => false)
}