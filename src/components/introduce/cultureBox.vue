<template>
<div class="culture">
<title2-panel :title="title" :subtitle="subtitle"></title2-panel>
	<!-- <el-row :gutter="10">
  <el-col :xs="12" :sm="12" :md="8" :lg="8" class="culture-item text-success" v-for="item in culture" :key="item.title">
  <i class="fa" :class="item.icon" :key="item.title"></i>
  <p class="title">{{item.title}}</p>
  <p class="content">{{item.content}}</p>
  </el-col>
 
</el-row> -->
<div class="main">
     <img src="../../assets/culture.jpg" alt="">
     <div v-for="(item, index) in culture">
    <el-tooltip class="tip" :placement="active = index < 3 ? 'left' : 'right'">
      <div slot="content"><span class="title" style="font-size: 16px;">{{item.title}}</span><br/>{{item.content}}</div>
      <div class="item"  :class="'pos' + index">
      <i class="fa fa-3x" :class="item.icon" :key="item.title"></i>
    </div>
    </el-tooltip>
    </div>
</div>
</div>
</div>
</template>
<script>
import {title2Panel} from '@/components/common'
export default{
  data () {
    return {
      subtitle: '企业文化',
      title: 'BUSINESS CULTURE',
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
      }],
      active: null
    }
  },
  components: {
    title2Panel
  }
}
</script>
<style scoped>
	.culture{
    height: 700px;
		text-align: center;
	}
	.culture .main{
    position: relative;
    width: 200px;
    height: 200px;
    margin: 200px auto;
  }
  .culture .main img{
    border-radius: 50%;
  }
  .culture .item{
    position: absolute;
    width: 50px;
    height: 50px;
    padding: 12px;
    border-radius: 50%;
    border: 1px solid;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    transition: all ease .5s;
  }
  .culture .item:hover{
    color: #fff;
    background-color: #13CE66;
    border-color: #13CE66;
  }
  .culture .item.pos0{
    left: -80px;
    top: -120px;
  }
  .culture .item.pos1{
    left: -150px;
    top: 62px;
  }
  .culture .item.pos2{
    left: -80px;
    top: 260px;
  }
  .culture .item.pos3{
    right: -80px;
    top: -120px;
  }
  .culture .item.pos4{
    right: -150px;
    top: 62px;
  }
  .culture .item.pos5{
    right: -80px;
    top: 260px;
  }
</style>
