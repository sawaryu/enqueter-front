import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  isError: false as boolean,
})

export const getters = getterTree(state, {
  getIsError: (state) => state.isError,
})

export const mutations = mutationTree(state, {
  setIsError(state, value: boolean) {
    state.isError = value
  }
})
