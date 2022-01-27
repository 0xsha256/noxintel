import UnitRegister from '../../../../../db/models/units/no'
import { EnUsUnit } from '../../../../../types/unit-register/index'
import ora from 'ora'
import updateDoc from '../../../../../db/functions/units/update'
import setDoc from '../../../../../db/functions/units/set'
import { memory } from '../../../../../utils/memory'
let counter = 0
const spin = ora().start()

export default async (col: string, doc: EnUsUnit): Promise<boolean> => {
  const Col = UnitRegister(col)
  const docExists = await Col.exists({ orgNumber: doc.orgNumber })
  const result = docExists ? await updateDoc(Col, doc) : await setDoc(Col, doc)

  if (result) {
    counter++
    spin.text = `${counter.toLocaleString()} units updated in ${col} | ${memory()}`
    return true
  } else {
    return false
  }
}