
import fetch from './fetch/index.js'
// 获得分类
export function get (params) {
  return fetch({
    url: 'get/type',
    method: 'get',
    params
  })
}
