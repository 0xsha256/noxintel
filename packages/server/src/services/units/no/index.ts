import { get } from 'https'
import { createGunzip } from 'zlib'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import renameRegUnitToEn from './utils/rename-reg-unit-to-en'
import addWebsite from './utils/add-website'
import publishToDb from './utils/publish-to-db'
import consola from 'consola'

export default async () => {
  let counter = 0
  get('https://data.brreg.no/enhetsregisteret/api/enheter/lastned',
    (res) => {
      res
        .pipe(createGunzip())
        .pipe(parser())
        .pipe(streamArray())
        .on('data', async ({ value }) => {
          res.pause()

          if (res.isPaused()) {
            const unit = renameRegUnitToEn(value)
            const website = await addWebsite(unit.orgNumber)
            const doc = Object.assign(unit, website)

            if (website) {
              const result = await publishToDb(doc)
              if (result) {
                counter++
                console.log(counter)
                res.resume()
              }
            }
          }
        })
        .on('error', e => consola.error(e))
        .on('end', () => consola.info('Stream ended'))
        .on('close', () => console.info('Stream closed'))
    })
}
