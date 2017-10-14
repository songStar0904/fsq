
import fetch from './fetch/index.js'
// 获得collect
export function get (params) {
  return fetch({
    url: 'user/collection',
    method: 'get',
    params
  })
}
// add edit del collect
export function handle (data) {
  return fetch({
    url: 'user/collection/modify',
    method: 'post',
    data
  })
}
