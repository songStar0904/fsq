<template>
<div>
<div class="goods">
<div class="type">
  <span class="nav-item" v-for="item in typeList" :key="item.id" @click="type=item.id" :class="{actived:type===item.id}">{{item.name}}</span>
</div>
<bottom-tool-bar>
        <div slot="handler">
        <span class="nav-item" v-for="item in orderList" :key="item.value" @click="order=item.value" :class="{actived:order===item.value}">{{item.name}}</span>
        </div>
        <div slot="page">
        <el-autocomplete
          v-model="str"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入商品名称"
          @select="getGoods"
          :select-when-unmatched="true"
        ><i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="getGoods">
          </i>
        </el-autocomplete>
        </div>
      </bottom-tool-bar>
      <div class="goods-container"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-row :gutter="50">
 <transition-group>
 <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="item in data" :key="item.id" v-if="item.status===1"> 
        <goods-item :goodsItem="item"></goods-item>
        </el-col>
    </transition-group>
</el-row>
      </div>
<bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
</div>
</div>
</template>
<script type="text/javascript">
import {bottomToolBar, goodsItem} from '@/components/common'
export default{
  data () {
    return {
      typeList: [],
      goodsList: [],
      data: [],
      // 当前页码
      currentPage: 1,
      // 数据总条目
      total: 0,
      // 每页显示多少条数据
      length: 12,
      // 分类 0为全部
      type: 0,
      // 搜索内容
      str: '',
      // 加载动画
      loading: false,
      timeout: null,
      // 输入建议
      restaurants: [],
      // 排序
      order: 'new',
      orderList: [{
        value: 'new',
        name: '最新'
      }, {
        value: 'view',
        name: '最热'
      }, {
        value: 'sale',
        name: '销量'
      }, {
        value: 'price',
        name: '价格'
      }, {
        value: 'love',
        name: '收藏'
      }, {
        value: 'spread',
        name: '推广'
      }]
    }
  },
  watch: {
    type (val) {
      this.getGoods()
    },
    order (val) {
      this.getGoods()
    }
  },
  mounted () {
    this.getGoods()
    this.getType()
  },
  methods: {
    getType () {
      this.$fetch.type.get({
      })
          .then((res) => {
            // console.log(res)
            this.typeList = res.data
          })
          .catch(() => {
          })
    },
    getGoods () {
      this.loading = true
      this.restaurants = []
      this.$fetch.getPro.get({
        page: this.currentPage,
        length: this.length,
        type: this.type,
        case: this.order,
        str: this.str
      }).then((res) => {
        if (res.status) {
          this.goodsList = res.data
          this.data = res.data
          this.total = res.total
          let value
          res.data.forEach((item, i) => {
            value = {value: item.name}
            // 将所有商品名称放入搜索建议里
            this.restaurants.push(value)
          })
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 100 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString) === 0)
      }
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getGoods()
      this.$scrollTo('.goods')
    }
  },
  components: {
    goodsItem,
    bottomToolBar
  }
}
</script>
<style type="text/css" scoped>
.goods{
  max-width: 1000px;
  margin:0 auto;
  padding: 50px 40px 0;
}
.type{
  font-size: 25px;
}
.nav-item {
  margin-right: 10px;
  cursor: pointer;
}
.nav-item.actived{
    color: #13ce66;
  }
</style>

