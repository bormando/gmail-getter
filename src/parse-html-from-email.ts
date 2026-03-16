import {Email, EmailPart} from './api'

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

  let mimeType: string

  try {
    mimeType = email.payload.mimeType
  } catch {
    throw new Error(
      `Failed to parse HTML from email - the email mime type is not set.
        \n${JSON.stringify(email)}`
    )
  }

  if (!mimeType) {
    throw new Error('Failed to parse HTML from email - the email mime type is not set.')
  }

  if (!mimeType.includes('multipart')) {
    let data: string

    try {
      data = email.payload.body.data

      if (typeof data !== 'string') {
        throw new Error()
      }
    } catch {
      throw new Error(
        `Failed to parse HTML from email - the email data is invalid.
          \n${JSON.stringify(email)}`
      )
    }

    return Buffer.from(data, 'base64').toString('ascii')
  }

  let parts: EmailPart[]

  try {
    parts = email.payload.parts

    if (!Array.isArray(parts)) {
      throw new Error()
    }
  } catch {
    throw new Error(
      `Failed to parse HTML from email - the email parts are invalid.
        \n${JSON.stringify(email.payload.parts)}`
    )
  }

  const part = parts.find(part => part.mimeType === 'text/html')

  if (!part) {
    throw new Error(
      `Failed to parse HTML from email - couldn't find HTML body part in the email.
        \n${JSON.stringify(parts)}`
    )
  }

  let data: string

  try {
    data = part.body.data

    if (typeof data !== 'string') {
      throw new Error()
    }
  } catch {
    throw new Error(
      `Failed to parse HTML from email - the email data is invalid.
        \n${JSON.stringify(part)}`
    )
  }

  return Buffer.from(part.body.data, 'base64').toString('ascii')
}
