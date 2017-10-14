/*
* @Author: Administrator
* @Date:   2017-06-30 23:28:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 19:52:49
*/

// 导入模块
import * as getPro from './getPro.js'
import * as leaveMsg from './LeaveMsg.js'
import * as type from './type.js'
import * as user from './user.js'
import * as cart from './cart.js'
import * as addr from './address.js'
import * as order from './order.js'
import * as news from './news.js'
import * as slider from './slider.js'
import * as comment from './comment.js'
import * as link from './link.js'
import * as photo from './photo.js'
import * as collect from './collect.js'
import * as upload from './upload.js'

const apiObj = {
  getPro,
  leaveMsg,
  type,
  user,
  cart,
  addr,
  order,
  news,
  slider,
  comment,
  link,
  photo,
  collect,
  upload
}
const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get () {
        return apiObj
      }
    }
  })
}

export default {
  install,
  apiObj
}
