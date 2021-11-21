const getters = {
  getNetworkContacts(state) {
    return state.network_contacts
  },
  getLocations(state) {
    return state.locations
  },
  getFilteredShifts(state) {
    return state.shifts_list
  },
  getTimeSheet(state){
    return state.timesheet_list
  }
}

export default getters