<template>
<div class="leaveMsg">
<el-row :gutter="0">
  <el-col :xs="24" :sm="24" :md="12" :lg="12">
  	<div class="map">
  		<map-box></map-box>
  	</div>
  </el-col>
  <el-col :xs="24" :sm="24" :md="12" :lg="12">
  	<el-form ref="form" :model="form" label-width="80px" :rules="rules">
  	<el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="留言" prop="content">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="success" @click="submitForm('form')">提  交</el-button>
  </el-form-item>
  	</el-form>
  </el-col>
</el-row>
</div>
</template>
<script type="text/javascript">
import {mapBox} from '@/components/common'
export default{
  data () {
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      title: 'Leave Messageasd',
      subtitle: null,
      form: {
        name: '',
        email: '',
        phone: '',
        content: ''
      },
      rules: {
        name: [{required: true, message: '请输入姓名', trigger: 'blur'},
        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
        email: {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'},
        phone: {validator: checkPhone, trigger: 'blur'},
        content: {required: true, message: '请输入留言', trigger: 'blur'}
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let data = JSON.parse(this.form)
          console.log(this.$fetch)
          this.$fetch.leaveMsg.add(this.form).then((res) => {
            if (res.status) {
              this.$message.success('谢谢您的留言')
              this.form = {}
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
          })
        } else {
          this.$message.error('看看表单填写是否正确')
          return false
        }
      })
    }
  },
  components: {
    mapBox
  }
}
</script>
<style type="text/css" scoped>
	.leaveMsg{
		padding: 25px 0;
		margin: 0 10%;
    text-align: center;
	}
	.map,.el-form{
		margin-top: 50px;
	}
	.el-form-item__content button{
		width: 150px;
	}
</style>
