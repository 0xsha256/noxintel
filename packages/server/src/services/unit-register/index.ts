import downloadRegister from '../units/utils/download-register'
import processUnitRegisterData from './process-data'
import addUnitToDbCol from '../units/utils/publish-to-db'

export default async () => {
  const downloaded = await downloadRegister()

  if (downloaded) {
    processUnitRegisterData((doc): void => {
      if (typeof doc === 'object') {
        addUnitToDbCol(doc)
      } else {
        console.log('Done')
      }
    })
  }
}