import axios  from "axios"
import { authHeader } from "@/helpers/authentication-header"

import {
  networkList,
  // formerCompaniesList,
  // networkMessagesData,
  // networkSentMessagesData,
  paymentHistory,
  perksList,
  userReliabilityStats,
  // messageThread
} from './mock-data'

// const API_ENDPOINT = 'http://localhost:8080/api'
const API_ENDPOINT = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8080/api'
  : 'https://app.shiftpro.dev/api'



export const APIgetShifts = () => {
  const authHeaderObj = authHeader()
  // return axios.get(`${API_ENDPOINT}/shifts?role=`+filter, {
  //     withCredentials: true,
  //     headers: {
  //       ...authHeaderObj
  //     }
  //   })
  return axios.get(`${API_ENDPOINT}/candidate/shifts?status=`, {
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}

export const APIgetShiftsDashboard = (filter, id="") => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/shifts?role=`+filter+`&user_id=`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIdoUploadDocument = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/compliance`,data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const APIgetCompliance = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/compliance`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIgetGallery = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/gallery`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIdoUploadGallery = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/gallery`,data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const APIRemoveGallery = (id) => {
  const authHeaderObj = authHeader()
  return axios.delete(`${API_ENDPOINT}/candidate/gallery/`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIRemoveCandidatefavourite = (id) => {
  const authHeaderObj = authHeader()
  return axios.delete(`${API_ENDPOINT}/candidate/favourites/`+id, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIdoCandidatefavourite = (data) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/favourites`,data, {
      params:data,
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIgetemployedby = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/employedby`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
 
}



export const APIgetPaymentHistory = (data) => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/finance`, {
      params:data,
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIgetUserTask = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/tasks`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIGetCandidateFavourite = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/favourites`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}


export const APIgetAgreeShift = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/agreed`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
 
}
export const APIdoUpdateProfile = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/profile`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const APIdoReview = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/review`,null, {
    withCredentials: true,
    params:data,
    headers: {
      ...authHeaderObj,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const APIapplyShift = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/apply`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}
export const APIAgreeShift = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/agreed`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}

export const APIacceptShift = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/employer/accepted`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}


export const APIgetShiftsComplete = () => {
  const authHeaderObj = authHeader()
  // return axios.get(`${API_ENDPOINT}/shifts?role=`+filter, {
  //     withCredentials: true,
  //     headers: {
  //       ...authHeaderObj
  //     }
  //   })
  return axios.get(`${API_ENDPOINT}/candidate/completed?status=completed`, {
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}

export const APIfetchNetworkContacts = () => {
  return new Promise((resolve) => {
    resolve(networkList)
  })
}

export const APIfetchFormerCompanies = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/contacts`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIfetchNetworkMessages = (filter) => {
  // return new Promise((resolve) => {
  //   resolve(networkMessagesData)
  // })
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/messages?folder=inbox&criteria=`+filter, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}
export const APIShiftRole = () => {
  
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/roles`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIfetchNetworkSentMessages = (filter) => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/messages?folder=sent&criteria=`+filter, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIfetchTimeSheet = () => {
  const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/candidate/timesheets`, {
      withCredentials: true,
      headers: {
        ...authHeaderObj
      }
    })
}

export const APIfetchDuration = (data) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/duration`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}

export const APIdoSubmitTimesheet = ( data,id ) => {
  const authHeaderObj = authHeader()
  return axios.put(`${API_ENDPOINT}/candidate/timesheets/`+id, data, {
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}



export const APIfetchPaymentHistory = () => {
  return new Promise((resolve) => {
    resolve(paymentHistory)
  })
}

export const APIfetchPerks = () => {
  return new Promise((resolve) => {
    resolve(perksList)
  })
}

export const APIfetchMessageThread = ( id ) => {
   const authHeaderObj = authHeader()
  return axios.get(`${API_ENDPOINT}/messages/`+id, {
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}

export const APIfetchEmployerProfile = ( id ) => {
  const authHeaderObj = authHeader()
 return axios.get(`${API_ENDPOINT}/candidate/employerprofile`, {
  params:{user_id:id}, 
  withCredentials: true,
   headers: {
     ...authHeaderObj
   }
 })
}

export const APIfetchUserReview = ( id ) => {
  const authHeaderObj = authHeader()
 return axios.get(`${API_ENDPOINT}/reviews`, {
  params:{user_id:id}, 
  withCredentials: true,
   headers: {
     ...authHeaderObj
   }
 })
}

export const APISendMessage = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/messages`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}
export const APISecure = ( data ) => {
  const authHeaderObj = authHeader()
  return axios.post(`${API_ENDPOINT}/candidate/secure`,null, {
    params: data,
    withCredentials: true,
    headers: {
      ...authHeaderObj
    }
  })
}




export const APIfetchUserReliability = ({ id }) => {
  let user_id = id;
  user_id = 1;
  const user = userReliabilityStats.filter(user => user.id == user_id)[0]
  return new Promise((resolve) => {
    resolve(user)
  })

}