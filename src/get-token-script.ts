#!/usr/bin/env node
import {authenticate} from '@google-cloud/local-auth'
import {OAuth2Client} from 'google-auth-library'
import path from 'path'
import fs from 'fs'

const script = async (): Promise<void> => {
  const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')
  const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

  console.log(
    "Starting the process of obtaining a refresh token... \
    \nINFO: This script is processing information from 'credentials.json' in your current folder."
  )

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(
      `credentials.json not found in ${process.cwd()}
        \nPlease place credentials.json in the current directory`
    )

    return
  }

  let client: OAuth2Client

  try {
    client = await authenticate({scopes: SCOPES, keyfilePath: CREDENTIALS_PATH})
  } catch (e) {
    throw new Error(`Authentication request has failed.\n${JSON.stringify(e, null, 2)}`)
  }

  if (!client.credentials) {
    throw new Error('Failed to obtain credentials - unknown error.')
  }

  if (!client.credentials.refresh_token) {
    throw new Error('Failed to obtain refresh token - unknown error.')
  }

  console.log(client.credentials.refresh_token)
}

script().catch(e => console.error(e))
