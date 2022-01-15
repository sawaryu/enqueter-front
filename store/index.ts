import { getAccessorType } from 'typed-vuex'
import * as sample from '~/store/sample'
import * as dialog from '~/store/dialog'
import * as ranking from '~/store/ranking'
import * as flash from '~/store/flash'
import * as sort from '~/store/sort'

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
    sample,
    dialog,
    ranking,
    flash,
    sort
  },
})
