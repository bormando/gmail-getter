import axios, {AxiosRequestConfig} from 'axios'
import {EmailsList} from './types'
import {Message} from './types/message'

/**
 * Get list of emails
 * @param {string} token OAuth Access token
 * @param {string} [query] Query that specifies search criteria (https://support.google.com/mail/answer/7190)
 * @returns {Promise<Message[]>} List of emails
 * @example const emails = await fetchEmailsListByQuery('ya01.a123456...', 'from:squier7 subject:Test!')
 */
export const fetchEmailsListByQuery = async (token: string, query?: string): Promise<Message[]> => {
  if (!token) {
    throw new Error('Access token is missing!')
  }

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages${query ? `?q=${query}` : ''}`,
    timeout: 15000,
    headers: {Authorization: `OAuth ${token}`},
    validateStatus: () => true,
  }

  const response = await axios.request<EmailsList>(config)
  const {data: body} = response

  if (!body) {
    throw new Error(`Unable to parse response body. ${JSON.stringify(response)}`)
  }

  const {messages} = body

  if (!messages) {
    throw new Error(`Unable to parse messages from the response body. ${JSON.stringify(body)}`)
  }

  return messages
}
