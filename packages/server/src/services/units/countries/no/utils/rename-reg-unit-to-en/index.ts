import { NORegisteredUnit, ENRegisteredUnit } from '../../../../../../types/unit-register'
import data from './data'

// @ts-ignore
const mapShortToLong = new Map(data)

export default (object: NORegisteredUnit) => {
  // Using a `Map` here to provide a `Map` example, but you can ue an object as
  // in the previous ones if you prefer if the keys are strings
  // @ts-ignore
  function renameKeys(o): ENRegisteredUnit {
    // Only handle non-null objects
    if (o === null || typeof o !== 'object') {
      return o
    }

    // Handle array just by handling their contents
    if (Array.isArray(o)) {
      // @ts-ignore
      return o.map(renameKeys)
    }

    const build = {}
    for (const key in o) {
      // Get the destination key
      const destKey = mapShortToLong.get(key) || key

      // Get the value
      let value = o[key]

      // If this is an object, recurse
      if (typeof value === 'object') {
        value = renameKeys(value)
      }

      // @ts-ignore | Set it on the result using the destination key
      build[destKey] = value
    }
    return build as ENRegisteredUnit
  }

  return renameKeys(object)
}