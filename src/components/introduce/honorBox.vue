<template>
  <div class="honor">
  <title-panel :title="title"></title-panel>
  	<el-row :gutter="10" class="honor-box">
  <el-col :xs="24" :sm="12" class="honor-item" v-for="item in honor" :key="item.title">
    <i class="fa-tag fa text-success"></i><span>{{item.title}}</span>
  </el-col>
</el-row>
  </div>
</template>
<script>
import {titlePanel} from '@/components/common'
export default{
  data () {
    return {
      title: '公司荣誉',
      img: 'http://119.29.74.66/tm/Public/MallPic/honor/honor2.jpg',
      honor: [{
        title: '国家高新技术企业、深圳市高新技术企业'
      }, {
        title: '深圳市“双软”认定企业、“创新型”中小微企业'
      }, {
        title: '深圳市智能交通行业协会会员单位'
      }, {
        title: '国家高新技术企业、深圳市高新技术企业'
      }, {
        title: '国家高新技术企业、深圳市高新技术企业'
      }, {
        title: '2016年9月，完成pre-A轮5000万融资'
      }, {
        title: '国家高新技术企业、深圳市高新技术企业'
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
    text-align: left;
    font-size: 14px; 
    color: rgba(72, 106, 92, 0.8);
	}
  .honor .honor-item i{
    margin-right: 15px;
  }
</style>
