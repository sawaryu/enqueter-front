import { getterTree, mutationTree } from 'typed-vuex'
import { Question } from "@/common/entity/Question";

/*
  * Use in timeline.
*/

export const state = () => ({
  page: 1 as number,
  questions: [] as Question[],
  scrollY: 0 as number
})

export const getters = getterTree(state, {
  getPage: (state) => state.page,
  getQuestions: (state) => state.questions,
  getScrollY: (state) => state.scrollY
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
    state.scrollY = 0
  },
  saveScroll(state, value: number) {
    state.scrollY = value
  },
  // important only use in timeline(home) page.
  bookmarkQuestion(state, { id, value }: { id: number, value: boolean }) {
    state.questions.some((element: Question, index: number) => {
      if (element.id == id) {
        state.questions[index].is_bookmarked = value
        console.log("bookmarked")
        // break
        return true
      }
    });
  },
  answeredQuestion(state, id: number) {
    state.questions.some((element: Question, index: number) => {
      if (element.id == id) {
        state.questions[index].is_answered = true
        return true
      }
    });
  }
})
