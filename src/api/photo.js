import fetch from './fetch/index.js'
// get gallery
export function get (params) {
  return fetch({
    url: 'service/gallery',
    method: 'get',
    params
  })
}
