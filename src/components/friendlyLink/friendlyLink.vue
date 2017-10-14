<template>
<div class="friendlyLink">

<el-row :gutter="0">
  <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="(item, index) in linkList" :key="index"><a :href="item.url">
  <div class="box"><img :src="item.img" :title="item.title"></div></a></el-col>
</el-row>

</div>
</template>
<script type="text/javascript">
export default{
  data () {
    return {
      title: '友情链接',
      subtitle: 'lalalal',
      linkList: [{
        title: '百度百科',
        img: '/static/loading.gif',
        url: 'https://baike.baidu.com/'
      }, {
        title: 'vue',
        img: '/static/loading.gif',
        url: 'https://cn.vuejs.org/v2/'
      }, {
        title: 'element-ui',
        img: '/static/loading.gif',
        url: 'http://element.eleme.io/#/zh-CN/'
      }, {
        title: 'layui',
        img: '/static/loading.gif',
        url: 'http://www.layui.com/'
      }]
    }
  },
  mounted () {
    this.getLink()
  },
  methods: {
    getLink () {
      this.$fetch.link.get()
        .then((res) => {
          if (res.status) {
            this.linkList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => false
    }
  }

}
</script>
<style type="text/css" scoped>
	.friendlyLink{
		padding: 25px 0;
		text-align: center;
		margin:0 15%;
	}
	.el-row{
		margin-top: 50px;
	}
	.friendlyLink .box{
		width: 150px;
		height: 80px;
		margin: 10px auto;
		border: 1px solid #eee;
    cursor: pointer;
	}
	.friendlyLink .box:hover{
		border-color: #13CE66;
	}
</style>
