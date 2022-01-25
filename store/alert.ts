import { getterTree, mutationTree } from 'typed-vuex'

interface Alert {
  type: string,
  message: string
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
  }
})
