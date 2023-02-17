# gmail-getter

## About package
A simple Node.js client that gets messages from Gmail API via http requests & OAuth. 

Contributions are very welcome!

## Installation
> npm install gmail-getter

## Requirements
To log into Gmail API you need to obtain credentials: Client ID, Client Secret, Refresh token.
These credentails will let you get an Access token, which is required in further requests (like getting list of emails or a single email and etc.).

Steps to go:
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Create **OAuth credentials** in [API & Services](https://console.cloud.google.com/apis/credentials) section (_preferably, select **Desktop** app there if you need it for automated tests_) and download it.
3. Enable [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com).
4. Obtain a Refresh token.

To get a Refresh token - simply execute this command in a project root (or anywhere else if you've got the package installed globally). You must have `credentials.json` file in the place you execute the command.

```
npx gmail-getter get-refresh-token
```

⚠️ credentials file name is case-sensitive ⚠️

## Usage
### Import
Import whatever you need from the package:

```
// ES6+
import {getToken, checkInbox} from 'gmail-getters'

//CommonJS
const {getToken, checkInbox} = require('gmail-getter')
```

or the whole package:

```
// ES6+
import gmail from 'gmail-getters'

//CommonJS
const gmail = require('gmail-getters')
```

### Get Access token
You need to get an Access token before you execute other requests:

```
import {getToken} = 'gmail-getter'

const accessToken = await getToken(
  clientId: string, 
  clientSecret: string, 
  refreshToken: string
)
```

It'd probably be a good idea to get it on the earlier stages of a test run (global setup?) and store it as an environment variable.

### Check inbox
Use a polling function that returns [an email](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/get#response-body):

```
const email = await checkInbox(
  accessToken: string, 
  timeout: number, 
  step: number, 
  query: string
)
```

* `timeout` sets a maximum execution time for the function
* `step` sets a timeout between retries to fetch an email
* `query` argument let's you filter out emails you want to find, you can find more about queries [here](https://support.google.com/mail/answer/7190)

### Parse link from email
If your email contains html content with a link (like confirmation one) - you can parse it with this function:

```
const link = parseLinkFromHtml(email: Email, regex: RegEx)
```

* `email` is an email that you fetch with `checkInbox` function
* `regex` is [a regular expression](https://regex101.com/r/f3RXKp/1) that would recognize a link from the html document

### The whole flow example
And that's how you can get an email you need. It'd probably be good to wrap the logic into a method and then call it from wherever you need (tests?).

```
import {getToken, getEmailsList, getEmail} from 'dist'

const accessToken = await getToken(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  process.env.REFRESH_TOKEN
)
const email = await checkInbox(token!, 15000, 1500, 'from:squier7 subject:Test!')
const link = parseLinkFromHtml(email!, /(https:\/\/)(\S*)(gmail-getter)([\w\/\?\=\-]*)/im)
```
