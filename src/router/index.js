import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition || to.name === 'introduce') {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/pages/home'], resolve)
    }, {
      path: '*',
      redirect: '/'
    }, {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/pages/aboutUs/aboutUs'], resolve)
    }, {
      path: '/user',
      name: 'user',
      component: resolve => require(['@/pages/user/user'], resolve)
    }, {
      path: '/news',
      name: 'news',
      component: resolve => require(['@/pages/news/news'], resolve),
      children: [{
        path: '',
        name: 'allNews',
        component: resolve => require(['@/components/allNews/allNews'], resolve)
      }, {
        path: 'newsItem',
        name: 'newsItem',
        component: resolve => require(['@/pages/newsItem/newsItem'], resolve),
        meta: {
          title: '新闻单页',
          auth: true
        }
      }]
    }, {
      path: '/goods',
      name: 'goods',
      component: resolve => require(['@/pages/goods/goods'], resolve),
      children: [{
        path: '',
        name: 'all',
        component: resolve => require(['@/components/allGoods/allGoods'], resolve)
      }, {
        path: 'goodsItem',
        name: 'goodsItem',
        component: resolve => require(['@/pages/goodsItem/goodsItem'], resolve),
        meta: {
          title: '商品单页',
          auth: true
        }
      }, {
        path: 'buy',
        name: 'buy',
        component: resolve => require(['@/pages/buy/buy'], resolve),
        meta: {
          title: '购买步骤',
          auth: true
        }
      }]
    }, {
      path: '/introduce/:active',
      name: 'introduce',
      component: resolve => require(['@/pages/introduce/introduce'], resolve),
      meta: {
        title: '公司介绍',
        auth: true
      }
    }
  ]
})
