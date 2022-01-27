import axios from 'axios'

type WebsiteObj = Promise<{ [key: string]: string | boolean } | undefined>

/**
 * 
 * @param orgNumber 
 * @returns A website url or boolean
 */

axios.interceptors.response.use(response => {
  return response
}, error => {
  return error
})

export default async (orgNumber: string): WebsiteObj => {
  const { data, status } = await axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
    .catch((err) => {
      return Promise.reject(err)
    })

  if (status === 200) {
    return {
      website: data && data.hjemmeside ? data.hjemmeside : false
    }
  } else {
    return { terminated: true }
  }
}