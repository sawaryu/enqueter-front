import { getAccessorType } from 'typed-vuex'
import * as submodule from '~/store/submodule'
import * as dialog from '~/store/dialog'

export const state = () => {
  return {}
}
export const getters = {}
export const mutations = {}
export const actions = {}
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    submodule,
    dialog
  },
})
