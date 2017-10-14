<template>
 <div class="goods">
       <i class="el-icon-circle-check text-success"></i>
    <div class="goods-info">
        <h3>已成功加入购物车！</h3>
        <span class="goods-name">{{name}}</span> 
    </div>
    </div>
</template>
<script>
export default{
  props: {
    name: {
      required: true
    }
  }
}
</script>
<style scoped>
    .goods{
    }
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
