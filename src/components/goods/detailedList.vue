<template>
  <el-table
    :data="filterStyle"
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
      let style = []
      this.$style.forEach((item, index) => {
        let num = this.filterNum(item.size)
        if (num > 0) {
          style.push(item)
          style[style.length - 1].num = num
        }
      })
      return style
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
  }
}
</script>
