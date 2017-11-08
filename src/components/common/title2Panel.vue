<template>
<section class="panel">
<h1 class="text-success title"  v-if="title" v-text="title"></h1>
<span class="line left"></span>
<span class="subtitle" v-if="subtitle" v-text="subtitle"></span>
<span class="line right"></span>

</section>
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
	margin: 50px 0;
}
.title{
	margin-bottom: 10px;
}
.subtitle{
	font-size: 16px;
	color: rgba(72, 106, 92, 1);
	margin: 0 10px;
}
.line{
	display: inline-block;
	width: 100px;
	height: 5px;
	border-top: 1px solid rgb(131, 165, 151);
}
</style>
