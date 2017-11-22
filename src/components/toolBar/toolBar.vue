<template>
 <div class="toolBar">
 	<div v-for="item in toolBar" :class="item.name" @click="open(item.notify)">
 		<div class="wrap">
 			<div class="icon">
 		        <i :class="'fa ' + item.icon"></i>
 		    </div>
 		    <div class="font text-success">{{ item.font }}</div>
 		</div>
 	</div>
	<transition name="el-zoom-in-center">
	<div class="backTop" v-show="top>screenHeight/4" v-scroll-to="'#app'">
		 <el-tooltip class="item" effect="dark" content="回到顶部" placement="left"><i class="el-icon-arrow-up"></i></el-tooltip>
	</div>
	</transition>
 </div>
</template>
<script type="text/javascript">
export default{
  props: ['top', 'screenHeight'],
  data () {
    return {
      toolBar: [{
        name: 'feedBack',
        icon: 'fa-bug',
        font: '意见反馈',
        notify: {
          title: '请联系我们',
          message: '📱  13356585475',
          type: 'success'
        }
      }, {
        name: 'phone',
        icon: 'fa-mobile',
        font: '联系我们',
        notify: {
          title: '正在开发中。。。',
          message: '敬请期待',
          type: 'warning'
        }
      }]
    }
  },
  mounted () {
  },
  methods: {
    open (opt) {
      this.$notify({
        title: opt.title,
        message: opt.message,
        type: opt.type
      })
    }
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
	.toolBar>div{
		width: 40px;
		height: 40px;
		position: relative;
		margin-bottom: 10px;
		text-align: center;
		border: 1px solid rgba(153,153,153,.5);
		overflow: hidden;
		transition: all 0.5s ease;
	}
	.toolBar>div .wrap{
		position: absolute;
		top: 0;
		left: 0;
		//transition: all 0.5s ease;
	}
	.toolBar>div i{
		font-size: 25px;
		line-height: 40px;
	}
	.toolBar>div .wrap .font{
		font-size: 14px;
	}
	.toolBar>div:hover{
		color: #13CE66;
		border-color: #13CE66;
	}
	.toolBar>div:hover .wrap{
		top: -40px;
	}
	.toolBar .backTop{
		border: none;
	}
	.toolBar .backTop:hover{
		color: #13CE66;
	}
	.toolBar .backTop i{
		font-size: 35px;
	}
</style>
