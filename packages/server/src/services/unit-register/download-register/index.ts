import { createWriteStream, existsSync, mkdirSync, rmSync } from 'fs'
import got from 'got'
import { resolve } from 'path'
import stream from 'stream'
import { promisify } from 'util'
import ora, { Ora } from 'ora'

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
    const elapsedTime = (new Date().getTime()) - startTime
    const chunksPerTime = transferred / elapsedTime
    const estimatedTotalTime = total / chunksPerTime
    const timeLeftInSeconds = (estimatedTotalTime - elapsedTime) / 1000

    const withOneDecimalPlace = Math.round(timeLeftInSeconds * 10) / 10

    spin.text = `Downloading NO-units ${Math.round(transferred)} ${withOneDecimalPlace}s left`
    //  spin.text = 'Downloading NO-units' + ' ' + parseInt(transferred.toLocaleString()) + '/' + parseInt(total.toLocaleString()) + '\n'

  })

  const result = await pipeline(downloadStream, fileWriterStream).then(() => true)

  if (result && fileExists) {
    return true
  } else {
    return false
  }
}