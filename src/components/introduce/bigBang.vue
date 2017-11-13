<template>
	<section class="bigBang">
		<title2-panel :title="title" :subtitle="subtitle"></title2-panel>
		<article class="box">
			<div class="btn left" @click="toLeft()"><i class="el-icon-arrow-left"></i></div>
			<div class="main-line" :style="'width:'+(bigBang.length+1)*200 +'px;left:'+(-toMove)+'px'">
				<div class="tip" v-for="(item, index) in bigBang"  :style="'left:'+((index * 200)+100) +'px'">
					<span class="time" v-text="item.time"></span>
					<tip-box :title="item.value" :key="index" :type="type=index%2" :color="color = !(index%3)" ></tip-box>
				</div>
			</div>
			<div class="btn right" @click="toRight()"><i class="el-icon-arrow-right"></i></div>
		</article>
	</section>
</template>
<script>
import {title2Panel, tipBox} from '@/components/common'
export default{
  data () {
    return {
      title: 'BIG BANG',
      subtitle: '大事件',
      bigBang: [{
        time: '2015/6',
        value: '2015干了啥干了啥干了啥'
      },
      {
        time: '2016/5',
        value: '2016干了啥干了啥干了啥'
      },
      {
        time: '2017/12',
        value: '2017干了啥干了啥干了啥'
      },
      {
        time: '2016/4',
        value: '2018干了啥干了啥干了啥'
      },
      {
        time: '2017/4',
        value: '2019干了啥干了啥干了啥'
      },
      {
        time: '2017/12',
        value: '2017干了啥干了啥干了啥'
      },
      {
        time: '2016/4',
        value: '2018干了啥干了啥干了啥'
      },
      {
        time: '2017/4',
        value: '2019干了啥干了啥干了啥'
      }],
      current: 0,
      toMove: 0
    }
  },
  watch: {
    current () {
      this.toMove = this.current * 200
    }
  },
  methods: {
    toLeft () {
      if (this.current <= 0) {
        this.current = 0
      } else {
        this.current--
      }
    },
    toRight () {
      if (this.current < this.bigBang.length - 4) {
        this.current++
      }
    }
  },
  components: {
    title2Panel,
    tipBox
  }
}
</script>
<style scoped>
.bigBang{
	max-width: 1000px;
	text-align: center;
}
.box{
	position: relative;
	height: 400px;
	margin-top: 70px;
}
.box .btn{
	position: absolute;
	top: 100px;
	width: 40px;
	height: 40px;
	background-color: rgb(25, 206, 102);
	color: #fff;
	cursor: pointer;
}
.box .btn:hover{
	background-color: #13CE66;
}
.box .btn i{
	position: absolute;
	top: 12px;
}
.box .btn.left i{
	left: 10px;
}
.box .btn.right i{
	right: 10px;
}
.box .btn.left{
	left: 0;
}
.box .btn.right{
	right: 0;
}
.box .main-line{
	position: absolute;
	top: 115px;
	width: 1000px;
	height: 10px;
	background-color: rgb(230, 245, 240);
	z-index: -1;
	transition: all ease 0.5s;
}
.box .tip{
	position: absolute;
	width: 30px;
	height: 30px;
	top: -10px;
	border-radius: 50px;
	background-color: rgb(200, 223, 223);
	cursor: pointer;
	z-index: 10;
}
.box .tip .time{
    position: absolute;
    top: 30px;
    left: -15px;
    color: rgba(72, 106, 92, 0.8);
}
</style>
