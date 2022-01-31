import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  questions: [] as [],
})

export const getters = getterTree(state, {
  getQuestions: (state) => state.questions,
})

export const mutations = mutationTree(state, {
  setQuestions(state, questions: []) {
    state.questions = questions
  },
  pushQuestions(state, questions: []) {
    state.questions.push(...questions)
  }
})
