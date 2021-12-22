import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  text: '' as string,
})

export const getters = getterTree(state, {
  getText: (state) => state.text,
})

export const mutations = mutationTree(state, {
  setText(state, newValue: string) {
    state.text = newValue
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    initialise({ commit }) {
      commit('setText', 'typed-vuex test!!')
    },
  }
)
