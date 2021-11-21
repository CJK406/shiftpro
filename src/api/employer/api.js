import { networkList } from './mock-data'
import axios  from "axios"

import { authHeader } from "@/helpers/authentication-header"

const API_ENDPOINT = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8080/api'
  : 'https://app.shiftpro.dev/api'




export const APIfetchNetworkContacts = () => {
  return new Promise((resolve) => {
    resolve(networkList)
  })
}
export const APIgetEmployerShifts = (status="",expired="") => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/shifts?status=`+status+`&expired=`+expired, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIgetLocations = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/locations`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIAddLocation = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/locations`,data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj,

    }
  })
}
export const APIRemoveLocations = (id) => {
  const authHeaderObj = authHeader()
  return axios.delete(`${API_ENDPOINT}/employer/locations/`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIgetEmployerShiftsAgreed = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/agreed`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetEmployerShiftsRequest = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/request`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIgetEmployerShiftsComplete = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/completed`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetPreviousEmployed = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/employed`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetCompliance = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/compliance`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIdoUploadDocument = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/compliance`,data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const APIgetShiftCandidates = (id) => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/shiftcandidates?shift_id=`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIfetchCandidateProfile = ( id ) => {
  const authHeaderObj = authHeader()
 return axios.get(`${API_ENDPOINT}/employer/findcandidates/`+id, {
  withCredentials: true,
   headers: {
     ...authHeaderObj
   }
 })
}
export const APIfetchStaffs = ( shift_id ) => {
  const authHeaderObj = authHeader()
 return axios.get(`${API_ENDPOINT}/employer/findcandidates?shift_id=`+shift_id, {
  withCredentials: true,
   headers: {
     ...authHeaderObj
   }
 })
}
export const APIgetShiftid = (id) => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/shifts/`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetRole = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/roles`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIdoEmployerReview = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/review`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const APIGetEmployerFavourite = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/favourites`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIRemoveEmployerfavourite = (id) => {
  const authHeaderObj = authHeader()
  return axios.delete(`${API_ENDPOINT}/employer/favourites/`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIdoEmployerfavourite = (data) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/favourites`, data,{
      params:data,
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}


export const APIgetPaymentHistory = (data) => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/finance`, {
      params:data,
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetTasks = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/tasks`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIdoUpdateProfile = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/profile`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const APIconfirmShift = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/completed`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const APIdoSendRequestOffer = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/request`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
    }
  })
}

export const APIdoAddShift = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/shifts`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}


export const APIdoEditShift = ( data,id ) => {
  const authHeaderObj = authHeader()
  return axios.put(`${API_ENDPOINT}/employer/shifts/`+id, data, {
    params:data,
    withCredentials: true,
    headers: {
      ...authHeaderObj,
    }
  })
}

export const APIfetchTimeSheet = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/employer/timesheets`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIdoSubmitTimesheet = ( data,id ) => {
  const authHeaderObj = authHeader()
  return axios.put(`${API_ENDPOINT}/employer/timesheets/`+id, data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}
