export const user =({
  namespaced: true,
  state: {
    userInfo: {},
    token: ''
  },
  mutations: {
    setToken(state, token) {
        state.token = token
    },

    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },

    userLogout(state) {
      console.log(state)
      localStorage.clear();
      state.userInfo = {};
      state.token = ''
    },

    userToIndex() {
			router.push('/')
		}
  },
  actions: {

  },
  modules: {

  }
})