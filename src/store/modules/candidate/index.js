import getters from './elements/getters'
import actions from './elements/actions'
import mutations from './elements/mutations'



const state = {
  // modal: {
  //   is_open: false,
  //   title: '',
  //   icon_name: '',
  //   component_render: ''
  // },
  modal_is_open: false,
  modal_title:   '',
  modal_icon_name: '',
  modal_body:      '',
  modal_reply_id: '',
  modal_user_id: '',
  modal_subject:'',
  message_data:'',
  edit_shift_modal_id:'',
  shifts_list: [],
  shifts_dashboard_list:[],
  shifts_complete_list: [],
  modal_data:{},
  shift_panel: {
    is_open: false,
    data: {}
  },
  network_contacts: [],
  former_companies: [],
  network_messages: [],
  network_sent_messages: [],
  message_filter:"",
  shift_role: [],
  shift_search_key:{},
  shift_filter_values:{distance:'', reliability:'', rating:''},
  payment_history:  [],
  perks: [],
  message_thread: [],
  user_reliability: {},
  employer_modal_config:{},
  timesheet_list:[],
  taskList:[]
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}