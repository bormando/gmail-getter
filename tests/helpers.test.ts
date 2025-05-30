import {Email, checkInbox, getAccessToken, parseHtmlFromEmail} from 'dist'
import * as schema from './schema.json'

describe('Helpers', () => {
  let token: string

  beforeAll(async () => {
    token = await getAccessToken(
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!,
      process.env.REFRESH_TOKEN!
    )
  })

  describe('Check Inbox', () => {
    let email: Email

    beforeAll(async () => {
      email = await checkInbox({token, query: 'from:squier7 subject:Test!'})
    })

    test('Get email by query', () => {
      expect(email).toMatchSchema(schema.definitions.Email)
    })

    test('Prase HTML from email content', () => {
      const html = parseHtmlFromEmail(email)
      expect(typeof html).toBe('string')
    })
  })
})
