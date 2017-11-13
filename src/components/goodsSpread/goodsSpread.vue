<template>
<div class="spread">
	<div class="head">
		<div class="title text-success">{{title}}</div>
		<div class="more">
			<span class="leftBtn btn" @click="toLeft"><i class="fa fa-angle-left"></i></span>
			<span class="rightBtn btn"@click="toRight"><i class="fa fa-angle-right"></i></span>
		</div>
	</div>
	<div class="wrap">
		<ul class="goods-box" :style="{marginLeft: toMove + 'px'}" ref="asd">
			<li class="goods-item" v-for="item in spreadList" v-if="item.spread==1" ref="item">
  <goods-item :goodsItem="item"></goods-item>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
import {goodsItem} from '@/components/common'
export default{
  props: ['title'],
  data () {
    return {
      spreadList: [],
      current: 0,
      toMove: 0
    }
  },
  mounted () {
    this.getData()
    // console.log(this.$refs, this.$refs.item)
  },
  methods: {
    getData () {
      this.$fetch.getPro.get({
        type: 0,
        case: 'spread'
      }).then((res) => {
        if (res.status) {
          this.spreadList = res.data
        } else {
          this.$message.error('获得spread失败')
        }
      })
    },
    toRight () {
      if (this.current < this.spreadList.length - 4) {
        this.current ++
      } else {
        this.current = 0
      }
      this.toMove = -this.current * 262.5
    },
    toLeft () {
      if (this.current > 0) {
        this.current --
      } else {
        this.current = this.spreadList.length - 4
      }
      this.toMove = -this.current * 262.5
    }
  },
  components: {
    goodsItem
  }
}
</script>
<style>
  .spread .head .title{
  	display: inline-block;
  	padding: 0 16px;
  	font-size: 18px;
  }
  .spread .head .more{
  	float: right;
  }
  .spread .head .more .btn{
  	display: inline-block;
  	height: 22px;
    padding: 0px 15px;
    border: 1px solid #e0e0e0;
    font-size: 17px;
    cursor:pointer;
  }
  .spread .head .more .btn i{
  	display: inline-block;
  	font-weight: 500;
    text-align: center;
    color: #b0b0b0;
     -webkit-transition: color .5s; 
    transition: color .5s;
  }
  .spread .head .more .btn:hover > i{
  	color: #13CE66;
  }
  .spread .wrap{
  	width: 100%;
  	overflow: hidden;
  }
  .spread .wrap .goods-box{
  	display: inline-block;
    padding: 0;
  	width: 20000px;
  	transition: margin-left 0.5s ease;
  }
  .spread .wrap .goods-box .goods-item{
  	width: 212.5px;
		margin:25px;
		float: left;
		cursor: pointer;
		transition:all .3s ease;
	}
	.spread .wrap .goods-box .goods-item:first-child{
		margin-left: 0;
	}
	.spread .wrap .goods-box .goods-item:hover{
		transform: translate3d(0, -2px, 0);		
	}
</style>
