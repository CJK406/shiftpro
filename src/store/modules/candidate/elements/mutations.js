import {
  SET_SHIFTS,
  SET_CURRENT_PANEL,
  SET_PANEL_STATE,
  SET_NETWORK_CONTACTS,
  SET_FORMER_COMPANIES,
  SET_NETWORK_MESSAGES,
  SET_NETWORK_SENT_MESSAGES,
  SET_PAYMENT_HISTORY,
  SET_SHIFT_PRO_PERKS,
  SET_MODAL_PROPS,
  SET_MESSAGE_THREAD,
  SET_USER_RELIABILITY,
  SET_MESSAGE_FILTER,
  SET_SHIFT_ROLE,
  SET_SHIFTS_COMPLETE,
  SET_SHIFTS_DASHBOARD,
  SET_MESSAGE_MODAL_PROPS,
  SET_EMPLOYER_MODAL_CONFIG,
  SET_SHIFT_EDIT_MODAL_PROPS,
  SET_CLEAR_STATE,
  SET_CANDIDATE_TIMESHEET,
  SET_TASK_LIST
} from './mutation-types'

const mutations = {
  [SET_SHIFTS] (state, { shifts }) {
    state.shifts_list = shifts
  },
  [SET_TASK_LIST] (state, { tasks }) {
    state.taskList = tasks
  },
  
  [SET_SHIFTS_DASHBOARD] (state, { shifts }) {
    state.shifts_dashboard_list = shifts
  },
  [SET_EMPLOYER_MODAL_CONFIG] (state,  data) {
    state.employer_modal_config = data
  },
  [SET_CLEAR_STATE] (state) {
    state.message_thread = [],
    state.shifts_list = [],
    state.shifts_dashboard_list = [],
    state.shifts_complete_list = [],
    state.network_contacts = [],
    state.former_companies = [],
    state.network_messages = [],
    state.network_sent_messages = [],
    state.shift_role = [],
    state.payment_history = [],
    state.timesheet_list = []

  },
  

  

  
  [SET_SHIFTS_COMPLETE] (state, { shifts_complete }) {
    state.shifts_complete_list = shifts_complete
  },
  
  [SET_CURRENT_PANEL](state, { shift }) {
    state.shift_panel = {
      is_open: true,
      data: shift
    }
  },
  
  [SET_SHIFT_ROLE](state, role ) {
    state.shift_role = role;
    
  },
  
  [SET_PANEL_STATE](state, { isOpen }) {
    state.shift_panel.is_open = isOpen
  },
  [SET_NETWORK_CONTACTS](state, { networkContacts }) {
    state.network_contacts = networkContacts
  },
  [SET_FORMER_COMPANIES](state,  formerCompanies) {
    state.former_companies = formerCompanies
  },
  [SET_NETWORK_MESSAGES](state,  networkMessages ) {
    state.network_messages = networkMessages
  },
  [SET_NETWORK_SENT_MESSAGES](state, networkSentMessages) {
    state.network_sent_messages = networkSentMessages
  },
  [SET_PAYMENT_HISTORY](state, { paymentHistory }) {
    state.payment_history = paymentHistory
  },
  [SET_SHIFT_PRO_PERKS](state, { perks }) {
    state.perks = perks
  },
  [SET_MODAL_PROPS](state, { isOpen, iconName, componentName, title, data}) {

    if (!componentName) {
      state.modal_is_open = isOpen
      return
    }
    state.modal_is_open = isOpen
    state.modal_title = title
    state.modal_icon_name = iconName
    state.modal_body = componentName
    state.modal_data = data
  },
  [SET_SHIFT_EDIT_MODAL_PROPS](state, {id}) {

    state.edit_shift_modal_id = id
  },

  
  [SET_MESSAGE_MODAL_PROPS](state, data) {
    state.message_data = data
  },
  [SET_MESSAGE_THREAD](state,  messageThread ) {
    state.message_thread = messageThread
  },
  [SET_MESSAGE_FILTER](state,  messageFilter ) {
    state.message_filter = messageFilter
  },
  
  [SET_USER_RELIABILITY](state,  { userReliability }) {
    state.user_reliability = userReliability
  },
  [SET_CANDIDATE_TIMESHEET](state, {timesheet}) {
    state.timesheet_list = timesheet
  },

  
}

export default mutations