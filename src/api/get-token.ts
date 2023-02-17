import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

/**
 * Get Access token from Google API
 *
 * @param {string} clientId OAuth Client ID
 * @param {string} clientSecret OAuth Client Secret
 * @param {string} refreshToken OAuth Refresh token
 * @returns {Promise<string | null>} Access token
 * @example const accessToken = await getToken('123456-...', 'ABCD-...', '1//ABCD123...')
 */
export const getToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string | null> => {
  if (!clientId) throw new Error('Client ID is missing!')

  if (!clientSecret) throw new Error('Client Secret is missing!')

  if (!refreshToken) throw new Error('Refresh Token is missing!')

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
    validateStatus: () => true,
  }

  let response: AxiosResponse | null = null

  try {
    response = await axios.request(config)
  } catch (error) {
    console.log(error)
  }

  if (!response) {
    return null
  }

  const body = response.data

  if (!body.hasOwnProperty('access_token')) return null

  return body.access_token
}
