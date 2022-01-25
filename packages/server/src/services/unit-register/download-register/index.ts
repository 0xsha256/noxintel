import { createWriteStream, existsSync, mkdirSync, rmSync } from 'fs'
import got from 'got'
import { resolve } from 'path'
import stream from 'stream'
import { promisify } from 'util'
import ora, { Ora } from 'ora'
import timeLeft from '../../../utils/time-left'

const pipeline = promisify(stream.pipeline)
const path = (str: string) => resolve(__dirname, str)
const fileExists = existsSync(path('../tmp/no-unit-register.json.gz'))


export default async (): Promise<unknown> => {
  const url = 'https://data.brreg.no/enhetsregisteret/api/enheter/lastned'
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
      `Downloading NO-units ${percentage}% | ${timeLeft(startTime, transferred, total)}s left`
  })

  const result = await pipeline(downloadStream, fileWriterStream).then(() => true)

  return result && fileExists
}