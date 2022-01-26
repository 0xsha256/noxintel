import UnitRegister from '../../../../db/models/unit-register'
import { ENRegisteredUnit } from '../../../../types/unit-register/index'
import ora from 'ora'

let counter = 0

const spin = ora().start()
export default async (doc: ENRegisteredUnit) => {
  if (doc.terminated) return

  const docExists = await UnitRegister.find({ orgNumber: doc.orgNumber }).select('orgNumber').lean()
  const unitRegister = new UnitRegister(doc)

  if (Array.isArray(docExists) ? docExists.length > 0 : docExists) {
    UnitRegister.updateOne(doc).then((r) => {
      if (r.acknowledged) {
        counter++
        spin.text = counter.toLocaleString() + ' ' + 'units added to DB'
      }
    })
  } else {
    unitRegister.save().then((r) => {
      if (r._id) {
        counter++
        spin.text = counter.toLocaleString() + ' ' + 'units added to DB'
      }
    })
  }
}