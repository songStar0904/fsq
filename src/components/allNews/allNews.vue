<template>
<div class="bg-box">
	<div class="news-box"
  v-loading="loading"
      element-loading-text="拼命加载中">
		<div class="news-item" v-for="(item, index) in newsList" v-if="item.status===1" >
			<news-item :item="item" ></news-item>
		</div>
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
	</div>
</template>
<script type="text/javascript">
import {newsItem, bottomToolBar} from '@/components/common'
export default{
  data () {
    return {
      msg: 'news',
      newsList: [{
        id: 1,
        title: '福盛全官网正式上线',
        content: '福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线...',
        glance: 55,
        heart: 23,
        time: '2017-7-5',
        img: '/static/loading.gif'
      }],
      // 当前页码
      currentPage: 1,
      // 数据总条目
      total: 0,
      // 每页显示多少条数据
      length: 5,
      type: 0,
      loading: false
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    getNews () {
      this.loading = true
      this.$fetch.news.get({
        page: this.currentPage,
        length: this.length,
        type: 0
      })
        .then((res) => {
          if (res.status) {
            this.newsList = res.data
            this.currentPage = res.page
            this.total = res.total
            this.loading = false
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getNews()
      this.$scrollTo('.bg-box')
    }
  },
  components: {
    newsItem,
    bottomToolBar
  }
}
</script>
<style type="text/css" scoped>
  
  .news-box .news-item{
  	max-width: 1000px;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        border-radius: 2px;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
  }
  .news-box .news-item:hover{
    box-shadow: 0 0px 8px rgba(0,0,0,0.2);
  }
</style>
