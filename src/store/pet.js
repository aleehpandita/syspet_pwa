import { make } from "vuex-pathify"

const state = function () {
  return {
    isAuthenticated: false,
    id: null,
    name: null,
    age: null,
    birth_date: null,
    breed: null,
    owner_id: null,
    owner_name: null,
    register_date: null,
    updated_at: null,
  }
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = {
  ...make.mutations(state),

  // setting the store back to it's initial state (logout, etc.)
  reset(s) {
    Object.assign(s, state())
  },
}
const actions = { ...make.actions(state) }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
