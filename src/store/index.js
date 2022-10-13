import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import { user } from './module/user'
import { menu } from './module/newMenu'
// import { router } from '@/store/module/router'
// import { dictionary } from '@/store/module/dictionary'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user', 'menu']
})

export const store = createStore({
  modules: {
    user,
    menu
    // router,
    // dictionary
  },
  state: {},
  mutations: {},
  plugins: [vuexLocal.plugin]
})