import { getterTree, mutationTree } from 'typed-vuex'


export const state = () => ({
  overlay: false as boolean,
})

export const getters = getterTree(state, {
  getOverlay: (state) => state.overlay,
})

export const mutations = mutationTree(state, {
  setOverlay(state, value: boolean) { state.overlay = value },
})