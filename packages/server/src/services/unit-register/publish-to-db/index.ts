import UnitRegister from '../../../db/models/unit-register'
import { ENRegisteredUnit } from '../../../types/unit-register/index'

export default async (doc: ENRegisteredUnit) => {
  try {

    if (doc.terminated) return

    const docExists = await UnitRegister.exists({ orgNumber: doc.orgNumber })

    if (docExists) {
      UnitRegister.updateOne(doc)
    } else {

      const unitRegister = new UnitRegister(doc)
      unitRegister.save()
    }
  } catch (e) {
    console.log(e)
  }
}