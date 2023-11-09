import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import createPersistedState from "vuex-persistedstate"

import account from "@/store/account"
import pet from "@/store/pet"
import ui from "@/store/ui"

Vue.use(Vuex)
pathify.debug()

const persistData = true

const store = {
  modules: {
    account: { ...account },
    pet: { ...pet },
    ui: { ...ui },
  },
}

const storePlugins = persistData
  ? [createPersistedState(), pathify.plugin]
  : [pathify.plugin]

export default new Vuex.Store({
  plugins: storePlugins,
  strict: process.env.NODE_ENV === "development",
  ...store,
})
