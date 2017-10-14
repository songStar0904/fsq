<template>
	<div class="buy">
  <div v-title>福盛全官网 - 购买流程</div>
<el-steps :space="200" :active="active" finish-status="success">
  <el-step title="加入购物车"></el-step>
  <el-step title="购物车结算"></el-step>
  <el-step title="选择地址"></el-step>
  <el-step title="提交订单"></el-step>
</el-steps>
<div class="content">
<add-cart v-show="active===1" :name="$route.params.name"></add-cart>
<edit-cart v-show="active===2" :tCart="tCart"></edit-cart>
<choose-address v-show="active===3"></choose-address>
</div>
<div class="button-box">
<el-button  @click="pre" size="large" :disabled="pDisabled">上一步</el-button>
<el-button type="success" size="large" @click="next" :disabled="nDisabled">下一步</el-button>
</div>
	</div>
</template>
<script>
  import {addCart, editCart, chooseAddress} from '@/components'
  export default {
    data () {
      return {
        active: 0,
        pDisabled: true,
        nDisabled: false
      }
    },
    computed: {
      tCart () {
        return this.$store.state.cart.tCart
      }
    },
    watch: {
      tCart: {
        handler (val) {
          if (this.active === 2) {
            // 必须要选中东西 创建好临时订单 把选中的商品存至临时订单中 咱不上出购物车的东西
            console.log(val)
            if (this.tCart.goods.length) {
              this.nDisabled = false
            } else {
              this.nDisabled = true
            }
          }
          if (val === 3) {
            console.log(this.tCart.address)
            if (this.tCart.address.length) {
              this.nDisabled = false
            } else {
              this.nDisabled = true
            }
          }
        },
        deep: true
      },
      active (val) {
        if (val > 1) {
          this.pDisabled = false
        }
        if (val === 2) {
          if (this.tCart.goods.length) {
            this.nDisabled = false
          } else {
            this.nDisabled = true
          }
        }
        if (val === 3) {
          console.log(this.tCart.address.length)
          if (this.tCart.address) {
            this.nDisabled = false
          } else {
            this.nDisabled = true
          }
        }
        if (val === 4) {
          this.$fetch.order.add(this.tCart)
            .then((res) => {
              if (res.status) {
                this.$store.dispatch('GET_CART')
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
        }
      }
    },
    mounted () {
      this.active = this.$route.params.active
      this.$store.dispatch('GET_CART')
    },
    methods: {
      next () {
        if (this.active === 3) {
          // 把临时订单 放入订单中 并删除购物车的东西（也就是临时订单的）
        }
        if (this.active++ > 0) this.pDisabled = false
      },
      pre () {
        if (this.active-- < 3) this.pDisabled = true
      }
    },
    components: {
      addCart,
      editCart,
      chooseAddress
    }
  }
</script>
<style scoped>
  .buy{
    margin: 50px auto;
    
     max-width: 1000px;
  }
  .el-steps{
    text-align: center;
  }
  .button-box{
    margin: 20px;
  }
  .button-box .el-button{
    width: 200px;
  }
  .content{
    padding: 50px 20px;
    margin: 20px 0; 
    background-color: #f5f5f5;
  }
</style>
