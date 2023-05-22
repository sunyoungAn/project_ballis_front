import { createStore } from 'vuex'

// TODO 동작 확인 할 것
// export default createStore({

const store = createStore({
  state: {
    selectedPrice : 0,
    selectedDate : '',
    selectedFormattedDate : '',
    selectedDays : 0,
    selectedItem : '',
    logged: false,
    memberStatus : 0
  },

  getters: {
    getSelectedPrice (state) {
      return state.selectedPrice
    },
    getSelectedDate (state) {
      return state.selectedDate
    },
    getSelectedFormattedDate (state) {
      return state.selectedFormattedDate
    },
    getSelectedDays (state) {
      return state.selectedDays
    },
    getSelectedItem (state) {
      return state.selectedItem
    },
    getLogged(state) {
      return state.logged;
    },
  },

  mutations: {
    setSelectedPrice (state, payload) {
      state.selectedPrice = payload
    },
    setSelectedDate (state, payload) {
      state.selectedDate = payload
    },
    setSelectedFormattedDate (state, payload) {
      state.selectedFormattedDate = payload
    },
    setSelectedDays (state, payload) {
      state.selectedDays = payload
    },
    setSelectedItem (state, payload) {
      state.selectedItem = payload
    },
    setLogged(state, value){
      state.logged = value;
    },
    setMemberStatus (state, payload) {
      state.memberStatus = payload
    }
  },

  actions: {
  },
  
  modules: {
  }

});

store.subscribe((mutation, state) => {
  // state 변경될 때마다 세션 스토리지에 저장
  window.sessionStorage.setItem('vuex-state', JSON.stringify(state));
});

export default store;
