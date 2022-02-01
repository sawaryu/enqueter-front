import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  userQuestionsSort: 'all' as string,
  questionsSort: 'answerable' as string,
})

export const getters = getterTree(state, {
  getUserQuestionsSort: (state) => state.userQuestionsSort,
  getQuestionsSort: (state) => state.questionsSort,
})

export const mutations = mutationTree(state, {
  setUserQuestionsSort(state, sort: string) {
    state.userQuestionsSort = sort
  },
  setQuestionsSort(state, sort: string) {
    state.questionsSort = sort
  },
})
