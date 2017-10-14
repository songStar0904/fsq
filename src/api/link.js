import fetch from './fetch/index.js'
// get link
export function get (params) {
  return fetch({
    url: 'service/friends',
    method: 'get',
    params
  })
}
