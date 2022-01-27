import { EnUsUnit } from '../../../../types/unit-register'
import { UnitDbCollection } from '../../../models/units/no'

export default async (Col: UnitDbCollection, doc: EnUsUnit) => {
  const result = await Col.updateOne(doc)
  return result
}