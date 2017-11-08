<template>
<div class="about-us">
<div v-title>湘潭福盛全官网 - 关于我们</div>
<div class="top-img">
  <img src="../../assets/top3.jpg" alt="">
</div>
<div class="aboutBox panel-box">
<transition name="el-zoom-in-center">
<title-panel :title="aboutTitle" :subtitle="aboutSubtitle"></title-panel>
</transition>
<about-box></about-box>
</div>
<div class="msgBox panel-box">
<transition name="el-zoom-in-center">
<title-panel :title="msgTitle" :subtitle="msgSubtitle"></title-panel>
</transition>
<leave-message></leave-message>
</div>
</div>
</template>
<script type="text/javascript">
import {titlePanel, aboutBox, leaveMessage} from '@/components'
export default{
  name: 'aboutUs',
  data () {
    return {
      aboutTitle: '关于我们',
      aboutSubtitle: '知我，懂我',
      msgTitle: '联系我们',
      msgSubtitle: ''
    }
  },
  components: {
    aboutBox,
    leaveMessage,
    titlePanel
  }
}
</script>
<style type="text/css" scoped>
	.about-us{
		text-align: center;
	}
	.panel-box{
		padding: 25px 0;
	}
</style>
