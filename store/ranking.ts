import { getterTree, mutationTree } from 'typed-vuex'

// TODO enum?

export const state = () => ({
  currentPeriod: "week" as string,
})

export const getters = getterTree(state, {
  getCurrentPeriod: (state) => state.currentPeriod,
})

export const mutations = mutationTree(state, {
  setCurrentPeriod(state, currentPeriod: string) {
    state.currentPeriod = currentPeriod
  },
})
