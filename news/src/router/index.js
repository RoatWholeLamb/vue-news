import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import MainBox from '@/views/MainBox'
import WebHome from '@/views/web/WebHome'
import WebNews from '@/views/web/WebNews'
import WebNewsMessage from '@/views/web/WebNewsMessage'
import WebProduct from '@/views/web/WebProduct'
import RoutesConfig from './config'


import store from '@/store'

Vue.use(VueRouter)

// 重写 Vue-router 原型对象上的 push 函数
let originPush = VueRouter.prototype.push;  //备份原push方法

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {    //如果传了回调函数，直接使用
    originPush.call(this, location, resolve, reject);
  } else {                     //如果没有传回调函数，手动添加
    originPush.call(this, location, () => { }, () => { });
  }
}

const routes = [
  {
    path: '/',
    redirect: WebHome
  },
  {
    path: '/webhome',
    name: 'WebHome',
    component: WebHome
  },
  {
    path: '/webnews',
    name: 'WebNews',
    component: WebNews,
  },
  {
    path: '/web-news-message',
    name: 'WebNewsMessage',
    component: WebNewsMessage
  },
  {
    path: '/webproduct',
    name: 'WebProduct',
    component: WebProduct
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/mainbox',
    name: "MainBox",
    component: MainBox,
  },
]


const router = new VueRouter({
  routes
})


// mainbox的子路由
const NewRouter = () => {
  if (store.state.userInfo.role === 1) {
    RoutesConfig.forEach(item => {
      router.addRoute('MainBox', item)
    })
  } else {
    RoutesConfig.forEach(item => {
      if (item.flag !== 'user-manage') {
        router.addRoute('MainBox', item)
      }
    })
  }
}


// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'WebHome' || to.name === 'WebNews' || to.name === 'WebProduct' || to.name === 'WebNewsMessage') {
    store.commit('changeIsNav',true);
    next();
  } else {
    // 查看是否有登录权限
    store.commit('changeIsNav',false);
    //第一次
    if (!localStorage.getItem('token')) {
      next({ path: '/login' })
    }
    else {
      // 动态添加新路由
      if (store.state.isGetterRouter) {
        NewRouter()
        // 改变store.state.isGetterRouter的状态
        store.commit('changeGetterRouter', false)
        next({ path: to.fullPath })
      } else {
        next()
      }
    }
  }

})




export default router
