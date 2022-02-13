import { getterTree, mutationTree } from 'typed-vuex'

function initialState() {
  return {
    questionDialog: false as Boolean,
    followerDialog: false as Boolean,
    followingDialog: false as Boolean,
    loginDialog: false as Boolean,
    signupDialog: false as Boolean,
    reportDialog: false as Boolean,
    reportTargetId: null as number
  }
}

export const state = () => ({
  questionDialog: false as Boolean,
  followerDialog: false as Boolean,
  followingDialog: false as Boolean,
  loginDialog: false as Boolean,
  signupDialog: false as Boolean,
  reportDialog: false as Boolean,

  // used in report dialog, subtly special.
  reportTargetId: null as number
})

export const getters = getterTree(state, {
  getQuestionDialog: (state) => state.questionDialog,
  getFollowerDialog: (state) => state.followerDialog,
  getFollowingDialog: (state) => state.followingDialog,
  getLoginDialog: (state) => state.loginDialog,
  getSignupDialog: (state) => state.signupDialog,
  getReportDialog: (state) => state.reportDialog,

  // used in report dialog, subtly special.
  getReportTargetId: (state) => state.reportTargetId
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

  // when opening dialog, set the targetId.
  // when closing, set null.
  setReportDialog(state, { value, id = null }: { value: boolean, id: number }) {
    state.reportDialog = value
    state.reportTargetId = id
  },
  reset(state) {
    Object.assign(state, initialState())
  }
})
