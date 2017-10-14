import fetch from './fetch/index.js'
// get news
export function get (params) {
  return fetch({
    url: 'get/article',
    method: 'get',
    params
  })
}
