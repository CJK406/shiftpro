import getters from './elements/getters'
import actions from './elements/actions'
import mutations from './elements/mutations'


const state = {
  login_failure: {
    value: false,
    message: ''
  },
  register_failure: {
    value: false,
    message: ''
  },
  // boolean used to switch between the register forms
  is_first_stage_visible: false,
  notification: {
    is_visible: false,
    message: '',
    status:''
  },
  user_detail:{},
  user_type:'',
  unreadMessage:null,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}