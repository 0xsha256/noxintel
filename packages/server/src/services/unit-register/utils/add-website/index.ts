import axios from 'axios'

type WebsiteObj = Promise<{ [key: string]: string | boolean } | undefined>

/**
 * 
 * @param orgNumber 
 * @returns 
 */
export default async (orgNumber: string): WebsiteObj => {
  try {
    const { data } = await axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
    return {
      website: data && data.hjemmeside ? data.hjemmeside : false
    }
  } catch (e) {
    const { response } = e
    if (e.response) {
      const { data, status } = response
      if (status === 410) {
        return {
          deleted: true,
          deletedDate: data.slettedato
        }
      } else {
        return
      }
    } else {
      return {
        terminated: true
      }
    }
  }
}