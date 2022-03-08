import { getterTree, mutationTree } from 'typed-vuex'

/*
  * Use in user page.
*/

function initialState() {
  return {
    currentCategory: "stats" as string,
  }
}

export const state = () => ({
  currentCategory: "stats" as string,
})

export const getters = getterTree(state, {
  getCurrentCategory: (state) => state.currentCategory,
})

export const mutations = mutationTree(state, {
  changeCurrentCategory(state) {
    if (state.currentCategory === "stats") {
      state.currentCategory = "rank"
    } else {
      state.currentCategory = "stats"
    }
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})
