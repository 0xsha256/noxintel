import UnitRegister from '../../../../../db/models/unit-register'
import { ENRegisteredUnit } from '../../../../../types/unit-register/index'
import ora from 'ora'

let counter = 0
const spin = ora().start()

export default async (doc: ENRegisteredUnit): Promise<boolean> => {
  if (doc.terminated) return true

  const docExists = await UnitRegister.find({ orgNumber: doc.orgNumber }).select('orgNumber').lean()
  const unitRegister = new UnitRegister(doc)

  if (Array.isArray(docExists) ? docExists.length > 0 : docExists) {
    const result = await UnitRegister.updateOne(doc)

    if (result.acknowledged) {
      counter++
      spin.text = counter.toLocaleString() + ' ' + 'units added to DB'
      return true
    } else {
      return false
    }
  } else {
    const result = await unitRegister.save()

    if (result._id) {
      counter++
      spin.text = counter.toLocaleString() + ' ' + 'units added to DB'
      return true
    } else {
      return false
    }
  }
}