
import fetch from './fetch/index.js'
// 发送留言
export function add (data) {
  return fetch({
    url: 'service/board/badd ',
    method: 'post',
    data
  })
}
