
import {

  SET_LOGIN_FAILURE,
  SET_REGISTER_FAILURE,
  SET_FIRST_LEVEL_VISIBILITY,
  SET_NOTIFICATION_STATE,
  SET_USER_DETAIL,
  SET_UNREAD_MESSAGE,

} from './mutation-types'

const mutations = {

  [SET_LOGIN_FAILURE] (state, { value, message }) {
    state.loginFailure = {
      value,
      message
    }
  },
  [SET_USER_DETAIL] (state,  {user_detail,user_type} ) {
    // state.user_detail = data
    state.user_detail = user_detail;
    state.user_detail.user_type = user_type
  },
  [SET_UNREAD_MESSAGE] (state,  data ) {
    state.unreadMessage = data
  },
  [SET_FIRST_LEVEL_VISIBILITY] (state, { isVisible }) {
    state.is_first_stage_visible= isVisible
  },
  [SET_REGISTER_FAILURE] (state, { value, message }) {
    state.register_failure = {
      value,
      message
    }
  },
  [SET_NOTIFICATION_STATE] (state, { isVisible, message,status}) {
    state.notification.is_visible = isVisible
    state.notification.message = message
    state.notification.status = status

  }
}

export default mutations