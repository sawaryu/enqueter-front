import { getterTree, mutationTree } from 'typed-vuex'

/*
  * Use in questions page.
*/

export const state = () => ({
  currentPage: 1 as number,
})

export const getters = getterTree(state, {
  getCurrentPage: (state) => state.currentPage,
})

export const mutations = mutationTree(state, {
  setCurrentPage(state, value: number) {
    state.currentPage = value;
  },
})
