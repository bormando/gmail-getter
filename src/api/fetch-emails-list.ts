import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {EmailsList, Message} from './types'

export type FetchEmailsListOptions = {
  token: string
  query?: string
}

/**
 * Get list of emails
 * @param {FetchEmailsListOptions} options - The Options object
 * @param {string} options.token OAuth Access token
 * @param {string} [options.query] Query that specifies search criteria (https://support.google.com/mail/answer/7190)
 * @returns {Promise<Message[]>} List of emails
 * @example const emails = await fetchEmailsList('ya01.a123456...', 'from:squier7 subject:Test!')
 */
export const fetchEmailsList = async (options: FetchEmailsListOptions): Promise<Message[]> => {
  const {token, query} = options

  if (!token) {
    throw new Error('Failed to fetch emails lists - access token is missing.')
  }

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
    timeout: 15000,
    headers: {Authorization: `OAuth ${token}`},
    params: query ? new URLSearchParams([['q', query]]) : undefined,
  }

  let response: AxiosResponse<EmailsList>

  try {
    response = await axios.request(config)
  } catch (e) {
    throw new Error(
      `Failed to fetch emails list - API request to Google has failed.
        \n${JSON.stringify(e, null, 2)}`
    )
  }

  const {data: body} = response

  if (!body) {
    throw new Error(
      `Failed to fetch emails list - unable to parse response body.
        \n${JSON.stringify(response, null, 2)}`
    )
  }

  const {messages, resultSizeEstimate} = body

  if (!messages && resultSizeEstimate === 0) {
    return []
  }

  if (messages && messages.length > 0) {
    return messages
  }

  throw new Error(
    `Failed to fetch emails list - unable to parse messages from the response body.
      \n${JSON.stringify(body, null, 2)}`
  )
}
