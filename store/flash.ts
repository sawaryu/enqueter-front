import { getterTree, mutationTree, actionTree } from 'typed-vuex'


export const state = () => ({
  message: "" as string,
  type: "" as string,
  status: false as boolean,
})

export const getters = getterTree(state, {
  message: (state) => state.message,
  type: (state) => state.type,
  status: (state) => state.status,
})

export const mutations = mutationTree(state, {
  setMessage(state, message) { state.message = message },
  setType(state, type) { state.type = type },
  setStatus(state, bool) { state.status = bool },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    showMessage({ commit }, { message, type, status }) {
      commit("setMessage", message)
      commit("setType", type)
      commit("setStatus", status)
      setTimeout(() => {
        commit("setStatus", !status)
      }, 3000)
    },
  }
)

// Ex of call.(* normal store mode)
// this.$store.dispatch(
//   "flashMessage/showMessage",
//   {
//     message: `hello, ${this.$auth.user.name}`,
//     type: "success",
//     status: true,
//   },
//   { root: true }
// );