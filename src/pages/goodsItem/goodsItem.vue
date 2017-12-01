<template>
<div class="goods-item" v-if="goods">
<div v-title>湘潭福盛全官网 - {{goods.name}}</div>
<h3 class="goods-name">{{goods.name}} 
  <span class="goods-tag" v-if="goods.tag" v-for="item in goods.tag" style="margin-right:10px;">
  <el-tag :type="item.color" v-if="item.val" v-text="item.name"></el-tag>
</span>
</h3>
<el-row :gutter="20">
  <el-col :span="12">
    <goods-img class="head-right" :$style="goods.style" :currentStyle="currentStyle" :el="$refs.wrap" ref="warp"></goods-img>
  </el-col>
  <el-col :span="12" class="head-right">
    <section class="widget">
    <el-row class="sub row">
      <el-col :span="4">批发量：</el-col> 
      <el-col :span="20"class="goods-sub">
        <el-row :gutter="20">
          <el-col v-for ="(item, index) in sub":span="24/sub.length" :key="index">≥{{item.name}} 件</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="price row">
      <el-col :span="4">单&nbsp;&nbsp;&nbsp;&nbsp;价：</el-col>
      <el-col :span="20" class="goods-price text-orange">
       <el-row :gutter="20">
          <el-col v-for ="(item, index) in sub":span="24/sub.length" :key="index">￥&nbsp;{{item.price | filterMoney}}&nbsp;元</el-col>
        </el-row>
      </el-col>
    </el-row>
    </section>
    <el-row class="goods-ind">
  <el-col :span="8" class="goods-ind-1"><span>浏览：</span> <span class="goods-view text-success">{{goods.view}}</span></el-col>
  <el-col :span="8" class="goods-ind-2"><span>销量：</span> <span class="goods-sale text-success">{{goods.sales_volume}}</span></el-col>
  <el-col :span="8" class="goods-ind-3"> <span>收藏：</span> <span class="goods-comment text-success">{{love}}</span></el-col>
</el-row>
<section>
    <el-row class="style row">
      <el-col :span="4">外&nbsp;&nbsp;&nbsp;&nbsp;观：</el-col>
      <el-col :span="20" class="goods-style">
        <span class="style-item" v-for="(item, index) in goods.style" :class="{actived:currentStyle===index}" @click="changeStyle(index)" :key="index">{{item.name}}</span>
      </el-col>
    </el-row>
    <el-row class="size row">
      <el-col :span="4">规&nbsp;&nbsp;&nbsp;&nbsp;格：</el-col>
      <el-col :span="20" class="goods-size">
         <el-row>
          <div v-for="(size, index) in style" class="size-box">
            <transition-group name="el-zoom-in-center">
           <div v-for="item in size.size" v-show="currentStyle === index" :key="index" class="size-item">
               <el-col :span="2"><strong>{{item.name}}</strong></el-col>
               <el-col :span="5">{{currentPrice | filterMoney}}元</el-col>
               <el-col :span="6">{{item.stock - item.num}}件可售</el-col>
               <el-col :span="9">
                <el-input-number v-model="item.num" :min="0" :max="item.stock" size="small"></el-input-number>
               </el-col>
           </div>
         </transition-group>
           </div> 
         </el-row>
      </el-col>
    </el-row>
    </section>
    <section class="summary text-orange">
      <transition name="el-zoom-in-bottom">
      <detailed-list class="detailed-list" :$style="style" v-show="showList"></detailed-list>
    </transition>
      <el-row>
        <el-col :span="8">已选 <span style="font-size: 20px">{{total}}</span> 件</el-col>
        <el-col :span="8">共计 <span style="font-size: 20px">{{totalPrice | filterMoney}}</span> 元</el-col>
        <el-col :span="8"><el-button type="text" @click="showList = !showList">已选清单<i class="fa fa-angle-up fa-lg" :class="{down:showList}"></i></el-button></el-col>
      </el-row>
    </section>
    <section class="btn">
    <el-button type="danger" size="large" @click="buyGoods('buy')" :disabled="!canBuy">立即购买</el-button>
    <el-button type="primary" size="large" @click="buyGoods" :disabled="!canBuy"><i class="fa fa-shopping-cart" ></i>&nbsp;&nbsp;&nbsp;&nbsp;加入购物车</el-button>
    <span class="collect" :class="{collected: collectTitle==='已收藏'}" @click="collect">
    <i class="fa fa-heart"></i><span> {{collectTitle}}</span>
    </span>
    </section>
  </el-col>
