import axios, {AxiosRequestConfig} from 'axios'
import {Email} from './types'

/**
 * Get an email by its id
 * @param {string} id Unique ID of the email
 * @param {string} token OAuth Access token
 * @returns {Promise<Email>} Email contents
 * @example const email = await fetchEmailById('123456a123b1c1d1', 'ya01.a123456...')
 */
export const fetchEmailById = async (id: string, token: string): Promise<Email> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
    timeout: 15000,
    headers: {Authorization: `OAuth ${token}`},
    validateStatus: () => true,
  }

  const response = await axios.request(config)
  const {data: body} = response

  if (!body) {
    throw new Error(`Unable to parse response body. ${JSON.stringify(response)}`)
  }

  return body
}
