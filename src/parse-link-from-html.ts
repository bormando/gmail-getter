import {Email} from './api'

/**
 * Parse HTML link from an email
 * @param {Email} email Email content
 * @param {RegExp} regex Regular expression for a link, example: https://regex101.com/r/f3RXKp/1
 * @returns {string | null} HTML link
 * @example const link = parseLinkFromHtml('test@gmail.com', /(https:\/\/)(\S*)(gmail-getter)([\w\/\?\=\-]*)/im)
 */
export const parseLinkFromHtml = (email: Email, regex: RegExp): string | null => {
  if (!email) throw new Error('Email is missing!')

  const part = email.payload.parts.find(part => part.mimeType === 'text/html')
  const encodedHtml = part!.body.data
  const decodedHtml = Buffer.from(encodedHtml, 'base64').toString('ascii')
  const link = decodedHtml.match(regex)

  return link ? link[0] : link
}
