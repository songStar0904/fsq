<template>
<div class="goodsNav">
   <el-tooltip v-for="(item, index) in typeList"  :key="item" v-if="index>0"effect="dark" :content="'跳到'+item.name+'分类'" placement="left"><div class="item rubberBand"   v-scroll-to="'#type'+index">Go {{item.name}}</div>
   </el-tooltip>
</div>
</template>
<script type="text/javascript">
export default{
  props: {
    typeList: Array
  }
}
</script>
<style type="text/css" scoped>
  .goodsNav{
		position: fixed;
		top: 50%;
		right: 3%;
		color: #666;
	}
	.goodsNav .item{
		margin: 10px 0;
		cursor: pointer;
		transition: all .5s ease;
	}
	.goodsNav .item:hover{
		color: #13CE66;
		animation: rubberBand 1.2s infinite;
	}
	.goodsNav .item i{
		margin-right: 10px;
	}
</style>
