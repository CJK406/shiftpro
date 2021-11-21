import axios from "axios"
import { authHeader } from "@/helpers/authentication-header"

// =========== LOGIN ===============
const AUTHENTICATION_ENDPOINT = 'https://app.shiftpro.dev/api/authentication.php'
const REGISTER_ENDPOINT = 'https://shiftpro.dev/assets/components/authentication/register.connector.php'

const CHECK_EMAIL_ENDPOINT = 'https://shiftpro.dev/assets/components/authentication/register.connector.php'
const API_ENDPOINT = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8080/api'
  : 'https://app.shiftpro.dev/api'

export function APIdoLogin({ username, password, action = 'login' }) {
  return axios.post(AUTHENTICATION_ENDPOINT, null, {
    params: {
      username,
      password,
      action
    }
  })
}



export function APIdoLogout({  action = 'logout' }) {
  return axios.post(AUTHENTICATION_ENDPOINT, null, {
    params: {
      action
    },
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Request-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
      ...authHeader()
    }
  })
}

export function APIdoUsernameCheck( {username, action = 'check'} ) {
    return axios.post(CHECK_EMAIL_ENDPOINT, null, {
      params: {
        username,
        action
      }
    })
}

export function APIdoCheckUserName(data) {
  return axios.post(REGISTER_ENDPOINT, null, {
    params:data,
    withCredentials: false,
    headers: {
      // 'Content-Type': 'multipart/form-data'
    }
  })
}
export function APIdoRegistration(fields) {
  return axios.post(REGISTER_ENDPOINT, fields, {
    withCredentials: false,
    headers: {
    }
  })
}

export const APIdoUpdateSecurity = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/security`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}