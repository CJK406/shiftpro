import actions from './elements/actions'
import getters from './elements/getters'
import mutations from './elements/mutations'


const state = {
  network_contacts: [],
  shifts_list:[],
  locations:[],
  timesheet_list:[]
}




export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}