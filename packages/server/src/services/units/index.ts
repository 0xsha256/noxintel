import downloadRegister from '../units/utils/download-register'
import processUnitRegisterData from './countries/no'
import addUnitToDbCol from '../units/utils/publish-to-db'
import countries from './utils/countries'

export default async (prefix: string) => {
  const match = countries.filter((i) => i.prefix === prefix)
  const data = match.reduce((i) => i) as { prefix: string, url: string }
  const downloaded = await downloadRegister(data)

  if (downloaded) {
    processUnitRegisterData(data.prefix, (doc): void => {
      if (typeof doc === 'object') {
        addUnitToDbCol(doc)
      } else {
        console.log('Done')
      }
    })
  }
}