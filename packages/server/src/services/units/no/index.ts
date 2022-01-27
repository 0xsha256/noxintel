import { get } from 'https'
import { createGunzip } from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import renameObjKeys from './utils/rename-obj-keys'
import fetchWebsiteUrl from './utils/fetch-website-url'
import setDoc from './utils/set-doc'
import consola from 'consola'
import { heap } from '../../../utils/memory'
export default async () => {
  get('https://data.brreg.no/enhetsregisteret/api/enheter/lastned',
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          res.pause()

          if (res.isPaused() && heap() < 150) {
            const unit = renameObjKeys(value)
            const website = await fetchWebsiteUrl(unit.orgNumber)
            const doc = Object.assign(unit, website)

            if (website) {
              const result = await setDoc(doc)
              if (result) {
                res.resume()
              }
            }
          }
        })
        .on('error', ({ message }) => consola.error(message))
        .on('end', () => consola.info('Stream ended'))
        .on('close', () => consola.info('Stream closed'))
    })
}
