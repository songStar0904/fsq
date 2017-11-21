// 设置上传要求
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt1M = file.size / 1024 / 1024 < 1

  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt1M) {
    this.$message.error('上传头像图片大小不能超过 1MB!')
  }
  return isJPG && isLt1M
}
export {beforeAvatarUpload}
