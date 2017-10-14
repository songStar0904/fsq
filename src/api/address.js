
import fetch from './fetch/index.js'
// 获得 address
export function get (params) {
  return fetch({
    url: 'user/addr',
    method: 'get',
    params
  })
}
// add&edit address
export function add (data) {
  return fetch({
    url: 'user/addr/modify',
    method: 'post',
    data
  })
}
// del address
export function del (data) {
  return fetch({
    url: 'user/addr/del',
    method: 'post',
    data
  })
}
// set address default
export function setDefault (data) {
  return fetch({
    url: 'user/addr/set_default',
    method: 'post',
    data
  })
}
