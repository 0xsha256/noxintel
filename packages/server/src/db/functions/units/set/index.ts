import { EnUsUnit } from '../../../../types/unit-register'
import { UnitDbCollection } from '../../../models/units/no'

export default async (Col: UnitDbCollection, doc: EnUsUnit) => {
  const unitRegister = new Col(doc)
  const result = await unitRegister.save()
  return result
}