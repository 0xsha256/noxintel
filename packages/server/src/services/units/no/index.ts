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
  const colName = String(process.env.NO_DB_COL_NAME)
  const col = db.collection(colName)
  const spin = ora().start()

  get(String(process.env.NO_UNIT_REGISTER_URL),
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          units.push(renameDocKeys(value))
          spin.text = `${units.length.toLocaleString()} units collected`
        })
        .on('error', ({ message }) => consola.error(message))
        .on('end', () => {
          spin.text = `Inserting units in ${colName}`
          col.insertMany(units, {}, () => {
            spin.succeed(`All units successfully inserted in ${colName}`)
          })
        })
    })
}
