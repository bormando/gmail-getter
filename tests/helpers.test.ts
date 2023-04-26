import {Email, checkInbox, parseLinkFromHtml, getToken, parseHtml} from 'src'
import * as schema from './schema.json'

describe('Helpers', () => {
  let token: string | null

  beforeAll(async () => {
    token = await getToken(
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!,
      process.env.REFRESH_TOKEN!
    )
  })

  describe('Check inbox', () => {
    let email: Email | null

    beforeAll(async () => {
      email = await checkInbox(token!, 15000, 1500, 'from:squier7 subject:Test!')
    })

    test('Returns an email', () => {
      expect(email).toMatchSchema(schema.definitions.Email)
    })

    test('Contains a link', () => {
      const link = parseLinkFromHtml(email!, /(https:\/\/)(\S*)(gmail-getter)([\w\/\?\=\-]*)/im)
      expect(typeof link).toBe('string')
    })

    test('Contains HTML content', () => {
      const link = parseHtml(email!)
      expect(typeof link).toBe('string')
    })
  })
})
