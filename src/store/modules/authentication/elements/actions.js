import {
  APIdoLogin,
  APIdoLogout,  
  APIdoUsernameCheck,
} from "@/api/authentication/api"
import {
  APIdoGetUser,
  APIdoGetUnreadMessage
} from "@/api/common/api"
import router from '@/router/index'


import {
  SET_LOGIN_FAILURE,
  SET_FIRST_LEVEL_VISIBILITY,
  SET_REGISTER_FAILURE,
  SET_NOTIFICATION_STATE,
  SET_USER_DETAIL,
  SET_UNREAD_MESSAGE
} from './mutation-types'


const actions = {
  // =============== Login ===========================
  doLogin({ commit }, { username, password, action }) {
    APIdoLogin({ username, password, action })
      .then(response => {
        const user = {
          expires: response.data[0].expires,
          token: response.data[0].token,
          usergroup: response.data[0].usergroup
        }
        if (response.data[0].success) {
          localStorage.setItem('user', JSON.stringify(user))
          commit(SET_LOGIN_FAILURE, {
            value: false,
            message: ''
          })
        }
        APIdoGetUser(response.data[0].usergroup)
          .then(response1=> {
            commit(SET_USER_DETAIL, {user_detail:response1.data.results[0], user_type:response.data[0].usergroup})
          })
          .catch(error => {
            console.log("error",error)
        })

        APIdoGetUnreadMessage()
          .then(response2 => {
            commit(SET_UNREAD_MESSAGE, response2.data.results)
            if (response.data[0].usergroup === 2) {
              router.push({ name: 'CandidateDashboard' })
            }
            if (response.data[0].usergroup === 3) {
              router.push({name: 'EmployerDashboard'})
            }
          })
          .catch(error => {
            console.log("error",error)
        })

       
        commit(SET_NOTIFICATION_STATE, {
          isVisible: true,
          status:true,
          message: 'You have succesfully logged in'
        })
        setTimeout(() => {
          commit(SET_NOTIFICATION_STATE, {
            isVisible: false,
            status:true,
            message: 'You have succesfully logged in'
          })
        }, 3000);

      })
      .catch(error => {
        commit(SET_NOTIFICATION_STATE, {
          isVisible: true,
          status:false,
          message: 'Login failed'
        })
        commit(SET_LOGIN_FAILURE, {
          value: true,
          message: error.response.data.msg
        })
      })
  },
  doGetUnreadMessages({commit}) {
    APIdoGetUnreadMessage()
          .then(response2 => {
            commit(SET_UNREAD_MESSAGE, response2.data.results)
          })
          .catch(error => {
            console.log("error",error)
        })
  },
  doGetUserData({commit},user_type) {
    APIdoGetUser(user_type)
      .then(response1=> {
        commit(SET_USER_DETAIL, {user_detail:response1.data.results[0],user_type:user_type})
      })
      .catch(error => {
        console.log("error",error)
    })
  },
  doLogout({commit}) {
    APIdoLogout({action: 'logout'})
      .then(() => {
        localStorage.removeItem('user')
        router.push('/login')
        commit(SET_NOTIFICATION_STATE, {
          isVisible: true,
          status:true,
          message: 'You have succesfully logged out'
        })
      })
      .catch(() => {
        localStorage.removeItem('user')
        router.push('/')
        commit(SET_NOTIFICATION_STATE, {
          isVisible: true,
          status:true,
          message: 'You have succesfully logged out'
        })
      })
  },

  doFirstStageCheck({ commit }, { username, action }) {
    APIdoUsernameCheck({ username, action })
      .then(response => {
        if (response.data.success) {
          commit(SET_FIRST_LEVEL_VISIBILITY, {  isVisible: true })
          commit(SET_REGISTER_FAILURE, {
            value: false,
            message: '' 
          })
        } else {
          commit(SET_REGISTER_FAILURE, {
            value: response.data.error,
            message: response.data.msg
          })
        }
      })
      .catch(() => {
        commit(SET_REGISTER_FAILURE, {
          value: true,
          message: 'There might be an issue with your network. Make sure you are connected to the internet.'
        })
      })
  },
 
  changeFirstStageVisibility({ commit }, { isVisible }) {
    commit(SET_FIRST_LEVEL_VISIBILITY, {
      isVisible
    })
  },
}

export default actions