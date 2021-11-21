import {
  APIgetShifts,
  APIfetchNetworkContacts,
  APIfetchFormerCompanies,
  APIfetchNetworkMessages,
  APIfetchNetworkSentMessages,
  APIfetchPaymentHistory,
  APIfetchPerks,
  APIfetchMessageThread,
  APIfetchUserReliability,
  APISendMessage,
  APIShiftRole,
  APIgetShiftsComplete,
  APIgetShiftsDashboard,
  APIfetchTimeSheet,
  APIgetUserTask
} from '@/api/candidate/api'

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
  SET_MESSAGE_THREAD,
  SET_USER_RELIABILITY,
  SET_MODAL_PROPS,
  SET_MESSAGE_MODAL_PROPS,
  SET_MESSAGE_FILTER,
  SET_SHIFT_ROLE,
  SET_SHIFTS_COMPLETE,
  SET_SHIFTS_DASHBOARD,
  SET_EMPLOYER_MODAL_CONFIG,
  SET_SHIFT_EDIT_MODAL_PROPS,
  SET_CLEAR_STATE,
  SET_CANDIDATE_TIMESHEET,
  SET_TASK_LIST
} from './mutation-types'

const actions = {
  FetchgetShifts({ commit }) {
    APIgetShifts()
      .then(response => {
        commit(SET_SHIFTS, {
          shifts: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },

  FetchgetTaskList({ commit }) {
    APIgetUserTask()
      .then(response => {
        commit(SET_TASK_LIST, {
          tasks: response.data.results
        });
      });
  },

  FetchgetShiftsDashboard({ commit },filter) {
    APIgetShiftsDashboard(filter)
      .then(response => {
        commit(SET_SHIFTS_DASHBOARD, {
          shifts: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },
  FetchClearState({ commit }){
    commit(SET_CLEAR_STATE);
  },
  


  FetchgetShiftsComplete({ commit }) {
    APIgetShiftsComplete()
      .then(response => {
        commit(SET_SHIFTS_COMPLETE, {
          shifts_complete: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },

  
  
  fetachShiftRole({ commit }) {
    APIShiftRole()
      .then(response => {
        commit(SET_SHIFT_ROLE,  response.data.results
        )
      }).catch(err => {
        console.log(err)
      })
  },
  populatePanel({ commit }, { shift, isOpen }) { 
    commit(SET_CURRENT_PANEL, {
      shift
    })
    commit(SET_PANEL_STATE, {
      isOpen
    })
  },
  closePanelModal({commit}){
    commit(SET_PANEL_STATE, {isOpen:false})
  },
  fetchtNetworkContacts({ commit }) {
    APIfetchNetworkContacts()
      .then(networkContacts=> {
        commit(SET_NETWORK_CONTACTS, { networkContacts })
      })
  },
  fetchtSetModalConfigs({ commit },data) {
        commit(SET_MODAL_PROPS, data)
  },
  fetchtSetEditShiftModalConfigs({ commit },data) {
    commit(SET_SHIFT_EDIT_MODAL_PROPS, data)
  },
  fetchtSetMessageModalConfigs({ commit },data) {
    commit(SET_MESSAGE_MODAL_PROPS, data)
},
  
  fetchSetMessageFilter({commit},data){
    commit(SET_MESSAGE_FILTER, data)
  },
  

 
  fetchSetEmployerModalConfigs({commit},data){
    commit(SET_EMPLOYER_MODAL_CONFIG, data)
  },
  fetchFormerCompanies({ commit }) {
    APIfetchFormerCompanies()
      .then(formerCompanies => {
        commit(SET_FORMER_COMPANIES, formerCompanies.data.results)
      })
  },
  fetchNetworkMessages({ commit },data) {
    APIfetchNetworkMessages(data)
      .then(networkMessages => {
            commit(SET_NETWORK_MESSAGES, networkMessages.data.results)
      })
  },
  fetchNetworkSentMessages({ commit },data) {
    APIfetchNetworkSentMessages(data)
      .then(networkSentMessages => {
            commit(SET_NETWORK_SENT_MESSAGES, networkSentMessages.data.results)
      })
  },
  fetchPaymentHistory({ commit }) {
    APIfetchPaymentHistory()
      .then(paymentHistory => {
        commit(SET_PAYMENT_HISTORY, { paymentHistory })
      })
  },
  fetchShiftProPerks({ commit }) {
    APIfetchPerks()
      .then(perks => {
        commit(SET_SHIFT_PRO_PERKS, { perks })
      })
  },
  fetchMessageThread({ commit }, userId) {
    APIfetchMessageThread(userId)
      .then(messageThread => {
        let thread = messageThread.data.object.thread;
        commit(SET_MESSAGE_THREAD, {
          thread
        })
      })
  },
  
  fetchSendMessage({ commit }, data) {
    APISendMessage(data)
      .then(messagesent => {
        commit(SET_MESSAGE_THREAD, {
          messagesent
        })
      })
  },
  
  
  fetchUserReliability({ commit }, { id }) {
    APIfetchUserReliability({ id })
      .then(userReliability => {
        commit(SET_USER_RELIABILITY, {
          userReliability
        })
      }) 
  
  },
  FetchgetTimeSheet({ commit }) {
    APIfetchTimeSheet()
      .then(response => {
        commit(SET_CANDIDATE_TIMESHEET, {
          timesheet: response.data.results
        });
        return response;
      }).catch(err => {
        console.log(err)
      })
  },
}

export default actions