import {Email} from './api'

/**
 * Parse HTML from email
 * @param {Email} email Email content
 * @returns {string} HTML content
 * @example const html = parseHtmlFromEmail(email)
 */
export const parseHtmlFromEmail = (email: Email): string => {
  if (!email) {
    throw new Error('Failed to parse HTML from email - the email object is null or undefined.')
  }

  const part = email.payload.parts.find(part => part.mimeType === 'text/html')

  if (!part) {
    throw new Error(
      `Failed to parse HTML from email - couldn't find HTML body part in the email.
      \n${JSON.stringify(email.payload.parts)}`
    )
  }

  const html = Buffer.from(part.body.data, 'base64').toString('ascii')

  return html
}
