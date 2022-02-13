import { getterTree, mutationTree, actionTree } from 'typed-vuex'

function initialState() {
  return {
    isError: false as boolean,
  }
}

export const state = () => ({
  isError: false as boolean,
})

export const getters = getterTree(state, {
  getIsError: (state) => state.isError,
})

export const mutations = mutationTree(state, {
  setIsError(state, value: boolean) {
    state.isError = value
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})
