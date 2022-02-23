import { getterTree, mutationTree } from 'typed-vuex'

type Alert = {
  type: string,
  message: string
}

function initialState() {
  return {
    alert: null as Alert | null,
  }
}

export const state = () => ({
  alert: null as Alert | null,
})

export const getters = getterTree(state, {
  getAlert: (state) => state.alert,
})

export const mutations = mutationTree(state, {
  setAlert(state, alert: Alert | null) {
    state.alert = alert
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})


