
import fetch from './fetch/index.js'
// 获得order
export function get (params) {
  return fetch({
    url: 'user/order',
    method: 'get',
    params
  })
}
export function add (data) {
  return fetch({
    url: 'user/order/modify',
    method: 'post',
    data
  })
}
export function del (data) {
  return fetch({
    url: 'user/order/del',
    method: 'post',
    data
  })
}
