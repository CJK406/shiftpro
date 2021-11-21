const getters = {
  getIsFirstStageVisible (state) {
    return state.is_first_stage_visible
  },
  getLoginFailure(state) {
    return state.login_failure
  },
  getRegisterFailure(state) {
    return state.register_failure
  },
  getIsNotificationOpen(state) {
    return state.notification.is_visible
  },
  getIsNotificationStatus(state) {
    return state.notification.status
  },
  getNotificationMessage(state) {
    return state.notification.message
  },
  getUserDetails(state) {
    return state.user_detail
  },
  getUnreadMessage(state) {
    return state.unreadMessage
  }
}

export default getters