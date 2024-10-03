import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断是否为第一次登录
    isGetterRouter: true,
    // 左侧导航栏折叠状态
    collapse: false,
    // 用户信息
    userInfo: {
    },
    // 导航栏显示
    isNav:true,
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 改变左侧导航栏折叠状态
    changeCollapse(state, value) {
      state.collapse = !state.collapse
    },
    // 修改userInfo
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      }
    },
    // 清空userInfo
    clearUserInfo(state, value) {
      state.userInfo = {}
    },
    // 改变导航栏状态
    changeIsNav(state, value) {
      state.isNav = value
    },
  },
  actions: {
  },
  modules: {
  },
  //配置插件
  plugins: [
    createPersistedState({
      paths: ['collapse', 'userInfo','isNav']
    })
  ]
})
