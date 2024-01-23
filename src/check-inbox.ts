import {fetchEmailsListByQuery, Email, fetchEmailById, Message} from './api'

export type CheckInboxOptions = {
  token: string
  timeout?: number
  step?: number
  all?: boolean
  query?: string
}

/**
 * Check Gmail inbox
 * @param {CheckInboxOptions} options - The Options object
 * @param {string} options.token OAuth Access token
 * @param {number} [options.timeout=15000] Function timeout (ms)
 * @param {number} [options.step=1500] Time between retries (ms)
 * @param {boolean} [options.all=false] Whether to find a single email or all mathing the query criteria
 * @param {string} [options.query] Query that specifies search criteria (https://support.google.com/mail/answer/7190)
 * @returns {Promise<Email | Email[] | null>} Email contents
 * @example const email = await checkInbox({token: 'ya01.a123456...', query: 'from:squier7 subject:Test!'})
 */
export const checkInbox = async (options: CheckInboxOptions): Promise<Email | Email[] | null> => {
  const {token, query} = options
  const timeout = options.timeout || 15000
  const step = options.step || 1500
  const all = options.all || false

  if (!token) {
    throw new Error('Access token is missing!')
  }

  let emails: Email[] = []
  let messages: Message[] | undefined
  let startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    try {
      messages = await fetchEmailsListByQuery(token, query)
    } catch (error) {
      console.log(error)
    }

    if (messages) break

    await new Promise(resolve => setTimeout(resolve, step))
  }

  if (!messages) {
    return null
  }

  if (messages.length === 0) {
    return null
  }

  for (const message of messages) {
    const email = await fetchEmailById(message.id, token)
    emails.push(email)

    if (all) {
      await new Promise(resolve => setTimeout(resolve, step))
    }
  }

  if (!all) {
    return emails[0]
  }

  return emails
}
