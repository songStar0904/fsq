<template>
	<section class="ourTeam">
		<title2-panel :title="title" :subtitle="subtitle"></title2-panel>
		<span class="detail" v-text="detail"></span>
		<el-row class="box" type="flex" justify="space-between">
		  <el-col :span="1">
		  	<div class="left_btn btn" @click="current--">
				<i class="el-icon-arrow-left"></i>
				</div>
		  </el-col>
		  <el-col :span="22" :style="{overflow: 'hidden',position: 'relative'}">
		  	<person-item v-for="(item, index) in team" :person="item" :style="'transform: translateX('+ 210 * ((index+current) % team.length) +'px)'"></person-item>
		</el-col>
		  <el-col :span="1">
		  	<div class="right_btn btn" @click="current++">
				<i class="el-icon-arrow-right"></i>
			</div>
		</el-col>
		</el-row>
	</section>
</template>
<script>
import {title2Panel, personItem} from '@/components/common'
export default{
  data () {
    return {
      title: 'MEET OUR TEAM',
      subtitle: '我们的团队',
      detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹！',
      team: [{
        name: 'songStar1',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }, {
        name: 'songStar2',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }, {
        name: 'songStar3',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }, {
        name: 'songStar4',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }, {
        name: 'songStar5',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }, {
        name: 'songStar6',
        img: 'http://pic.qiantucdn.com/58pic/15/17/07/11R58PICWrZ_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center',
        profession: '前端工程师',
        detail: '有一批拥有热情和梦想的年轻人组成，现在寻找和我们一样追求快乐和创新，用有野心改变世界的有志青年，集结梦想，创造奇迹'
      }],
      current: 0
    }
  },
  watch: {
    current () {
      console.log(this.current)
      if (this.current > this.team.length) {
        this.current = 0
      } else if (this.current < 0) {
        this.current = this.team.length - 1
      }
    }
  },
  methods: {
  },
  components: {
    title2Panel,
    personItem
  }
}
</script>
<style scoped>
.ourTeam{
	text-align: center;
}
.ourTeam .panel{
	margin-bottom: 20px;
}
.ourTeam .detail{
	display: inline-block;
	width: 600px;
	font-size: 14px;
}
.box{
	max-width: 1000px;
	margin: 50px auto;
	height: 280px;
}
.btn{
	line-height: 250px;
	font-size: 18px;
	cursor: pointer;
}
.btn:hover{
	color: #13CE66;
}
.warp{
	overflow: hidden;
    position: relative;
}
.person-item{
	transition: all ease 0.5s;
}
</style>
