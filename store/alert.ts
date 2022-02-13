import { getterTree, mutationTree } from 'typed-vuex'

interface Alert {
  type: string,
  message: string
}

function initialState() {
  return {
    alert: null as Alert,
  }
}

export const state = () => ({
  alert: null as Alert,
})

export const getters = getterTree(state, {
  getAlert: (state) => state.alert,
})

export const mutations = mutationTree(state, {
  setAlert(state, alert: Alert) {
    state.alert = alert
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})


