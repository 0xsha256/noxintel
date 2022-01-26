import { createReadStream } from 'fs'
import { resolve } from 'path'
import zlib from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import { NORegisteredUnit, ENRegisteredUnit } from '../../../../types/unit-register/index'
import renameRegUnitToEn from './utils/rename-reg-unit-to-en'
import addWebsite from './utils/add-website'
import consola from 'consola'
import ora from 'ora'
import { memory } from '../../../../utils/memory'

const path = (str: string) => resolve(__dirname, str)

/**
  * @param prefix - Prefix follows ISO 3166-1 alpha-2 codes, which are two-letter country codes defined in ISO 3166-1
  * @param {function} callback - A callback to run whose signature is (ENRegisteredUnit), where
  *  ENRegisteredUnit is an object.
  */
export default async (prefix: string, callback: (arg0: ENRegisteredUnit | boolean) => void) => {
  const date = new Date().toISOString().split('T')[0]
  const stream = createReadStream(path(`../../tmp/${prefix}-${date}-units.json.gz`))
  let counter = 0
  const spin = ora().start()

  stream
    .pipe(zlib.createGunzip())
    .pipe(parser())
    .pipe(streamArray())
    .on('data', ({ value }) => processData(value))
    .on('error', e => consola.error(e))
    .on('end', () => {
      spin.text = 'All units have been processed'
      consola.info('Stream ended')
    })
    .on('close', () => consola.info('Stream closed'))

  async function processData(data: NORegisteredUnit | false) {
    if (data) {
      const unitObj = renameRegUnitToEn(data)
      const websiteObj = await addWebsite(unitObj.orgNumber)
      const mergedObj = Object.assign(unitObj, websiteObj)

      if (websiteObj) {
        counter++
        spin.text = counter.toLocaleString() + ' ' + 'units processed' + ' '
        callback(mergedObj)
      }
    } else {
      callback(false)
    }
  }
}