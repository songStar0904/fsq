<template>
	<div class="head">
		<div class="title text-success">{{title}}</div>
		<div class="more">
			<span class="leftBtn btn" @click="toLeft"><i class="fa fa-angle-left"></i></span>
			<span class="rightBtn btn" @click="toRight"><i class="fa fa-angle-right"></i></span>
		</div>
	</div>
</template>
<script>
export default{
  props: {
    title: {
      type: String
    }
  },
  methods: {
    toLeft () {
      this.$emit('toLeft')
    },
    toRight () {
      this.$emit('toRight')
    }
  }
}

</script>
<style scoped>
	.head .title{
  	display: inline-block;
  	padding: 0 16px;
  	font-size: 18px;
  }
   .head .more{
  	float: right;
  }
   .head .more .leftBtn{
  }
   .head .more .btn{
  	display: inline-block;
  	height: 22px;
    padding: 0px 15px;
    border: 1px solid #e0e0e0;
    font-size: 17px;
    cursor:pointer;
  }
   .head .more .btn i{
  	display: inline-block;
  	font-weight: 500;
    text-align: center;
    color: #b0b0b0;
     -webkit-transition: color .5s; 
    transition: color .5s;
  }
   .head .more .btn:hover > i{
  	color: #13CE66;
  }
</style>
