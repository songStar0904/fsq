/*
*  统一封装axios
* @Author: songstar
* @Date:   2017-06-30 22:53:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-02 11:26:04
*/

// 导入模块
import axios from 'axios'
import router from '@/router'
import {Message} from 'element-ui'

export default function fetch (options) {
  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const instance = axios.create({
      // 设置默认根地址
      baseURL: '/api/tm/',
      // 设置请求超时设置
      timeout: 2000
      // 设置请求时的header
    })
    // 请求处理
    instance(options)
      .then((response) => {
        // 请求成功时,根据业务判断状态
        if (response.status === 200) {
          resolve(response.data)
          return false
        } else if (response.status === 2) {
          router.replace({name: 'login'})
        }
        Message.warning('失败')
        reject(response)
      })
      .catch((error) => {
        // 请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          Message.error('操作失败！错误原因 ' + resMsg)
          reject({code: resCode, msg: resMsg})
        }
      })
  })
}
