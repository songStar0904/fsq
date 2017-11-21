const checkPhone = (rule, value, callback) => {
  setTimeout(() => {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
      return callback(new Error('请输入正确的手机'))
    } else {
      callback()
    }
  }, 500)
}
const checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.rePassword.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
export {checkPhone, checkPassword}
