import axios from 'axios'

type WebsiteObj = Promise<{ [key: string]: string | boolean } | undefined>

/**
 * 
 * @param orgNumber 
 * @returns A website url or boolean
 */
export default async (orgNumber: string): WebsiteObj => {
  try {
    const { data } = await axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
    return {
      website: data && data.hjemmeside ? data.hjemmeside : false
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 410) {
        return {
          deleted: true,
          deletedDate: e.response.data.slettedato
        }
      } else return
    } else return { terminated: true }
  }
}