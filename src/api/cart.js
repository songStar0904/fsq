
import fetch from './fetch/index.js'
// 获得cart
export function get (params) {
  return fetch({
    url: 'user/cart',
    method: 'get',
    params
  })
}
// add edit del cart
export function handle (data) {
  return fetch({
    url: 'user/cart/modify',
    method: 'post',
    data
  })
}
