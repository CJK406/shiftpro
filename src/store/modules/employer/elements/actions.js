import { APIfetchNetworkContacts,APIgetEmployerShifts,APIgetLocations, APIfetchTimeSheet} from "@/api/employer/api"
import { SET_NETWORK_CONTACTS,
  SET_EMPLOYER_SHIFTS,
  SET_LOCATIONS,
  SET_CLEAR_STATE,
  SET_EMPLOYER_TIMESHEET
} from "./mutation-types"

const actions = {
  fetchtNetworkContacts({ commit }) {
    APIfetchNetworkContacts()
      .then(networkContacts=> {
        commit(SET_NETWORK_CONTACTS, { networkContacts })
      })
  },
  fetchtLocations({ commit }) {
    APIgetLocations()
      .then(response=> {
        commit(SET_LOCATIONS, response.data.results)
      })
  },
  FetchClearState({ commit }) {
    commit(SET_CLEAR_STATE)
  },
  

  FetchgetEmployerShifts({ commit },status,expired) {
    APIgetEmployerShifts(status,expired)
      .then(response => {
        commit(SET_EMPLOYER_SHIFTS, {
          shifts: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },

  FetchgetTimeSheet({ commit }) {
    APIfetchTimeSheet()
      .then(response => {
        commit(SET_EMPLOYER_TIMESHEET, {
          timesheet: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },
}

export default actions