// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element-ui
import ElementUI from 'element-ui'
import './assets/theme/index.css'
Vue.use(ElementUI)
// 引入font
import 'font-awesome/scss/font-awesome.scss'
// 引入commoncss
import './assets/css/common.css'
// 引入animate.css
import 'animate.css'
// 引入api
import api from './api'
Vue.use(api)
// 导入状态管理
import store from './store/index'
// 引入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)
// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
Vue.config.productionTip = false

// 调用setMetaTitle()函数
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    // el.remove() 这个在ie存在兼容性问题
    el.parentNode.removeChild(el)
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!store.state.user.islogin && to.path === '/user') {
    store.dispatch('IS_LOGIN').then((res) => {
      let islogin = res
      if (!islogin && to.path === '/user') {
        next({ path: '/home' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

// 路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
