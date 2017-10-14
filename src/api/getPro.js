
import fetch from './fetch/index.js'
// 获得商品
export function get (params) {
  return fetch({
    url: 'get/good',
    method: 'get',
    params
  })
}
