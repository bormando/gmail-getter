#!/usr/bin/env node
import {authenticate} from '@google-cloud/local-auth'
import path from 'path'

// prettier-ignore -- newline after imports
;(async () => {
  const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')
  const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })

  if (!client.credentials) {
    throw new Error('Authentication failed!')
  }

  if (!client.credentials.refresh_token) {
    throw new Error(`Couldn't obtain refresh token!`)
  }

  console.log(client.credentials.refresh_token)
})()
