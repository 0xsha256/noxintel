import UnitRegister from '../../../../../db/models/unit-register'
import { ENRegisteredUnit } from '../../../../../types/unit-register/index'
import ora from 'ora'
import { memory } from '../../../../../utils/memory'

let counter = 0
const spin = ora().start()

async function update(doc: ENRegisteredUnit) {
  const result = await UnitRegister.updateOne(doc)

  if (result.acknowledged) {
    counter++
    spin.text = counter.toLocaleString() + ' ' + 'units added to DB' + ' ' + memory()
    return true
  } else {
    return false
  }
}

async function set(doc: ENRegisteredUnit) {
  const unitRegister = new UnitRegister(doc)

  const result = await unitRegister.save()

  if (result._id) {
    counter++
    spin.text = counter.toLocaleString() + ' ' + 'units added to DB' + ' ' + memory()
    return true
  } else {
    return false
  }
}

export default async (doc: ENRegisteredUnit): Promise<boolean> => {
  if (doc.terminated) return true

  const docExists = await UnitRegister.exists({ orgNumber: doc.orgNumber })

  if (docExists) {
    return update(doc)
  } else {
    return set(doc)
  }
}