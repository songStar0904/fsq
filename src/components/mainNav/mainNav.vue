<template>
<div class="main-nav">
<el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
<li class="menu-item logo"><img src="../../assets/logo.png"></li>
  <el-menu-item index="/home">首页</el-menu-item>
  <el-submenu index="/introduce">
    <template slot="title">公司简介</template>
    <el-menu-item index="/introduce/main">公司概括</el-menu-item>
    <el-menu-item index="/introduce/honor">公司荣誉</el-menu-item>
    <el-menu-item index="/introduce/culture">公司文化</el-menu-item>
    <el-menu-item index="/introduce/photo">公司相册</el-menu-item>
  </el-submenu>
  <el-menu-item index="/news">新闻中心</el-menu-item>
  <el-menu-item index="/goods">商品中心</el-menu-item>
  <el-menu-item index="/aboutUs">关于我们</el-menu-item>
  <div class="user">
  <div class="no-login" v-if="!this.$store.state.user.islogin">
   <li class="menu-item register" @click="openRegister()">注册</li>
  <li class="menu-item login" @click="openLogin()"><i class="fa fa-user"></i>  登录</li>
  </div>
  <div class="logined" v-if="this.$store.state.user.islogin">
    <el-submenu index="#">
    <template slot="title">{{this.$store.state.user.userInfo.nick}}</template>
    <el-menu-item index="/user"  @click="setRoute('1')">个人设置</el-menu-item>
    <el-menu-item index="/user"  @click="setRoute('4')">我的收藏</el-menu-item>
    <el-menu-item index="/user"  @click="setRoute('5')">我的订单</el-menu-item>
    <el-menu-item index="" @click="loginOut">退出登录</el-menu-item>
  </el-submenu>
  <el-menu-item index="/buy" :route="route"class="cart"><i class="fa fa-shopping-cart"></i><el-badge :value="this.$store.state.cart.cart.length" class="item"></el-badge>购物车</el-menu-item>
  </div>
  </div>
</el-menu>
 <transition name="el-zoom-in-top">
<el-dialog :title="title" v-show="loginDialog" :visible.sync="loginDialog">
<div class="tab">
  <span class="tab-register" @click="openRegister" :class="{actived: current===1}">注册</span>
  <span>  · </span>
  <span class="tab-login" @click="openLogin" :class="{actived: current===2}">登录</span>
</div>
<!-- 登录 -->
  <el-form v-show="current===2" :model="loginForm" :rules="rules" ref="loginForm">
    <el-form-item prop="phone">
    <el-input v-model="loginForm.phone" placeholder="请输入手机号码">
    <template slot="prepend"><i class="fa fa-mobile icon"></i></template>
  </el-input>
    </el-form-item>
    <el-form-item prop="password">
    <el-input type="password"v-model="loginForm.password" placeholder="请输入密码">
    <template slot="prepend"><i class="fa fa-lock"></i></template>
  </el-input>
    </el-form-item>
    <div><span class="text-danger forget" @click="current=3">忘记密码?</span></div>
     <el-button class="login-btn" type="primary" @click="login('loginForm')">立即登录</el-button>
  </el-form>
  <!-- 注册 -->
  <el-form v-show="current===1" :model="registerForm" :rules="rules" ref="registerForm">
    <el-form-item prop="phone">
    <el-input v-model="registerForm.phone" placeholder="请输入手机号码">
    <template slot="prepend"><i class="fa fa-mobile icon"></i></template>
  </el-input>
    </el-form-item>
    <el-form-item prop="nick">
    <el-input type="text"v-model="registerForm.nick" placeholder="请输入昵称">
    <template slot="prepend"><i class="fa fa-user"></i></template>
  </el-input>
    </el-form-item>
    <el-form-item prop="password">
    <el-input type="password"v-model="registerForm.password" placeholder="请输入密码">
    <template slot="prepend"><i class="fa fa-lock"></i></template>
  </el-input>
    </el-form-item>
    <el-button class="register-btn" type="primary" @click="register('registerForm')">注册</el-button>
  </el-form>
  <!-- 重置密码 -->
  <el-form v-show="current===3" :model="rePassword" :rules="rules" ref="rePassword">
    <el-form-item prop="phone">
    <el-input v-model="rePassword.phone" placeholder="请输入手机号码">
    <template slot="prepend"><i class="fa fa-mobile icon"></i></template>
  </el-input>
    </el-form-item>
    <el-form-item>
    <el-input type="text"v-model="rePassword.smsCode" placeholder="请输入验证码">
    <template slot="append"><el-button type="success" class="getSmsCode-btn" @click="getSmsCode" :disabled="smsDisable">{{btnTitle}}</el-button></template>
  </el-input>
    </el-form-item>
    <el-form-item prop="password">
    <el-input type="password"v-model="rePassword.password" placeholder="请输入新密码">
    <template slot="prepend"><i class="fa fa-lock"></i></template>
  </el-input>
    </el-form-item>
    <el-form-item prop="rePassword">
    <el-input type="password"v-model="rePassword.rePassword" placeholder="请再输入一次新密码">
    <template slot="prepend"><i class="fa fa-lock"></i></template>
  </el-input>
    </el-form-item>
    <el-button class="rePassword-btn" type="primary" @click="editPassword('rePassword')">重置密码</el-button>
    <el-button class="cancel-btn" type="text" @click="current=2">返回登录</el-button>
  </el-form>
  <div slot="footer" class="dialog-footer"></div>
