import {Email} from './api'

/**
 * Parse HTML link from an email
 * @param {Email} email Email content
 * @param {RegExp} regexp Regular expression for a link, example: https://regex101.com/r/f3RXKp/1
 * @returns {string | null} HTML link
 * @example const link = findElementByRegexp(email, regexp)
 */
export const findElementByRegexp = (email: Email, regexp: RegExp): string | null => {
  if (!email) {
    throw new Error('Email is missing!')
  }

  const part = email.payload.parts.find(part => part.mimeType === 'text/html')

  if (!part) {
    throw new Error(`Unable to find HTML content.\n${JSON.stringify(email.payload.parts)}`)
  }

  const encodedHtml = part.body.data
  const decodedHtml = Buffer.from(encodedHtml, 'base64').toString('ascii')
  const element = decodedHtml.match(regexp)

  if (!element || element.length === 0) {
    return null
  }

  return element[0]
}
