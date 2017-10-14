<template>
 <div class="message">
 <div v-if="message.length>0">
 	<message-item v-for="item in message" :key="item.id" :message="item"></message-item>
 	 <bottom-tool-bar>
    <div slot="handler">
    </div>
    <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next, jumper"
            :total="total"
            >
          </el-pagination>
        </div>
      </bottom-tool-bar>
 </div>
 <div v-else class="no-message">{{nomessage}}</div></div>
</template>
<script>
import {messageItem, bottomToolBar} from '@/components/common'
export default{
  data () {
    return {
      message: [],
      nomessage: '还没有任何动态哟',
      // 当前页码
      currentPage: 1,
      // 数据总条目
      total: 0,
      // 每页显示多少条数据
      length: 3,
      type: 0,
      search: ''
    }
  },
  watch: {
    type (val) {
      this.getmessage()
    }
  },
  mounted () {
   // this.getmessage()
  },
  methods: {
    getmessage () {
      this.$fetch.user.getMsg({
        page: this.currentPage,
        length: this.length,
        type: this.type
      })
        .then((res) => {
          if (res.status) {
            this.message = res.data
            this.total = res.total
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 搜索
    handleIconClick (ev) {
      console.log(this.search)
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getmessage()
    }
  },
  components: {
    messageItem,
    bottomToolBar
  }
}
</script>
<style scoped>
.message .no-message{
	  padding: 150px 0;
	  font-size: 30px;
	  text-align: center;
	}
</style>
