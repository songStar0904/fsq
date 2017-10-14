<template>
<div>
	<el-card class="box-card">
  <div slot="header" class="clearfix header">
    <span>
    <div class="status text-success">{{order.msg}}</div>
    <p class="msg">{{order.date}}<span class="sep">|</span>
    	{{order.address.name}}<span class="sep">|</span>
    	订单号 : {{order.id}}<span class="sep">|</span>
    	联系方式 : {{order.address.phone}}
    </p>
    </span>
    <span class="total-money">订单金额：<span class="text-orange money">{{order.totalMoney}}</span> 元</span>
  </div>
  <div class="text item">
  <el-row :gutter="0">
  <el-col :xs="24" :sm="24" :md="12" :lg="12" class="goodsItem" v-for="item in order.goods" :key="item.id">
    	<span class="img"><img :src="item.img" alt=""></span>
    	<span class="name">
    		<a :href="'goods/goodsItem/'+item.gid"><p>{{item.gname}}[{{item.detail}}]</p></a>
    		<p>{{item.price}} × {{item.num}}</p>
    	</span>
      <div class="btn" style="margin-top:-25px;" >
      <el-button :plain="true" type="warning" v-if="order.status===3&&!item.comment" @click="comment(order.id, item)">评  价</el-button>
      <el-button :plain="true" :disabled="true" type="text" v-if="order.status===3&&item.comment" >已评价</el-button>
      </div>
    	</el-col>
    	</el-row>
      <div class="btn">
        <el-button :plain="true" type="danger" v-if="order.status===-1"  @click="openDel(order.id)">删  除</el-button>
        <el-button :plain="true" type="success" v-if="order.status===-1">付  款</el-button>
      </div>
  </div>
</el-card>
</div>
</template>
<script>
export default{
  props: ['order'],
  data () {
    return {
      // 当前选中订单id
      current: 0
    }
  },
  methods: {
    openDel (id) {
      this.current = id
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delOrder()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delOrder () {
      this.$fetch.order.del({
        id: this.current
      }).then((res) => {
        if (res.status) {
          this.$message.success(res.msg)
          this.$emit('delOrder', true)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    comment (id, item) {
      this.$emit('comment', id, item)
    }
  }
}
</script>
<style scoped>
.box-card {
  margin:10px 0;
}
  .text {
   font-size: 14px;
   position: relative;
  }
  .box-card .btn{
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -47px;
  }
  .box-card .btn button{
    width: 100px;
    padding: 8px 15px;
    display: block;
    margin: 10px 0;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .status{
  	font-size: 18px;
  	margin-bottom: 15px;
  }
  .sep{
  	color: #e0e0e0;
  	margin: 0 .25em;
    font-family: sans-serif;
  }
  .msg{
  	font-weight: 400;
    text-align: left;
    color: #757575;
  }
  .header{
  	position: relative;
  }
  .total-money{
  	position: absolute;
  	right: 0px;
  	bottom: 0px;
  }
  .total-money .money{
  	font-size: 28px;
  }
  .goodsItem{
  	position: relative;
    margin: 10px 0;
    padding: 18px 18px 18px 100px;
    line-height: 22px;
    color: #333;
  }
  .goodsItem .img{
  	width: 80px;
  	height: 80px;
  	position: absolute;
  	left: 0;
  	top:0;
  }

</style>
