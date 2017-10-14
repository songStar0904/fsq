<template>
	<el-form ref="form" :rules="rules" :model="form" label-width="160px">
  <el-form-item>
<el-upload
  class="avatar-uploader"
  action="/api/tm/ifile/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="parms">
  <img v-if="form.img" :src="form.img" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="昵称:"  prop="nick">
    <el-input v-model="form.nick"></el-input>
  </el-form-item>
  <el-form-item label="等级:">
    <span v-text="form.level"></span>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('form')">保存修改</el-button>
  </el-form-item>
  </el-form>
</template>
<script>
export default{
  data () {
    return {
      form: {
        nick: this.$store.state.user.userInfo.nick,
        img: this.$store.state.user.userInfo.img,
        level: this.$store.state.user.userInfo.level,
        uid: this.$store.state.user.userInfo.uid
      },
      rules: {
        nick: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ]
      },
      parms: {
        id: this.$store.state.user.userInfo.uid,
        type: 'user'
      }
    }
  },
  watch: {
    userInfo (val) {
      console.log(val)
      if (val) {
        this.form = val
        this.parms.id = val.uid
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  mounted () {
    console.log(this.$store.state.user.userInfo)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.user.edit(this.form)
              .then((res) => {
                if (res.status) {
                  this.$message.success(res.msg)
                  this.$store.dispatch('GET_USER')
                } else {
                  this.$message.error(res.msg)
                }
              })
        } else {
          this.$message.error('请填写正确表单')
        }
      })
    },
    handleAvatarSuccess (res, file) {
      if (res.status) {
        this.form.img = res.info.url
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
