import { get } from 'https'
import { createGunzip } from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import renameDocKeys from './utils/rename-doc-keys'
import consola from 'consola'
import { config } from 'dotenv'
import { EnUsUnit } from '../../../types/unit-register/index'
import UnitRegister from '../../../db/models/units'
import ora from 'ora'

config()

export default async () => {
  const units = [] as Array<EnUsUnit>
  const col = String(process.env.NO_DB_COL_NAME)
  const Col = UnitRegister(col)
  const spin = ora().start()

  get(String(process.env.NO_UNIT_REGISTER_URL),
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          const doc = renameDocKeys(value)
          units.push(doc)
          spin.text = `${units.length.toLocaleString()} units collected`
        })
        .on('error', ({ message }) => consola.error(message))
        .on('end', async () => {
          spin.succeed('Stream ended\n')
          consola.info(`Inserting collection in ${col}`)
          const result = await Col.insertMany(units, {})
          consola.info(`${result.length} documents were inserted`)
          consola.info(result)
        })
    })
}
