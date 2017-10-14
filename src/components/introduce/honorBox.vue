<template>
  <div class="honor">
  <title-panel :title="title"></title-panel>
  	<el-row :gutter="10" class="honor-box">
  <el-col :xs="12" :sm="12" :md="8" :lg="8" class="honor-item" v-for="item in honor" :key="item.title"><img :src="item.img" alt=""><p>{{item.title}}</p></el-col>
</el-row>
  </div>
</template>
<script>
import {titlePanel} from '@/components/common'
export default{
  data () {
    return {
      title: '公司荣誉',
      honor: [{
        title: '劳保专业委员会',
        img: 'http://119.29.74.66/tm/Public/MallPic/honor/honor1.jpg'
      }, {
        title: '劳保专业委员会',
        img: 'http://119.29.74.66/tm/Public/MallPic/honor/honor2.jpg'
      }, {
        title: '劳保专业委员会',
        img: 'http://119.29.74.66/tm/Public/MallPic/honor/honor3.jpg'
      }]
    }
  },
  components: {
    titlePanel
  }
}
</script>
<style scoped>
    .honor{
    	text-align: center;
    	margin-bottom: 50px;
    }
	.honor .honor-item{
		display: inline-block;
	  float: left;
    font-size: 20px;
	  text-align: center;
	}
  .honor .honor-item img{
    height: 150px;
  }
</style>
