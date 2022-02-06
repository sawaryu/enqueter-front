import { getterTree, mutationTree } from 'typed-vuex'

/*
  * Use in questions page.
*/

export const state = () => ({
  currentPage: 1 as number,
  scrollY: 0 as number
})

export const getters = getterTree(state, {
  getCurrentPage: (state) => state.currentPage,
  getScrollY: (state) => state.scrollY
})

export const mutations = mutationTree(state, {
  setCurrentPage(state, value: number) {
    state.currentPage = value;
  },
  saveScroll(state, value: number) {
    state.scrollY = value
  }
})
