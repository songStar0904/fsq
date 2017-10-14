<template>
<transition name="custom-classes-transition"
    enter-active-class="animated fadeInUpBig"
    >
<div class="panel">
	<h1 class="text-success"  v-if="title" v-text="title"></h1>
<span class="my-line"></span>
<p class="subtitle" v-if="subtitle" v-text="subtitle"></p>
</div>
</transition>
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
