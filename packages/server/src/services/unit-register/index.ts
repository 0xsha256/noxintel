import downloadRegister from './download-register'
import processUnitRegisterData from './process-data'
import addUnitToDbCol from './publish-to-db'

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