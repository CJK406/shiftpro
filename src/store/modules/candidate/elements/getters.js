
const getters = {
  getMessageThread (state) {
    return state.message_thread.thread
  },
  getUserReliability(state) {
    return state.user_reliability
  },
  getMessageModalData(state) {
    return state.message_data
  },
  getModalData(state){
    return state.modal_data
  },
  getTaskList(state){
    return state.taskList
  },

  getTimeSheet(state){
    return state.timesheet_list
  },
  
  // Modal
  getModalProperty(state) {
    return (prop) => {
      return state.modal[prop]
    }
  },
  getEmployerModalProperty(state){
      return state.employer_modal_config
  },
  getFilteredShifts(state) {
    
      return state.shifts_list

  },
  getFilteredShiftsDashboard(state) {
      return state.shifts_dashboard_list
  },
  
  getPanelState(state) {
    return state.shift_panel.is_open
  },
  
  getShiftComplete(state) {
    return state.shifts_complete_list
  },
  
  getMessageFilter(state) {
    return state.message_filter
  },
  getShiftRole(state) {
    return state.shift_role
  },
  
  getCurrentPanel(state) {
    return state.shift_panel.data
  },
  getNetworkContacts(state) {
    return state.network_contacts
  },
  getEditshiftModal_id(state){
    return state.edit_shift_modal_id
  },
  getFormerCompanies(state) {
    return state.former_companies
  },
  getNetworkMessages(state) {
    return state.network_messages
  },
  getNetworkSentMessages(state) {
    return state.network_sent_messages
  },
  getPaymentHistory(state) {
    return state.payment_history
  },
  getPerks(state) {
    return state.perks
  }
}
export default getters