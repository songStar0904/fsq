<template>
<div class="user">
<div v-title>福盛全官网 - 个人中心</div>
<el-tabs type="border-card" v-model="active">
  <el-tab-pane name="1">
    <span slot="label" ><i class="fa fa-address-card-o"></i> 基本资料</span>
    <base-box></base-box>
  </el-tab-pane>
  <el-tab-pane name="2">
    <span slot="label"><i class="fa fa-commenting-o"></i> 我的消息</span>
    <message-box></message-box>
  </el-tab-pane>
  <el-tab-pane name="3">
    <span slot="label"><i class="fa fa-truck"></i> 我的地址</span>
    <address-box></address-box>
  </el-tab-pane>
  <el-tab-pane name="4">
    <span slot="label"><i class="fa fa-heart"></i> 我的收藏</span>
    <collect-box></collect-box>
  </el-tab-pane>
  <el-tab-pane name="5">
    <span slot="label" ><i class="el-icon-date"></i> 我的订单</span>
    <order-box></order-box>
  </el-tab-pane>
</el-tabs>
</div>
</template>
<script>
import {baseBox, addressBox, orderBox, messageBox, collectBox} from '@/components'
export default{
  data () {
    return {
    }
  },
  computed: {
    active: {
      get () {
        let act = this.$store.state.route.userRoute
        if (act) {
          return act
        } else {
          return '1'
        }
      },
      set (newValue) {
        this.$store.commit('SET_USER_ROUTE', newValue)
      }
    },
    islogin () {
      return this.$store.state.user.islogin
    }
  },
  mounted () {
    this.isLogin()
  },
  watch: {
    islogin () {
      this.isLogin()
    }
  },
  methods: {
    isLogin () {
      if (!this.islogin) {
        this.$router.push({path: '/home'})
      }
    }
  },
  components: {
    baseBox,
    addressBox,
    orderBox,
    messageBox,
    collectBox
  }
}
</script>
<style scoped>
.user {
	max-width: 1000px;
  min-height: 500px;
	margin: 50px auto;
}
</style>
