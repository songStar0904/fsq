<template>
	<el-popover
  placement="top"
  trigger="click"
  v-model="visible"
  >
  <p style="margin: 10px 0">确定删除此评论？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="del">确定</el-button>
  </div>
  <el-button slot="reference" type="text" size="mini" style="color:#ff4949">删除</el-button>
</el-popover>
</template>
<script>
export default{
  props: ['id'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    del () {
      this.$emit('del', this.id)
      this.visible = false
    }
  }
}
</script>
