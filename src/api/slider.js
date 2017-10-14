import fetch from './fetch/index.js'
// get slider
export function get (params) {
  return fetch({
    url: 'service/slider',
    method: 'get',
    params
  })
}
