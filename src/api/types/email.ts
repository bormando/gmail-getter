// https://developers.google.com/gmail/api/reference/rest/v1/users.messages

export type EmailPart = {
  partId: string
  mimeType: string
  filename: string
  headers: {
    name: string
    value: string
  }[]
  body: {
    attachmentId?: string
    size: number
    data: string
  }
  parts: EmailPart[]
}

export type Email = {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  historyId: string
  internalDate: string
  payload: EmailPart
  sizeEstimate: number
  raw?: string
}
