<template>
	<div class="photo">
	<transition
    name="custom-classes-transition"
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
		<el-row :gutter="0" v-show="fshow" class="photo-group">
  <el-col :xs="12" :sm="12" :md="8" :lg="8" v-for="(item, index) in photo" :key="index" >
  <div class="photo-item"@click="open(index)" ><div class="photo-box"><img :src="item.img[0].src" alt=""></div></div><div class="title">{{item.name}}</div>
  </el-col>
</el-row>
</transition>
<transition
    name="custom-classes-transition"
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
   <photo-box class="" v-show="!fshow" :photo="photo[current]"><div slot="close" @click="fshow = true">
   <span class="fa-stack fa-sm" @mouseover="spin=true" @mouseout="spin=false":class="{'fa-spin': spin}">
  <i class="fa fa-circle-o fa-stack-2x"></i>
  <i class="fa fa-close fa-stack-1x" ></i>
</span></div></photo-box>
</transition>
	</div>
</template>
<script>
  import photoBox from './photo'
  export default{
    data () {
      return {
        photo: [{
          title: '公司环境',
          data: [{
            title: '图片一',
            src: '/static/loading.gif',
            w: 600,
            h: 400
          }]
        }],
        limitNum: 3,
        current: 0,
        spin: false,
        fshow: true
      }
    },
    mounted () {
      this.getPhoto()
    },
    methods: {
      open (index) {
        // console.log(index)
        this.current = index
        this.fshow = false
      },
      getPhoto () {
        this.$fetch.photo.get()
          .then((res) => {
            if (res.status) {
              // console.log(res.data)
              this.photo = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    },
    components: {
      photoBox
    }
  }
</script>
<style scoped>
.photo{
	min-height: 650px;
	position: relative;
  padding: 20px 0;
}
.photo-group{
  width: 100%;
	position: absolute;
}
.photo .photo-item{
	margin: 20px;
}
.photo .photo-item .photo-box{
  padding: 10px;
  border: 1px solid #999;
  height: 200px;
}
.photo .title{
	text-align: center;
}
</style>
