import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  questionDialog: false as Boolean,
  followerDialog: false as Boolean,
  followingDialog: false as Boolean
})

export const getters = getterTree(state, {
  getQuestionDialog: (state) => state.questionDialog,
  getFollowerDialog: (state) => state.followerDialog,
  getFollowingDialog: (state) => state.followingDialog
})

export const mutations = mutationTree(state, {
  setQuestionDialog(state, value: boolean) {
    state.questionDialog = value
  },
  setFollowerDialog(state, value: boolean) {
    state.followerDialog = value
  },
  setFollowingDialog(state, value: boolean) {
    state.followingDialog = value
  },
})
