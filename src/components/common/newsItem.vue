<template>
	<el-row :gutter="0">
  <el-col :span="6" class="img-box"><a href="" :title="item.title">
  <img :src="item.img"></a></el-col>
  <el-col :span="18" class="main-box">
  <router-link :to="{ name: 'newsItem', params: { id: item.id }}">
  <h2 class="title">{{item.title}}&nbsp;&nbsp;<el-tag class="tag" type="danger" v-if="item.stick">置 顶</el-tag></h2>
  </router-link>
  <div class="content" v-html="filterContent"></div>
  <div class="msg-box">
  	<i class="fa fa-fire">&nbsp;&nbsp;<span>{{item.view}}</span></i>
  	<i class="fa fa-heart">&nbsp;&nbsp;<span>{{item.love}}</span></i>
  	<i class="fa fa-clock-o">&nbsp;&nbsp;<span>{{item.date}}</span></i>
  </div>
  </el-col>
</el-row>
</template>
<script type="text/javascript">
export default{
  props: {
    item: Object
  },
  data () {
    return {
      msg: 'news'
    }
  },
  computed: {
    filterContent () {
      return this.item.content.slice(0, 80).concat('...')
    }
  }
}
</script>
<style type="text/css" scoped>
  .img-box{
		height: 180px;
    padding: 25px 3% 
	}
  .main-box{
		padding: 25px;
    height: 180px;

	}
  .main-box a{
    height: 50px;
    display: inline-block;
  }
  .title{
    font-size: 22px;
  }
  .main-box .content{
    max-height: 61px;
	}
  .main-box .msg-box{
    bottom: 25px;
    position: absolute;
  }
  .main-box .msg-box i{
		margin: 0 10px;
		color: #999;
		cursor: pointer;
	}
  .main-box .msg-box i:first-child{
    margin-left: 0;
  }
  .main-box .msg-box i:hover{
		color: #666;
	}
</style>
