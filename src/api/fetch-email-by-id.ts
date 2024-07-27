import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
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
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
    timeout: 15000,
    headers: {Authorization: `OAuth ${token}`},
    params: new URLSearchParams([['format', 'full']]),
  }

  let response: AxiosResponse<Email>

  try {
    response = await axios.request(config)
  } catch (e) {
    throw new Error(
      `Failed to fetch the email - API request to Google has failed.
      \n${JSON.stringify(e, null, 2)}`
    )
  }

  const {data: body} = response

  if (!body) {
    throw new Error(
      `Failed to fetch the email - unable to parse response body.
      \n${JSON.stringify(response, null, 2)}`
    )
  }

  return body
}
