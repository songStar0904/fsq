<template>
<div class="culture">
<title-panel :title="title"></title-panel>
	<el-row :gutter="10">
	
  <el-col :xs="12" :sm="12" :md="8" :lg="8" class="culture-item text-success" v-for="item in culture" :key="item.title">
  <i class="fa" :class="item.icon" :key="item.title"></i>
  <p class="title">{{item.title}}</p>
  <p class="content">{{item.content}}</p>
  </el-col>
 
</el-row>
</div>
</template>
<script>
import {titlePanel} from '@/components/common'
export default{
  props: {
    active: {
      type: String
    }
  },
  data () {
    return {
      title: '企业文化',
      culture: [{
        icon: 'fa-bullseye',
        title: '企业目标',
        content: '全球化的服装企业'
      }, {
        icon: 'fa-flag',
        title: '企业作风',
        content: '今日事，今日毕。言必行，行必果。'
      }, {
        icon: 'fa-sun-o',
        title: '企业愿景',
        content: '成为学习型的企业。'
      }, {
        icon: 'fa-book',
        title: '企业宗旨',
        content: '微笑的客户、满意的合作商。'
      }, {
        icon: 'fa-bookmark',
        title: '企业信条',
        content: '诚为先、信为本、利共享、同发展。'
      }, {
        icon: 'fa-tags',
        title: '经营理念',
        content: '以人为本、追求无止境。'
      }]
    }
  },
  components: {
    titlePanel
  }
}
</script>
<style scoped>
	.culture{
		text-align: center;
	}
	.culture .culture-item {
		margin-bottom: 50px;
	}
	.culture .culture-item i{
		font-size: 80px;
	}
	.culture .culture-item .title{
		font-size: 20px;
		margin:20px 0;
	}
	.culture .culture-item .content{
		font-size: 18px;
		color: #666;
    height: 48px;
	}
</style>
