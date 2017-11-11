<template>
<div class="goods-item" v-if="goods">
<div v-title>湘潭福盛全官网 - {{goods.name}}</div>
<div class="head-left">
<!-- <p>{{lensLeft}}</p><p>{{wrapLeft}}</p> -->
  <div class="wrap" ref="wrap" @mouseover="showLens=true" @mouseout="showLens=false" @mousemove="doMouseMove($event)">
  	<ul class="goods-img" :style="{marginLeft: toMove + 'px'}">
  		<li class="img-item" v-for="item in goods.style[currentStyle].img">
  			<img :src="item.url" alt="">
  		</li>
  	</ul>
  	<span class="img-lens" v-show="showLens==true" :style="{left: lensX+'px', top: lensY + 'px'}"></span>
  </div>
  <div class="page">
  	<div class="page-item" v-for="(item, index) in goods.style[currentStyle].img" @mouseover="toGo(index)" :class="{actived:current===index}">
  	<span class="arrow"></span>
  		<img :src="item.url" alt="">
  	</div>
  </div>
  <transition name="el-fade-in-linear">
  <div class="bigImg" v-show="showLens">
  <img :src="goods.style[currentStyle].img[current].url" alt="" :style="{left: bigLeft+'px', top: bigTop + 'px'}">
  </div>
  </transition>
  </div>
  <div class="head-right">
    <div class="goods-name">{{goods.name}}</div>
    <div class="goods-meta">
      <span class="label">分类：</span> <span class="goods-type"  v-if="goods.type" v-text="goods.type.type_name"></span><br><br>
      <span class="label">标签：</span> <span class="goods-tag" v-if="goods.tag" v-for="item in goods.tag">
      <el-tag :type="item.color" v-if="item.val" v-text="item.name"></el-tag>
      </span>
      <span class="goods-tag" v-if="!goods.tag[0].val&&!goods.tag[1].val">无</span>
    </div>
    <el-row class="goods-ind">
  <el-col :span="8" class="goods-ind-1"><span>浏览：</span> <span class="goods-view text-success">{{goods.view}}</span></el-col>
  <el-col :span="8" class="goods-ind-2"><span>销量：</span> <span class="goods-sale text-success">{{goods.sales_volume}}</span></el-col>
  <el-col :span="8" class="goods-ind-3"> <span>收藏：</span> <span class="goods-comment text-success">{{love}}</span></el-col>
</el-row>
    <div class="style">
      <span>外&nbsp;&nbsp;&nbsp;&nbsp;观：</span> <span class="goods-style">
        <span class="style-item" v-for="(item, index) in goods.style" :class="{actived:currentStyle===index}"@click="changeStyle(index)">{{item.name}}</span>
      </span>
    </div>
    <div class="sub">
      <span>批发量：</span> <span class="goods-sub">
        <span class="sub-item" v-for="(item, index) in goods.sub" :class="{actived:currentSub===index}"@click="changeSub(index)">{{item.name}}</span>
      </span>
    </div>
    <div class="sub">
      <span>规&nbsp;&nbsp;&nbsp;&nbsp;格：</span> <span class="goods-sub">
        <span class="sub-item" v-for="(item, index) in sub" :class="{actived:currentSub2===index}"@click="currentSub2=index">{{item.name}}</span>
      </span>
    </div>
    <div class="goods-price text-orange">￥&nbsp;{{goods.sub[currentSub].price}}&nbsp;元</div>
    <div class="btn">
    <el-button type="danger" size="large" @click="buyGoods('buy')">立即购买</el-button>
    <el-button type="success" size="large" @click="buyGoods"><i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;&nbsp;加入购物车</el-button>
    <span class="collect" :class="{collected: collectTitle==='已收藏'}" @click="collect">
    <i class="fa fa-heart"></i><span> {{collectTitle}}</span>
    </span>
    </div>
  </div>
  <el-tabs type="border-card" >
  <el-tab-pane v-html="goods.detail" class="goods-detail-header">
    <span slot="label"><i class="el-icon-date"></i> 商品详情</span>
    商品详情
  </el-tab-pane>
  <el-tab-pane><span slot="label"><i class="fa fa-commenting-o"></i> 评论({{goods.comment}})</span>
  <comment-box :id="goods.id" :noDataTitle="noDataTitle"  :type="type"></comment-box></el-tab-pane>
