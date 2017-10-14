<template>
<div class="goods-item">
  
  <router-link :to="{ name: 'goodsItem', params: { id: goodsItem.id }}">
  <el-card :body-style="{ padding: '0px' }" >
      <img :src="goodsItem.style[0].img[0].url" class="image">
      <div style="padding: 14px;">
      <a class="title">
        <span>{{ goodsItem.name }}</span>
        </a>
        <div class="tag">
        <span v-for="item in goodsItem.tag" v-if="item.val"><el-tag type="item.color" v-text="item.name"></el-tag></span>
        </div>
        <div class="bottom clearfix">
          <span class="price">￥ {{goodsItem.sub[0].price}}</span>
          <el-button type="success" class="button">查看详情</el-button>
        </div>
      </div>
    </el-card> 
    </router-link> 
</div>
</template>
<script type="text/javascript">
export default{
  props: {
    goodsItem: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style type="text/css" scoped>
	.goods-item{
		position: relative;
	}
	.goods-item{
		margin:20px 0;
		cursor: pointer;
		transition:all .3s ease;
	}
	.goods-item:hover{
		transform: translate3d(0, -2px, 0);		
	}
	.goods-item .image{
		height:200px; 
	}
  .goods-item a.title{
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .goods-item .tag{
    height: 24px;
    margin: 10px;
    margin-left: 0px;
  }
	.goods-item .bottom{
		margin-top: 10px;
	}
	.goods-item .bottom .button{
		padding: 5px 10px;
		float: right;
	}
</style>

