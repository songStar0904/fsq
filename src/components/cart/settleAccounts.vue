<template>
 <section class="goods">
 	<article v-if="status">
 		<i class="el-icon-success text-success" ></i>
 		<div class="goods-info">
        <h3>已成功购买此订单！</h3>
            <order-item :order="tCart"></order-item>
        </div>
 	</article>
 	<article v-else>
 		<i class="el-icon-error text-danger" ></i>
 		<div class="goods-info">
        <h3>提交订单失败！请联系客服或重新尝试！</h3>
        <span class="msg">错误原因：{{msg}}</span>
        </div>
 	</article>   
</section>
</template>
<script>
import {orderItem} from '@/components/common'
export default{
  props: ['active'],
  data () {
    return {
      status: 1,
      msg: ''
    }
  },
  computed: {
    tCart () {
      return this.$store.state.cart.tCart
    }
  },
  watch: {
    active (val) {
      if (val === 4) {
        console.log(this.tCart)
        this.$fetch.order.add()
            .then((res) => {
              this.status = res.status
              this.msg = res.msg
              if (res.status) {
                this.$store.dispatch('GET_CART')
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            }).catch((res) => {
              this.status = res.status
              this.msg = res.msg
            })
      }
    }
  },
  components: {
    orderItem
  }
}
</script>
<style scoped>
.goods i{
  font-size: 64px;
  float: left;
  margin-right: 20px;
}
.goods .goods-info h3{
margin: 0;
color: #424242;
font-size: 24px;
font-weight: normal;
margin-top: 3px;
margin-bottom: 8px;
}
.goods .goods-info .goods-name{
margin-right: 15px;
font-size: 14px;
color: #757575;
}
</style>
