import axios from "axios"
import { authHeader } from "@/helpers/authentication-header"

// =========== LOGIN ===============
const API_ENDPOINT = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8080/'
  : 'https://app.shiftpro.dev/'

const GET_UNREAD_MESSAGE =           API_ENDPOINT+'/api/unread'
// const GET_PROFILE =           API_ENDPOINT+'/api/profile'
export function APIdoGetUser(user_type) {
  
  const url = user_type===3 ? API_ENDPOINT+'/api/employer/profile' : API_ENDPOINT+'/api/candidate/profile'
  return axios.get(url,{
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Request-Methods': 'GET, POST, OPTIONS',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
        ...authHeader()
      }
  });
}
export function APIdoGetSubscription(user_type) {
  const url = API_ENDPOINT+'/api/subscriptions?usergroup='+user_type;
  return axios.get(url,{
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Request-Methods': 'GET, POST, OPTIONS',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
        ...authHeader()
      }
  });
}

export function APIdoGetUnreadMessage() {
    return axios.get(GET_UNREAD_MESSAGE,{
      withCredentials: true,
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Request-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
          ...authHeader()
        }
    });
  }
  export function APIdoGetSubscriptionActive() {
    return axios.get(API_ENDPOINT+'/api/active',{
      withCredentials: true,
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Request-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Request-Headers': 'Content-Type, Authorization, Accept',
          ...authHeader()
        }
    });
  }
  
  export const APIdoChangeSubscription = ( data ) => {
    const authHeaderObj = authHeader()
    return axios.post(`${API_ENDPOINT}/api/stripe`,null, {
      params:data,
      withCredentials: true,
      headers: {
        ...authHeaderObj,
      }
    })
  }
  export const APIdoUpdateProfileImage = ( data ) => {
    const authHeaderObj = authHeader()
    return axios.post(`${API_ENDPOINT}/api/image`,data, {
      withCredentials: true,
      headers: {
        ...authHeaderObj,
        'Content-Type': 'multipart/form-data'
      }
    })
  }
