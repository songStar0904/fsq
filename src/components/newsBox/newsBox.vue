<template>
<div id="newsBox">
<div id="newsWrap" @mouseenter="stop" @mouseleave="start">
<div class="news-box" ref="newsBox" :style="{top: toMove}">
	<div class="newsItem" v-for="(item, index) in newsList" ref="newsItem">
      <news-item :item="item"></news-item>
    </div>
    
	</div>
</div>
</div>
</template>
<script>
import {newsItem} from '@/components/common'
export default {
  name: 'newsBox',
  data () {
    return {
      title: '新闻资讯',
      subtitle: '新鲜事，简单报',
      newsList: [{
        id: 1,
        title: '福盛全官网正式上线',
        content: '福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线...',
        glance: 55,
        heart: 23,
        time: '2017-7-5',
        img: '/static/loading.gif'
      }, {
        id: 2,
        title: '福盛全官网正式上线',
        content: '福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线福盛全官网正式上线...',
        glance: 55,
        heart: 23,
        time: '2017-7-5',
        img: '/static/loading.gif'
      }],
      toTop: null,
      current: null,
      timer: null,
      time: 5000,
      toMove: 0,
      transitionIn: true
    }
  },
  mounted () {
    this.toTop = this.$refs.newsItem[0].clientHeight
    this.getNews()
    this.play()
  },
  methods: {
    getNews () {
      this.$fetch.news.get({
        type: 'stick'
      })
        .then((res) => {
          if (res.status) {
            this.newsList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    play () {
      this.timer = setInterval(() => {
        if (this.current < this.$refs.newsItem.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        this.toMove = -this.toTop * this.current + 'px'
      }, this.time)
    },
    stop () {
      clearInterval(this.timer)
      // console.log('stop')
    },
    start () {
      // console.log('start')
      this.play()
    }
  },
  components: {
    newsItem
  }
}
</script>
<style scoped>
    #newsBox{
        padding: 25px 0;
	}
	#newsWrap{
		height: 200px;
		overflow: hidden;
		position: relative;
	}
	.news-box{
		position: absolute;
		transition: all 1s;
	}
	.newsItem{
		height: 200px;
		padding: 10px 10px;
		margin:0 auto;
	}
</style>
