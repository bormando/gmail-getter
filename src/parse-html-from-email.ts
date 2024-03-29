import {Email} from './api'

/**
 * Parse HTML code from an email
 * @param {Email} email Email content
 * @returns {string} HTML code
 * @example const html = parseHtmlFromEmail(email)
 */
export const parseHtmlFromEmail = (email: Email): string => {
  if (!email) {
    throw new Error('Email is missing!')
  }

  const part = email.payload.parts.find(part => part.mimeType === 'text/html')

  if (!part) {
    throw new Error(
      `Couldn't find HTML body part in email.\n${JSON.stringify(email.payload.parts)}`
    )
  }

  const html = Buffer.from(part.body.data, 'base64').toString('ascii')

  return html
}
