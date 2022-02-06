import { getterTree, mutationTree, actionTree } from 'typed-vuex'

/*
  * Use in timeline.
*/

export const state = () => ({
  page: 1 as number,
  questions: [] as { id: number, is_bookmarked: boolean }[],
})

export const getters = getterTree(state, {
  getPage: (state) => state.page,
  getQuestions: (state) => state.questions,
})

export const mutations = mutationTree(state, {
  incrementPage(state) {
    state.page++;
  },
  resetPage(state) {
    state.page = 1;
  },
  setQuestions(state, questions: []) {
    state.questions = questions;
  },
  pushQuestions(state, questions: []) {
    state.questions.push(...questions);
  },
  reset(state) {
    state.page = 1
    state.questions = []
  },
  bookmarkQuestion(state, { id, value }: { id: number, value: boolean }) {
    state.questions.some((element: { id: number, is_bookmarked: boolean }, index: number) => {
      if (element.id === id) {
        state.questions[index].is_bookmarked = value
        // break
        return true
      }
    });
  }
})
