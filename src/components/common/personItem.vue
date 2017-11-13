<template>
  <el-card  class="person-item" :body-style="{ padding: '0px', height: '280px' }" >
      <img :src="person.img" class="image">
      <div style="padding: 10px;">
      <div class="name">
        <span>{{ person.name }}</span>
        </div>
        <span class="mark bg-success">
        	<el-row :gutter="0" class="main">
			  <el-col :span="12"><div class="portrait">
			  	<img :src="person.img" alt="">
			  </div>
			  </el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<div class="name2">{{person.name}}</div>
		        <div class="profession">{{person.profession}}</div>
			  </div>
			</el-col>
			</el-row>
			<i class="fa fa-quote-left"></i>
    		<div class="detail">{{person.detail}}</div>
    		<i class="fa fa-quote-right"></i>
    	</span>
      </div>
   </el-card>  
</template>
<script type="text/javascript">
export default{
  props: {
    person: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style type="text/css" scoped>
.person-item{
	position: absolute;
	width: 194px;
	cursor: pointer;
	color: #fff;
	font-size: 14px;
}
.person-item img{
	width: 100%;
	height: 100%;
}
.person-item .name{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 35px;
	background-color: rgba(19, 206, 102, .6);
}
.person-item .name span{
	line-height: 35px;
}
.person-item .mark{
	position: absolute;
	top: 280px;
	left: 0;
	width: 100%;
	height: 280px;
	padding: 18px;
	box-sizing: border-box;
	text-align: left;
	transition: all ease 0.5s;
	z-index: 10;
}
.person-item:hover .mark{
	top: 0;
}
.person-item .mark .main{
	margin-bottom: 10px;
}
.person-item .mark .portrait{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #fff;
	overflow: hidden;
}
.person-item .mark .portrait img{
	width: 56px;
	height: 56px;
	margin: 2px;
	border-radius: 50%;
}
.person-item .mark .detail{
	margin: 5px 0;
}
.person-item .mark .name2{
	font-size: 16px;
	margin-bottom: 10px;
}
</style>

