import { SET_NETWORK_CONTACTS,
  SET_EMPLOYER_SHIFTS,
  SET_LOCATIONS,
  SET_CLEAR_STATE,
  SET_EMPLOYER_TIMESHEET
} from "./mutation-types"


const mutations = {
  [SET_NETWORK_CONTACTS](state, { networkContacts }) {
    state.network_contacts = networkContacts
  },
  [SET_EMPLOYER_SHIFTS] (state, { shifts }) {
    state.shifts_list = shifts
  },
  [SET_LOCATIONS] (state, locations) {
    state.locations = locations
  },
  [SET_CLEAR_STATE] (state) {
    state.network_contacts = [],
    state.shifts_list = [],
    state.locations = [],
    state.timesheet_list = []

  },
  [SET_EMPLOYER_TIMESHEET] (state,{timesheet}) {
    state.timesheet_list = timesheet
  }

  
}
export default mutations