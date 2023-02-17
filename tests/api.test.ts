import {EmailsList, Email, getEmail, getEmailsList, getToken} from 'dist'
import * as schema from './schema.json'

describe('API requests', () => {
  let token: string | null

  beforeAll(async () => {
    token = await getToken(
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!,
      process.env.REFRESH_TOKEN!
    )
  })

  describe('Get token', () => {
    test('Returns a string', () => {
      expect(typeof token).toBe('string')
    })
  })

  describe('Emails', () => {
    let emails: EmailsList | null

    beforeAll(async () => {
      emails = await getEmailsList(token!, 'from:squier7 subject:Test!')
    })

    describe('Get emails list', () => {
      test('Returns at least one email', () => {
        expect(emails).toMatchSchema(schema.definitions.EmailsList)
      })
    })

    describe('Get email by its id', () => {
      let email: Email | null

      beforeAll(async () => {
        email = await getEmail(emails!.messages![0].id, token!)
      })

      test('Returns an email', () => {
        expect(email).toMatchSchema(schema.definitions.Email)
      })
    })
  })
})
