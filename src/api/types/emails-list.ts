// https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list

export type Message = {
  id: string
  threadId: string
}

export type EmailsList = {
  messages: Message[]
  nextPageToken: string
  resultSizeEstimate: number
}