</el-tabs>
</div>
</template>
<script type="text/javascript">
import {commentBox} from '@/components'
export default{
  data () {
    return {
      goods: [],
      comment: [],
      cart: {
        num: 1
      },
      // 当前选择的style
      currentStyle: 0,
      // 当前选择的规格
      currentSub: 0,
      currentSub2: 0,
      // 放大倍数
      scale: 2,
      current: 0,
      toMove: 0,
      showLens: false,
      offsetX: 0,
      offsetY: 0,
      lensLeft: 0,
      lensTop: 0,
      wrapWidth: 400,
      wrapHeight: 450,
      wrapLeft: 0,
      wrapTop: 255,
      currentImg: '',
      bigLeft: 0,
      bigTop: 0,
      noDataTitle: '暂无评论╮(╯▽╰)╭',
      type: 'goods',
      // 用户是否收藏
      collected: false,
      // 收藏数
      love: 0,
      collectTitle: '收藏宝贝',
      sub: [{
        name: 'L'
      }, {
        name: 'XL'
      }, {
        name: 'XXL'
      }, {
        name: 'XXXL'
      }]
    }
  },
  created () {
    this.getGoods()
  },
  mounted () {
    window.onresize = () => {
      this.init()
    }
  },
  computed: {
    lensX () {
      if (this.lensLeft < 0) {
        return 0
      } else if (this.lensLeft > this.wrapWidth / 2) {
        return this.wrapWidth / 2
      } else {
        return this.lensLeft
      }
    },
    lensY () {
      if (this.lensTop < 0) {
        return 0
      } else if (this.lensTop > this.wrapHeight / 2) {
        return this.wrapHeight / 2
      } else {
        return this.lensTop
      }
    },
    isLogin () {
      return this.$store.state.user.islogin
    }
  },
  watch: {
    collected (val) {
      if (val) {
        this.collectTitle = '已收藏'
      } else {
        this.collectTitle = '收藏宝贝'
      }
    }
  },
  methods: {
    getGoods () {
      this.$fetch.getPro.get({
        id: this.$route.params.id
      }).then((res) => {
        if (res.status) {
          this.goods = res.data[0]
          this.collected = res.data[0].collect
          this.love = res.data[0].love
          this.$nextTick(() => {
            this.init()
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选择style
    changeStyle (i) {
      this.current = 0
      this.currentStyle = i
      this.toMove = 0
    },
    // 选择规格
    changeSub (i) {
      this.currentSub = i
    },
    init () {
      // console.log(this.$refs.wrap)
      let rect = this.$refs.wrap.getBoundingClientRect()
      this.wrapWidth = rect.width
      this.wrapHeight = rect.height
      this.wrapLeft = rect.left
      this.wrapTop = rect.top
    },
    toGo (index) {
      this.current = index
      this.toMove = -this.current * this.wrapWidth
    },
    doMouseMove (e) {
      this.offsetX = e.pageX - this.wrapLeft
      this.offsetY = e.pageY - this.wrapTop
      this.lensLeft = this.offsetX - this.wrapWidth / 4
      this.lensTop = this.offsetY - this.wrapHeight / 4
      this.moveBigImg()
    },
    moveBigImg () {
      this.bigLeft = -this.lensX * 2
      this.bigTop = -this.lensY * 2
    },
    buyGoods (type) {
      this.addCart(type)
    },
    // 收藏商品
    collect () {
      if (this.isLogin) {
        this.$fetch.collect.handle({
          gid: this.$route.params.id
        }).then((res) => {
          if (res.status) {
            this.collected = !this.collected
            if (this.collected) {
              this.love ++
            } else {
              this.love --
            }
          }
        })
      } else {
        this.$message('请先登录!')
      }
    },
    addCart (type) {
      if (this.isLogin) {
        this.cart.name = this.goods.name
        this.cart.style = this.goods.style[this.currentStyle]
        this.cart.sub = this.goods.sub[this.currentSub]
        this.cart.gid = this.goods.id
        this.$store.commit('SET_PCART', this.cart)
        this.$store.dispatch('CHANGE_CART')
          .then((res) => {
            if (res) {
              if (type === 'buy') {
                this.$router.push({name: 'buy', params: {name: this.goods.name, active: 1}})
              }
            }
          })
      } else {
        this.$message('请先登录!')
      }
    }
  },
  components: {
    commentBox
  }
}
</script>
<style scoped>
  .goods-item .el-tabs{
    position: relative;
  }
  .goods-item .el-tabs__content{
    position: static;
  }
  .goods-item .el-tabs__nav{
      float: left;
    }
  .goods-item{
  	width: 1000px;
  	margin: 50px auto;
  }
  .goods-item .head-left{
  	position: relative;
    display: inline-block;
  }
  .goods-item .head-left .wrap{
  	width: 400px;
  	height: 450px;
  	overflow: hidden;
  	position: relative;
  }
  .goods-item .head-left .bigImg{
  	width: 400px;
  	height: 450px;
  	position: absolute;
  	overflow: hidden;
  	left: 480px;
  	top: 0;
    z-index: 10000;
  }
  .goods-item .head-left .bigImg img{
  	position: absolute;
  	width: 800px;
  	height: 900px;
  }
  .goods-item .head-left .img-lens{
  	position: absolute;
  	width: 50%;
  	height: 50%;
    background: url(https://img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png) repeat scroll 0 0 transparent;
  	//background-color: rgba(255,255,255,.5);
    //border: 1px solid #eee;
    top: 0;
    left: 0;
    cursor: move;
  }
  .goods-item .head-left .wrap ul{
  	width: 20000px;
  	height: 100%;
  	transition: margin-left 0.5s ease;
  }
  .goods-item .head-left .wrap ul li{
  	float: left;
  	width: 400px;
  	height: 100%;
  }
  .goods-item .head-left .page{
  	width: 400px;
  	height: 60px;
  	margin-top: 10px;
  }
  .goods-item .head-left .page .page-item.actived{
  	border-color: #13CE66;
  	width: 50px;
  	height: 50px;
  }
  .goods-item .head-left .page .page-item{
  	position: relative;
  	width: 50px;
  	height: 50px;
  	float: left;
  	border: 3px solid transparent;
  	margin-right: 6px;
  }
  .goods-item .head-left .page .page-item.actived .arrow{
  	display: inline;
  }
  .goods-item .head-left .page .page-item .arrow{
  	width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #13CE66 transparent;
    line-height: 0px;
    _border-color: #000000 #000000 #13CE66 #000000;
    position: absolute;
    left: 50%;
    margin-left: -5px;
    top: -8px;
    display: none;
  }
  .goods-item .head-right{
    position: absolute;
    width: 500px;
    display: inline-block;
    margin-left: 80px;
  }
  .goods-item .head-right .goods-name{
    font-weight: bold;
    font-size: 30px;
    color: #333;
  }
  .goods-item .head-right .goods-meta{
    width: 200px;
    padding-left: 20px;
    margin:30px auto 30px;
        background-color: #f8f8f8;
  }
  .goods-item .head-right .goods-meta .label{
    color: #333;
    font-weight: 700;
  }
  .goods-item .head-right .goods-ind{
        border: 1px dotted #c9c9c9;
            border-width: 1px 0;
    margin: -1px 20px 40px 0;
    padding: 10px 0;
  }
  .goods-item .head-right .goods-ind .goods-ind-2{
        border-right: 1px solid #e5dfda;
        border-left: 1px solid #e5dfda;
  }
  .goods-item .head-right .goods-ind .goods-ind-1,.goods-item .head-right .goods-ind .goods-ind-2,.goods-item .head-right .goods-ind .goods-ind-3{
    text-align: center;
  }
  .goods-item .head-right .style .style-item, .goods-item .head-right .sub .sub-item{
    padding: 5px 10px;
    border: 1px solid rgba(153, 153, 153, 0.6);
    color: rgba(153, 153, 153, 0.6);
    margin: 0 10px;
    cursor: pointer;
  }
  .goods-item .head-right .sub{
    margin: 25px 0;
  }
  .goods-item .head-right .style .style-item.actived, .goods-item .head-right .sub .sub-item.actived{
    color: #13CE66;
    border-color: #13CE66;
  }
  .goods-item .head-right .goods-price{
        font-size: 30px;
    margin: 25px 0;
  }
  .goods-item .head-right .collect{
    margin-left: 10px;
    cursor: pointer;
    color: #999;
  }
  .goods-item .head-right .collect.collected{
    color: #ff4949;
  } 
  .goods-item .el-tabs{
    margin-top: 50px;
  }
</style>