</el-row>
  <el-tabs type="border-card" :class="{fixed: true}">
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
import {detailedList, goodsImg} from '@/components/goods'
export default{
  data () {
    return {
      goods: [],
      comment: [],
      sub: [],
      cart: {
        num: 1
      },
      // 当前选择的style
      currentStyle: 0,
      // 当前选择的规格
      currentSub: 0,
      noDataTitle: '暂无评论╮(╯▽╰)╭',
      type: 'goods',
      // 用户是否收藏
      collected: false,
      // 收藏数
      love: 0,
      collectTitle: '收藏宝贝',
      // 当前价格
      currentPrice: 0,
      // 总数量
      total: 0,
      // 总金额
      totalPrice: 0,
      // 最低批发量
      minNum: 0,
      // 展示已选清单
      showList: false,
      style: [{
        name: '蓝色',
        size: [{
          name: 'L',
          num: 0
        }, {
          name: 'XL',
          num: 0
        }, {
          name: 'XXL',
          num: 0
        }, {
          name: 'XXXL',
          num: 0
        }]
      }, {
        name: '黄色',
        size: [{
          name: 'L',
          num: 0
        }, {
          name: 'XL',
          num: 0
        }, {
          name: 'XXL',
          num: 0
        }]
      }]
    }
  },
  mounted () {
    this.getGoods()
  },
  computed: {
    isLogin () {
      return this.$store.state.user.islogin
    },
    canBuy () {
      return this.total >= this.sub[0].name
    }
  },
  filters: {
    filterMoney (val) {
      if (typeof val === 'number') {
        return val.toFixed(2)
      }
    }
  },
  watch: {
    collected (val) {
      if (val) {
        this.collectTitle = '已收藏'
      } else {
        this.collectTitle = '收藏宝贝'
      }
    },
    style: {
      handler (val) {
        this.total = 0
        val.forEach((item) => {
          item.size.forEach((item) => {
            this.total += item.num
          })
        })
      },
      deep: true
    },
    total (val) {
      if (this.canBuy) {
        this.currentPrice = this.getCurrentPrice()
      }
      this.totalPrice = this.total * this.currentPrice
    }
  },
  methods: {
    getGoods () {
      this.$fetch.getPro.get({
        id: this.$route.query.id
      }).then((res) => {
        if (res.status) {
          this.goods = res.data[0]
          this.collected = this.goods.collect
          this.love = this.goods.love
          this.getStyle(this.goods.style)
          this.sub = this.goods.sub.sort((a, b) => {
            return a.name - b.name
          })
          this.currentPrice = this.goods.sub[0].price
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获得size
    getStyle (data) {
      console.log(this.style)
      data.forEach((item, index) => {
        let size = item.size
        this.style[index].name = item.name
        this.style[index].size = []
        for (var key in size) {
          console.log(key, size[key], this.style)
          this.style[index].size.push({
            name: key,
            stock: size[key],
            num: 0
          })
        }
      })
    },
    // 选择style
    changeStyle (i) {
      this.current = 0
      this.currentStyle = i
      this.toMove = 0
    },
    // 获得当前单价
    getCurrentPrice () {
      let j
      for (let i = 0; i < this.sub.length; i++) {
        if (this.total >= this.sub[i].name) {
          j = i
        }
      }
      return this.sub[j].price
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
    format () {
      let goods = this.goods
      return {
        name: goods.name,
        style: goods.style,
        sub: goods.sub[this.currentSub],
        gid: goods.id,
        total: this.total,
        totalPrice: this.totalPrice
      }
    },
    addCart (type) {
      if (this.isLogin) {
        this.cart = this.format()
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
    commentBox,
    detailedList,
    goodsImg
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
  .goods-item .head-right .goods-name{
    font-weight: bold;
    font-size: 30px;
    color: #333;
  }
  .goods-item .head-right .goods-ind{
    border: 1px dotted #c9c9c9;
    border-width: 1px 0;
    margin: 30px 0 35px;
    padding: 8px 0;
    text-align: center;
    font-size: 14px;
  }
  .goods-item .head-right .goods-ind .goods-ind-2{
        border-right: 1px solid #e5dfda;
        border-left: 1px solid #e5dfda;
  }
  .goods-item .head-right .style .style-item, .goods-item .head-right .sub .sub-item{
    padding: 5px 10px;
    border: 1px solid rgba(153, 153, 153, 0.6);
    color: rgba(153, 153, 153, 0.6);
    margin-right: 20px;
    cursor: pointer;
  }
  .goods-item .head-right .row{
    margin: 25px 0;
  }
  .goods-item .head-right .style .style-item.actived{
    color: #13CE66;
    border-color: #13CE66;
  }
  .goods-item .head-right .widget{
    padding: 0 10px;
    border-top: 1px solid #ff7300;
    background-color: #fff5ec;
    overflow: hidden;
  }
  .goods-item .head-right .widget .row{
    margin: 15px 0;
  }
  .goods-item .head-right .goods-price{
        font-size: 20px;
  }
  .goods-item .head-right .goods-size{
    position: relative;
    height: 160px;
  }
  .goods-item .head-right .goods-size .size-box{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .goods-item .head-right .goods-size .size-box .size-item{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    text-align: right;
    font-size: 14px;
  }
  .goods-item .head-right .summary{
    position: relative;
    //background-color: rgb(238, 246, 243);
    line-height: 34px;
    text-align: center;
    margin-bottom: 20px;
  }
  .goods-item .head-right .summary>.detailed-list{
    position: absolute;
    left: 0;
    bottom: 36px;
    z-index: 1001;
    text-align: left;
  }
  .goods-item .head-right .summary button i{
    margin-left: 8px;
    transition: all ease .5s;
  }
  .goods-item .head-right .summary button i.down{
    transform: rotate(180deg);
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
