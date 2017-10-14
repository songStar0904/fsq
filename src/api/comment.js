import fetch from './fetch/index.js'
// get comment
export function get (params) {
  return fetch({
    url: 'get/comment ',
    method: 'get',
    params
  })
}
export function send (data) {
  return fetch({
    url: 'get/comment/cadd',
    method: 'post',
    data
  })
}
export function cnew (data) {
  return fetch({
    url: 'get/comment/cnew',
    method: 'post',
    data
  })
}
export function del (data) {
  return fetch({
    url: 'get/comment/del',
    method: 'post',
    data
  })
}
export function love (data) {
  return fetch({
    url: 'user/love/modify',
    method: 'post',
    data
  })
}
