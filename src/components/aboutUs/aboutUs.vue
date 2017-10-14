<template>
<div class="aboutUs">
<div class="contact">
	<el-row :gutter="30">
  <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="(item, index) in contactList" :key="item.title"><div class="box" :class="'box'+index">
  	<el-row :gutter="20">
  		<el-col :span="8"><i class="icon" :class="item.icon"></i></el-col>
  		<el-col :span="16"><div class="title"><p>{{item.title}}</p><p>{{item.val}}</p></div></el-col>
  	</el-row>
  </div></el-col>
</el-row>
</div>
<div class="wechat-box">
	<img class="wrap" src="../../assets/wrap.png">
	<div class="wechat-img"><img src="../../assets/wechat.png"></div>
	<p>扫一扫关注微信</p>
</div>
</div>
</template>
<script type="text/javascript">
export default{
  name: 'aboutUs',
  data () {
    return {
      title: 'About Us',
      subtitle: '知我，懂我',
      wechat: '../../assets/wechat.png',
      contactList: [{
        title: 'QQ在线客服',
        val: '173858731',
        icon: 'fa fa-qq'
      }, {
        title: '关注官方微信',
        val: 'SJGW999',
        icon: 'fa fa-weixin'
      }, {
        title: '关注官方微博',
        val: '',
        icon: 'fa fa-weibo'
      }]
    }
  },
  methods: {
  }
}
</script>
<style type="text/css" scoped>
	.aboutUs{
		text-align: center;
		padding: 25px 0;
	}
	.contact{
		margin: 25px 15%;
	}
	.contact .box{
		height: 100px;
		border: 1px solid #dadada;
		color: #dadada;
		cursor: pointer;
		transition: all .5s ease;
		margin-bottom: 10px;
	}
	.contact .icon{
		font-size: 50px;
		line-height: 100px;
		margin-left: 10px;
	}
	.contact .title{
		margin-top: 20px;
		line-height: 30px;
	}
	.contact .el-col .box0:hover{
		color: #08c;
		border-color:#08c;
	}
	.contact .el-col .box1:hover{
		color: #00b33b;
		border-color:#00b33b;
	}
	.contact .el-col .box2:hover{
		color: #f01400;
		border-color:#f01400;
	}
	.wechat-box{
		padding: 100px 0 25px;
		background-color: #f5f5f5;
		position: relative;
	}
	.wechat-box .wrap{
		width: 350px;
		height: 92px;
	}
	.wechat-box .wechat-img{
		width: 100px;
		height: 100px;
		top: 50px;
		left: 50%;
		margin-left: -50px;
		position: absolute;
	}
	.wechat-box p{
		position: absolute;
		left: 50%;
		margin-left: -56px;
		top: 160px;
		color: #666;
	}
</style>
