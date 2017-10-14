<template>
<div class="simpleIntroduce">
  <h1 class="title text-success">{{title}}</h1>
	<p v-html="content" class="content"></p>
	<div class="slider">
		<slider-header :title="photoName" @toLeft="toLeft" @toRight="toRight"></slider-header>
		<div class="wrap" @mouseover="stop" @mouseout="start">
			<div class="photo-box" v-for="item in photo" :style="{marginLeft: toMove + 'px'}">
				<img class="preview-img photo-item" v-for="(item, index) in photo" :src="item.src" :title="item.title" height="100" @click="$preview.open(index, photo, options)" :key="index">
			</div>
		</div>
	</div>
</div>
</template>
<script>
import {sliderHeader} from '@/components/common'
export default{
  data () {
    return {
      title: '湘潭社会福利厂',
      content: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp湖南省湘潭市社会福利厂有限公司创建于1986年（前身为湘潭市社会福利厂，于2015年改制），至今已有30年的历史。它位于湘潭市雨湖区，比邻火车站和长途汽车站，交通十分便利。该公司是湘潭市集生产、加工、销售劳动防护用品于一体的民政福利专业企业。目前拥有一栋3000平方米生产加工综合厂房和一个销售经营门店，从业人员86人。<br />&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp公司具备存储劳动防护用品生产销售资质认证，拥有完善的质量监督和管理机制。主要产品有：全棉细帆布工作服，涤棉工作服，牛仔工作服，食品服，医务人员工作服，迷彩服，湘莲牌细口罩，电焊手套，脚套，工具袋，防尘帽，帆布手套等几百种。同时承接来料加工。产品销售国内外各地。',
      photo: [{
        title: '图片一',
        src: '/static/loading.gif',
        w: 600,
        h: 400
      }],
      photoName: '公司环境',
      current: 0,
      toMove: 0,
      timer: null,
      options: {
        bgOpacity: 0.8
      }
    }
  },
  mounted () {
    this.getPhoto()
  },
  methods: {
    getPhoto () {
      this.$fetch.photo.get({
        id: 1
      }).then((res) => {
        if (res.status) {
          this.photo = res.data[0].img
          this.photoName = res.data[0].name
          this.toPlay()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toRight () {
      if (this.current < this.photo.length - 4) {
        this.current ++
      } else {
        this.current = 0
      }
      this.toMove = -this.current * 270
    },
    toLeft () {
      if (this.current > 0) {
        this.current --
      } else {
        this.current = this.photo.length - 4
      }
      this.toMove = -this.current * 270
    },
    toPlay () {
      this.timer = setInterval(() => {
        this.toRight()
      }, 3000)
    },
    start () {
      this.toPlay()
    },
    stop () {
      clearInterval(this.timer)
    }
  },
  components: {
    sliderHeader
  }
}
</script>
<style scoped>
   
	.simpleIntroduce .title{
		text-align: center;
		margin-bottom: 50px;
	}
	.simpleIntroduce .content{
		font-size: 18px;
    color: rgba(72, 106, 92, 1);

	}
	.slider{
		margin: 50px 0;
	}
	.slider .wrap{
	  display: inline-block;
	  margin-top: 30px;
	  width: 100%;
	}
	.slider .wrap .photo-box{
	  width: 20000px;
	  transition: all .5s ease;
	}
	.slider .wrap .photo-box .photo-item{
	  width: 250px;
	  height: 150px;
	  float: left;
	  margin-right: 20px;
	}
</style>
