import { getterTree, mutationTree } from 'typed-vuex'

function initialState() {
  return {
    currentPeriod: "week" as string,
  }
}

export const state = () => ({
  currentPeriod: "week" as string,
})

export const getters = getterTree(state, {
  getCurrentPeriod: (state) => state.currentPeriod,
})

export const mutations = mutationTree(state, {
  setCurrentPeriod(state, period: string) {
    state.currentPeriod = period
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})
