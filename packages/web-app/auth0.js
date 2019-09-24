
import { useAuth0 } from '@emmm/nextjs-auth0'

export default useAuth0({
  domain: 'docflow.eu.auth0.com',
  clientId: 'nOqHLayNA18ID7RHlty5udb8GJEPU0ui',
  clientSecret: process.env.CLIENT_SECRET || 'A4A1PMGSUNAxN6E0M9OAY-JnQHY4bINSqcTv2yoSwtdwOivnwSA89ImTWiaBCNCc',
  scope: 'openid profile',
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: process.env.LOGOUT_URI || 'http://localhost:3000/',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.COOKIE_SECRET || 'edslkfjhedrskjfh98erfldslkvdsvkldhv-dsklvjhsdlkvhdslhvorehviervhoeirvhorevdv',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // Store the access_token in the session. Defaults to false.
    storeAccessToken: false
  },
  httpClient: {
    // Optionally configure the timeout for the HTTP client.
    timeout: 2500
  }
});