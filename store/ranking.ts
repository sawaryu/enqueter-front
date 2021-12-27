import { getterTree, mutationTree } from 'typed-vuex'

// TODO enum?

export const state = () => ({
  currentPeriod: "week" as string,
  currentCategory: "mdi-alpha-p-circle-outline" as string,
})

export const getters = getterTree(state, {
  getCurrentPeriod: (state) => state.currentPeriod,
  getCurrentCategory: (state) => state.currentCategory,
})

export const mutations = mutationTree(state, {
  setCurrentPeriod(state, period: string) {
    state.currentPeriod = period
  },
  setCurrentCategory(state, category: string) {
    state.currentCategory = category
  },
})
