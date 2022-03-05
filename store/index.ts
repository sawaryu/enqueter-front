import { getAccessorType } from 'typed-vuex'
import * as sample from '~/store/sample'
import * as timeline from '~/store/timeline'
import * as questions from '~/store/questions'
import * as dialog from '~/store/dialog'
import * as ranking from '~/store/ranking'
import * as flash from '~/store/flash'
import * as overlay from '~/store/overlay'
import * as alert from '~/store/alert'
import * as error from '~/store/error'

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
    timeline,
    questions,
    dialog,
    ranking,
    flash,
    overlay,
    alert,
    error
  },
})
