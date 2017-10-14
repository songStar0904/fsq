<template>
 <div class="toolBar">
  <transition name="el-zoom-in-center">
  <div class="toolBar">
		 <el-tooltip class="item" effect="dark" content="回到顶部" placement="left"><i class="fa fa-chevron-circle-up"></i></el-tooltip>
	</div>
	 </transition>
	 </div>
</template>
<script type="text/javascript">
export default{
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
	.toolBar{
		position: fixed;
		right: 5%;
		bottom: 5%;
		color: rgba(153,153,153,.5);
		cursor: pointer;
		transition: all .3s ease;
        z-index: 100001;
	}
	.toolBar div:hover{
		color: #13CE66;
	}
	.toolBar i{
		font-size: 50px;
	}
</style>
