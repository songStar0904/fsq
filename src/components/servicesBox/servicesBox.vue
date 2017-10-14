<template>
<el-row :gutter="0">
  <el-col  :xs="24" :sm="12" :md="6" :lg="6" v-for="item in servicesList" :key="item.title">
  <transition name="el-zoom-in-center">
  <div class="box" v-show="transitionIn"><i :class="[item.color,item.icon]"></i><p>{{ item.title }}</p></div> 
  </transition>
  </el-col>
</el-row>

</template>
<script>
export default {
  name: 'servicesBox',
  data () {
    return {
      msg: 'this is servicesBox！',
      servicesList: [{
        title: '微笑服务，微笑工作',
        icon: 'fa fa-smile-o',
        color: 'text-warning'
      }, {
        title: '准时准点，事半功倍',
        icon: 'fa fa-clock-o',
        color: 'text-blue'
      }, {
        title: '团结互助，共同发展',
        icon: 'fa fa-sitemap',
        color: 'text-success'
      }, {
        title: '热心公益，回报社会',
        icon: 'el-icon-share',
        color: 'text-danger'
      }],
      transitionIn: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.transitionIn = true
    }, 1000)
  },
  methods: {
  }
}
</script>
<style scoped>
.box{
  padding: 50px;
  opacity: 0.7;
  text-align: center;
  transition: all .5s ease;
  cursor: pointer;
}
.box i{
  font-size: 80px;
  margin-bottom: 20px;
}
.box:hover{
  opacity: 1;
}
</style>
