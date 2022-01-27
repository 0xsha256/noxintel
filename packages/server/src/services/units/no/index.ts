import { get } from 'https'
import { createGunzip } from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import renameDocKeys from './utils/rename-doc-keys'
import consola from 'consola'
import { config } from 'dotenv'
import { EnUsUnit } from '../../../types/unit-register/index'
import ora from 'ora'
import db from '../../../db'
import { Collection } from 'mongodb'
config()

export default async () => {
  const units = [] as Array<Collection<EnUsUnit>>
  const col = String(process.env.NO_DB_COL_NAME)
  const Col = db.collection(col)
  const spin = ora().start()

  get(String(process.env.NO_UNIT_REGISTER_URL),
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          /**
           * @todo options:
           * 1. Can write out a file and inject it in col
           * 2. Can try to insert the units array as col
           */
          units.push(renameDocKeys(value))
          spin.text = `${units.length.toLocaleString()} units collected`
        })
        .on('error', ({ message }) => consola.error(message))
        .on('end', async () => {
          spin.succeed('Stream ended\n')
          consola.info(`Inserting collection in ${col}`)
          Col.insertMany(units, {}, callback)
        })
    })
  /*
          consola.info(`${result.length} documents were inserted`)
          consola.info(result)*/
  function callback(proxy: any) {
    console.log(proxy)
  }
}
