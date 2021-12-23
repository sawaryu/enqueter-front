import { getterTree, mutationTree } from 'typed-vuex'

export const state = () => ({
  questionDialog: false as Boolean,
  followerDialog: false as Boolean,
  followingDialog: false as Boolean,
  loginDialog: false as Boolean,
  signupDialog: false as Boolean
})

export const getters = getterTree(state, {
  getQuestionDialog: (state) => state.questionDialog,
  getFollowerDialog: (state) => state.followerDialog,
  getFollowingDialog: (state) => state.followingDialog,
  getLoginDialog: (state) => state.loginDialog,
  getSignupDialog: (state) => state.signupDialog
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
  setLoginDialog(state, value: boolean) {
    state.loginDialog = value
  },
  setSignupDialog(state, value: boolean) {
    state.signupDialog = value
  },
})
