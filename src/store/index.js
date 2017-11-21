/*
*  状态管理
* @Author: songstar
* @Date:   2017-06-30 22:42:29
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-30 22:48:45
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import cart from './cart/cart'
import user from './userInfo/userInfo'
import route from './router/userRoute'

export default new Vuex.Store({
  modules: {
    cart,
    user,
    route
  }
})
