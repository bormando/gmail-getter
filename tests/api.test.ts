import {Email, fetchEmailById, fetchEmailsListByQuery, getAccessToken, Message} from 'dist'
import * as schema from './schema.json'

describe('API requests', () => {
  let token: string

  beforeAll(async () => {
    token = await getAccessToken(
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!,
      process.env.REFRESH_TOKEN!
    )
  })

  describe('Access Token', () => {
    test('Fetch Access token', () => {
      expect(typeof token).toBe('string')
    })
  })

  describe('Emails', () => {
    let emails: Message[]

    beforeAll(async () => {
      const query = 'from:squier7 subject:Test!'
      emails = await fetchEmailsListByQuery(token, query)
    })

    describe('Emails List', () => {
      test('Fetch emails list by query', () => {
        expect(emails.at(0)).toMatchSchema(schema.definitions.Message)
      })
    })

    describe('Email', () => {
      let email: Email

      beforeAll(async () => {
        const {id} = emails[0]
        email = await fetchEmailById(id, token)
      })

      test('Fetch an email by id', () => {
        expect(email).toMatchSchema(schema.definitions.Email)
      })
    })
  })
})
