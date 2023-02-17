import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {Email} from './types'

/**
 * Get an email by its id
 *
 * @param {string} id Unique ID of the email
 * @param {string} token OAuth Access token
 * @returns {Promise<Email | null>} Email contents
 * @example const email = await getEmail('123456a123b1c1d1', 'ya01.a123456...')
 */
export const getEmail = async (id: string, token: string): Promise<Email | null> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
    timeout: 15000,
    headers: {Authorization: `OAuth ${token}`},
    validateStatus: () => true,
  }

  let response: AxiosResponse | null = null

  try {
    response = await axios.request(config)
  } catch (error) {
    console.log(error)
  }

  if (!response) return null

  const body = response.data

  return body
}
