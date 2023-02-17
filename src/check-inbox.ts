import {getEmailsList, EmailsList, Email, getEmail} from './api'

/**
 * Check Gmail inbox
 * @param {string} token OAuth Access token
 * @param {number} timeout Function timeout (ms)
 * @param {number} step Time between retries (ms)
 * @param {string} query Query that specifies search criteria (https://support.google.com/mail/answer/7190)
 * @returns {Promise<Email | null>} Email contents
 * @example const email = await checkInbox('ya01.a123456...', 15000, 2000, 'from:squier7 subject:Test!')
 */
export const checkInbox = async (
  token: string,
  timeout: number = 15000,
  step: number = 1500,
  query?: string
): Promise<Email | null> => {
  if (!token) throw new Error('Access Token is missing!')

  let email: Email | null = null
  let emails: EmailsList | null = null
  let startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    try {
      emails = await getEmailsList(token, query)
    } catch (error) {
      console.log(error)
    }

    if (emails) break

    await new Promise(resolve => setTimeout(resolve, step))
  }

  if (emails) {
    try {
      email = await getEmail(emails.messages![0].id, token)
    } catch (error) {
      console.log(error)
    }
  }

  return email
}
