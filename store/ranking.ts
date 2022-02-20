import { getterTree, mutationTree } from 'typed-vuex'

function initialState() {
  return {
    currentPeriod: "week" as string,
    currentCategory: "point" as string,
  }
}

export const state = () => ({
  currentPeriod: "week" as string,
  currentCategory: "point" as string,
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
  reset(state) {
    Object.assign(state, initialState())
  }
})
