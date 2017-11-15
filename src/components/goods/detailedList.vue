<template>
  <el-table
    :data="$style"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="颜色">
    </el-table-column>
    <el-table-column
      prop="num"
      label="件数">
      <template scope="scope">
      	{{scope.row.size | filterNum}} 件
      </template>
    </el-table-column>
    <el-table-column
      prop="size"
      label="尺码"
      width="250">
      <template scope="scope">
      	<span style="margin-right:10px" v-for="item in scope.row.size">{{item.name}}({{item.num}})</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default{
  props: ['$style'],
  filters: {
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
    }
  }
}
</script>
