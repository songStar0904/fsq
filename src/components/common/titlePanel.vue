<template>
<div class="panel">
	<h1 class="text-success"  v-if="title" v-text="title"></h1>
<span class="my-line"></span>
<p class="subtitle" v-if="subtitle" v-text="subtitle"></p>
</div>
</template>
<script type="text/javascript">
export default{
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  }
}
</script>
<style type="text/css" scoped>
.panel{
	margin: 30px 0;
}
.panel h1{
  margin-bottom: 0px;
}
.my-line{
  display: inline-block;
  width: 50px;
  height: 4px;
  border-bottom: 2px solid #13CE66;
  transition: width 0.5s ease;
}
.my-line:hover{
  width: 200px;
}
.subtitle{
	font-size: 16px;
	color: #666;
	margin-top: 10px;
}
</style>
