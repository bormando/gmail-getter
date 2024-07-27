import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

/**
 * Get Access token from Google API
 * @param {string} clientId OAuth Client ID
 * @param {string} clientSecret OAuth Client Secret
 * @param {string} refreshToken OAuth Refresh token
 * @returns {Promise<string>} Access token
 * @example const accessToken = await getAccessToken('123456-...', 'ABCD-...', '1//ABCD123...')
 */
export const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> => {
  if (!clientId) {
    throw new Error('Failed to get Google access token - client id is null or undefined.')
  }

  if (!clientSecret) {
    throw new Error('Failed to get Google access token - client secret is null or undefined.')
  }

  if (!refreshToken) {
    throw new Error('Failed to get Google access token - refresh token is null or undefined.')
  }

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('refresh_token', refreshToken)
  params.append('grant_type', 'refresh_token')

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://accounts.google.com/o/oauth2/token',
    timeout: 15000,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: params,
  }

  let response: AxiosResponse

  try {
    response = await axios.request(config)
  } catch (e) {
    throw new Error(
      `Failed to get Google access token - API request to Google has failed.
      \n${JSON.stringify(e, null, 2)}`
    )
  }

  const {data: body} = response

  if (!body) {
    throw new Error(
      `Failed to get Google access token - unable to parse response body.
      \n${JSON.stringify(response, null, 2)}`
    )
  }

  const {access_token: accessToken} = body

  if (!accessToken) {
    throw new Error(
      `Failed to get Google access token - unable to parse access token from the response body.
      \n${JSON.stringify(body, null, 2)}`
    )
  }

  return accessToken as string
}
