import { get } from 'https'
import { createGunzip } from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import renameDocKeys from './utils/rename-doc-keys'
import pushDoc from './utils/push-doc'
import consola from 'consola'
import { heap } from '../../../utils/memory'
import { config } from 'dotenv'

config()

export default async () => {
  get(String(process.env.NO_UNIT_REGISTER_URL),
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          res.pause()
          if (res.isPaused() && heap() < Number(process.env.MAX_HEAP_FOR_UNIT_STREAM)) {
            const doc = renameDocKeys(value)
            const result = await pushDoc(String(process.env.NO_DB_COL_NAME), doc)
            if (result) res.resume()
          }
        })
        .on('error', ({ message }) => consola.error(message))
        .on('end', () => consola.info('Stream ended'))
        .on('close', () => consola.info('Stream closed'))
    })
}
