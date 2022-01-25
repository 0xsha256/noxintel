import { createReadStream } from 'fs'
import { resolve } from 'path'
import zlib from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import { NORegisteredUnit, ENRegisteredUnit } from '../../../../types/unit-register/index'
import renameRegUnitToEn from './utils/rename-reg-unit-to-en'
import addWebsite from './utils/add-website'
import consola from 'consola'
import ora, { Ora } from 'ora'
const path = (str: string) => resolve(__dirname, str)


/**
  * @param {function} callback - A callback to run whose signature is (ENRegisteredUnit), where
  *  ENRegisteredUnit is an object.
  */
export default async (callback: (arg0: ENRegisteredUnit | boolean) => void) => {
  const stream = createReadStream(path('./tmp/no-unit-register.json.gz'))
  let counter = 0
  let spin: Ora

  stream
    .pipe(zlib.createGunzip())
    .pipe(parser())
    .pipe(streamArray())
    .on('data', ({ value }) => processData(value))
    .on('error', e => consola.error(e))
    .on('end', () => consola.info('Stream ended'))
    .on('close', () => consola.info('Stream closed'))

  async function processData(data: NORegisteredUnit | false) {
    if (data) {
      const unitObj = renameRegUnitToEn(data)
      const websiteObj = await addWebsite(unitObj.orgNumber)
      const mergedObj = Object.assign(unitObj, websiteObj)

      if (websiteObj) {
        counter++
        spin.text = counter.toLocaleString() + ' ' + 'units processed'
        callback(mergedObj)
      }
    } else {
      callback(false)
    }
  }
}