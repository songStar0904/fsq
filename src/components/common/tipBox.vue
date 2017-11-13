<template>
<section class="tipBox" v-if="title" :class="{main:color,Ttop:type,Tbottom:!type}">
<div class="title" v-text="title">
</div>
<i class="el-icon-caret-bottom arrow bottom" v-if="!type"></i>
<i class="el-icon-caret-top arrow top" v-if="type"></i>
</section>
</template>
<script type="text/javascript">
export default{
  props: {
    title: {
      type: String
    },
    type: {
      type: Number
    },
    color: {
      type: Boolean
    }
  },
  mounted () {
  }
}
</script>
<style type="text/css" scoped>
.tipBox{
	position: absolute;
	text-align: left;
	background-color: rgb(200, 223, 223);
	color: rgba(72, 106, 92, 1);
}
.Ttop{
	top: 60px;
}
.Tbottom{
	bottom: 60px;
}
.tipBox.main{
	background-color: #13CE66;
	color: #fff;
}
.title{
	position: relative;
	padding: 10px;
	width: 180px;
	height: 70px;
}
.arrow{
	position: relative;
	left: 6px;
	color: rgb(200, 223, 223);
}
.arrow.bottom{
	bottom: -12px;
}
.arrow.top{
	top: -104px;
}
.tipBox.main .arrow{
	color: #13CE66;
}
</style>
