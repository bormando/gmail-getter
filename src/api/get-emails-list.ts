import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {EmailsList} from './types'

/**
 * Get list of emails
 *
 * @param {string} token OAuth Access token
 * @param {string} query Query that specifies search criteria (https://support.google.com/mail/answer/7190)
 * @returns {Promise<EmailsList | null>} List of emails
 * @example const emails = await getEmailsList('ya01.a123456...', 'from:squier7 subject:Test!')
 */
export const getEmailsList = async (token: string, query?: string): Promise<EmailsList | null> => {
  if (!token) throw new Error('Access Token is missing!')

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages${query ? `?q=${query}` : ''}`,
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

  if (!response) {
    return null
  }

  const body = response.data

  if (!body.hasOwnProperty('messages')) return null

  return body
}
