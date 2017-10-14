import fetch from './fetch/index.js'
// 删除商品图片
export function del (data) {
  return fetch({
    url: 'ifile/modify/del',
    method: 'post',
    data
  })
}
