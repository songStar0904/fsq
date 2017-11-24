<template>
  <el-table
    :data="style"
    stripe
    empty-text="您还未添加任何记录"
    style="width: 100%"
    >
    <el-table-column
      prop="name"
      label="外观">
    </el-table-column>
    <el-table-column
      prop="num"
      label="总数">
      <template slot-scope="scope">
      	{{scope.row.num}} 件
      </template>
    </el-table-column>
    <el-table-column
      prop="size"
      label="尺码"
      width="250">
      <template slot-scope="scope">
      	<span style="margin-right:10px" v-for="item in scope.row.size" v-show="item.num>0">{{item.name}}({{item.num}})</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default{
  props: ['$style'],
  computed: {
    filterStyle () {
      this.style = []
      this.$style.forEach((item, index) => {
        let num = this.filterNum(item.size)
        if (num > 0) {
          this.style.push(item)
          this.style[this.style.length - 1].num = num
        }
      })
    }
  },
  methods: {
    filterNum (val) {
      let sum = 0
      val.forEach((item) => {
        sum += item.num
      })
      return sum
    }
  },
  data () {
    return {
      style: []
    }
  }
}
</script>
