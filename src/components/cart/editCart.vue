<template>
	<div class="cart-box">
  <el-table
    ref="multipleTable"
    :data="cart"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="200"
    show-overflow-tooltip> 
    <template scope="scope">{{scope.row.data.name}} · {{scope.row.data.style.name}} · {{scope.row.data.sub.name}}</template>
    </el-table-column>
    <el-table-column
      label="商品图片"
      width="120"
      align="center"
    header-align="center">
       <template scope="scope"><img :src="scope.row.data.style.img" alt=""></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="100"
      align="center"
    header-align="center">
    <template scope="scope">￥  {{scope.row.data.sub.price}}</template>
    </el-table-column>
    
    <el-table-column
      prop="num"
      label="数量"
      width="200"
      align="center"
    header-align="center">
    <template scope="scope" ><el-input-number v-model="scope.row.num" size="small" :min="1" @change="handleChange(scope.row)" ></el-input-number></template>
    </el-table-column>
    <el-table-column
      label="小计"
      width="100"
      class-name="subtotal"
      align="center"
    header-align="center">
    <template scope="scope">￥  {{scope.row.num * scope.row.data.sub.price }}</template>
    </el-table-column>
   <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="del(scope.$index, scope.row.id)" icon="delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="total-box">总金额：<span>￥{{totalMoney}}</span></div>
	</div>
</template>
<script>
export default{
  props: ['tCart'],
  data () {
    return {
      multipleSelection: [],
      totalMoney: 0,
      cid: 0
    }
  },
  watch: {
    multipleSelection: {
      handler (val) {
        this.calcTotalMoney()
        val.totalMoney = this.totalMoney
        this.$store.commit('SET_TCART_GOODS', val)
      },
      deep: true
    }
  },
  mounted () {
    // 初始化选择
    // this.toggleSelection(this.tCart.goods)
  },
  computed: {
    cart () {
      return this.$store.state.cart.cart
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val
    },
    // 改变单个数量
    handleChange (val) {
      let num = this.findNum(val.cid) ? this.findNum(val.cid) : val.num
      this.$fetch.cart.handle({
        cid: val.cid,
        num: num
      }).then((res) => {
        if (res.status) {
          // this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    findNum (id) {
      this.cart.forEach((item) => {
        if (item.cid === id) {
          console.log(item, item.num)
          return item.num
        }
      })
    },
    setCid (cid) {
      console.log(cid, 'asd')
      this.cid = cid
    },
    // 删除单个
    del (i, row) {
      // console.log(i, row)
      this.$fetch.cart.handle({
        cid: row,
        num: 0
      }).then((res) => {
        if (res.status) {
          this.$message.success('删除成功')
          this.$store.dispatch('GET_CART')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 计算总金额
    calcTotalMoney () {
      let totalMoney = 0
      this.multipleSelection.forEach((item) => {
        totalMoney += item.num * item.data.sub.price
      })
      this.totalMoney = totalMoney
    }
  }
}
</script>
<style scoped>
  .subtotal, .total-box{
  	color: #f60;
  }
  .total-box{
  	font-size: 25px;
  	margin-top: 20px;
  }
  .cell img{
    max-height: 60px;
  }
</style>