</el-dialog>
</transition>
</div>
</template>
<script>
import md5 from 'js-md5'
export default {
  name: 'mainNav',
  data () {
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机'))
        } else {
          callback()
        }
      }, 500)
    }
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.rePassword.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msg: 'this is mainNav',
      activeIndex: '1',
      activeIndex2: '1',
      loginDialog: false,
      loginForm: {
        phone: '',
        password: ''
      },
      registerForm: {
        phone: '',
        password: '',
        nick: ''
      },
      rePassword: {
        phone: '',
        smsCode: '',
        password: '',
        rePassword: ''
      },
      rules: {
        nick: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '长度大于5个字符', trigger: 'blur' }
        ],
        rePassword: {validator: checkPassword, trigger: 'blur'},
        phone: {validator: checkPhone, trigger: 'blur'}
      },
      route: {name: 'buy', params: {active: 2}},
      title: '用户登录',
      current: 1,
      btnTitle: '获取验证码',
      // 获取验证码按钮是否可按
      smsDisable: false
    }
  },
  mounted () {
    this.$store.dispatch('GET_CART')
    // 判断是否登陆
    this.$store.dispatch('IS_LOGIN')
      .then((res) => {
        if (res) {
        }
      })
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    openLogin () {
      this.loginDialog = true
      this.current = 2
      this.title = '登录'
    },
    openRegister () {
      this.loginDialog = true
      this.current = 1
      this.title = '注册'
    },
    getSmsCode () {
      this.$fetch.user.checkPhone({
        phone: this.rePassword.phone})
        .then((res) => {
          if (res.status) {
            this.smsDisable = true
            // 发短信
            this.$fetch.user.getSmsCode({
              phone: this.rePassword.phone
            }).then((res) => {
              console.log(res)
            })
            let time = 60
            this.btnTitle = time + 's后重新获取'
            let timer = setInterval(() => {
              this.btnTitle = --time + 's后重新获取'
              if (time === 0) {
                clearInterval(timer)
                this.smsDisable = false
                this.btnTitle = '获取验证码'
              }
            }, 1000)
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    login (formName) {
      this.loginForm.password = md5(this.loginForm.password)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.user.login(this.loginForm)
            .then((res) => {
              if (res.status) {
                localStorage.setItem('token', JSON.stringify(res['data']))
                this.$store.commit('SET_USER', res['data'])
                this.$store.commit('SET_ISLOGIN', 1)
                this.$message.success(res.msg)
                this.$store.dispatch('GET_CART')
                this.loginDialog = false
              } else {
                this.$message.error(res.msg)
              }
            })
        } else {
          this.$message.error('请填写正确的表单')
          return false
        }
      })
    },
    register (formName) {
      // this.registerForm.password = md5(this.registerForm.password)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.user.register(this.registerForm)
            .then((res) => {
              if (res.status) {
                this.$message.success(res.msg)
                this.loginDialog = false
              } else {
                this.$message.error(res.msg)
              }
            })
        }
      })
    },
    editPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.user.edit(this.rePassword)
            .then((res) => {
              if (res.status) {
                this.$message.success(res.msg)
                this.loginDialog = false
              } else {
                this.$message.error(res.msg)
              }
            })
        }
      })
    },
    loginOut () {
      this.$fetch.user.loginOut()
        .then((res) => {
          if (res.status) {
            localStorage.removeItem('token')
            this.$store.commit('SET_USER', null)
            this.$store.commit('SET_ISLOGIN', 0)
            this.$message.success('退出登录成功')
          }
        })
    },
    setRoute (val) {
      this.$store.commit('SET_USER_ROUTE', val)
    },
    md5Password (val) {
      return md5(val)
    }
  }
}
</script>
<style type="text/css">
.main-nav{
  background-color: rgb(238, 246, 243);
}
.main-nav ul {
  max-width: 1200px;
  margin:0 auto;
}
.main-nav .el-badge__content{
  display: inline-block!important;
}
.main-nav .logo{
    padding: 5px 20px;
    width: 220px;
}
.main-nav .menu-item, .el-menu-item{
  float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
    font-size: 14px;
    //color: rgb(72, 106, 92);
}
.main-nav .user,.cart{
  float: right;
}
.main-nav .login{
  margin-left: 20px;
}
.main-nav .no-login{
  margin-right: 20px;
}
/* login and re*/
.main-nav .el-dialog{
  width: 390px!important;
  transition: all 0.5s ease;
  background-color: #fff;
  
}
.main-nav .el-dialog__header{
    background:url(../../assets/login-bg.png)no-repeat;
    background-position: 0 -5px;
}
.main-nav .el-dialog .tab{
  text-align: center;
  padding-bottom: 20px;
  font-size: 25px;
  cursor: pointer;
}
.main-nav .el-dialog .tab span.actived{
  color: #13ce66;
}
.main-nav .el-dialog__body{
  padding: 0px 50px;
}
.main-nav .icon{
  font-size: 21px;
}
.main-nav .el-dialog__footer{
  padding: 0px 50px 30px;
 background:url(../../assets/login-bg.png)no-repeat;
    background-position: 0 -105px;
}
.main-nav .login-btn, .main-nav .register-btn{
  width: 100%;
}
.main-nav .forget{
  float: right;
  padding-bottom: 10px;
  cursor:pointer;
}
.main-nav .getSmsCode-btn{
  width: 125px;
}
</style>
