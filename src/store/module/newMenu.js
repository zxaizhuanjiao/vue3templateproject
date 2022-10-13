export const menu =({
    namespaced: true,
    state: {
      menuList: []
    },
    mutations: {
      setMenu(state, menuList) {
          console.log(menuList)
          state.menuList = menuList
      },
  
    //   setUserInfo(state, userInfo) {
    //       state.userInfo = userInfo
    //   },
  
    //   userLogout(state) {
    //     console.log(state)
    //     localStorage.clear();
    //     state.userInfo = {};
    //     state.token = ''
    //   }
    },
    actions: {
  
    },
    modules: {
  
    }
  })