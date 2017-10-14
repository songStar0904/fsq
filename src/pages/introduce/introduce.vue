<template>
<div class="introduce">
<div v-title>福盛全官网 - 公司简介</div>
<div class="top-img">
  <img src="../../assets/top1.jpg" alt="">
</div>
<el-row type="flex" justify="center">
  <el-col :xs="24" :sm="24" :md="18" :lg="16">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="公司概括" name="main">
    <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeInUp"
  >
    <simple-introduce :active="activeName"></simple-introduce>
    </transition>
    </el-tab-pane>
    <el-tab-pane label="公司荣誉" name="honor">
    <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeInUp"
  >
    <honor-box :active="activeName"></honor-box>
    </transition>
    </el-tab-pane>
    <el-tab-pane label="公司文化" name="culture">
    <culture-box :active="activeName"></culture-box>
    </el-tab-pane>
    <el-tab-pane label="公司相册" name="photo">
      <photo-box :active="activeName"></photo-box>
    </el-tab-pane>
  </el-tabs>
  </el-col>
  </el-row>
  </div>
</template>
<script>
  import {simpleIntroduce, honorBox, cultureBox, photoBox} from '@/components'
  export default {
    data () {
      return {
        activeName: this.$route.params.active
      }
    },
    watch: {
      '$route': 'setActive'
    },
    methods: {
      handleClick (tab, event) {
        this.$router.push({name: 'introduce', params: { active: tab.name }})
        // console.log(tab, event)
      },
      setActive () {
        this.activeName = this.$route.params.active
      }
    },
    components: {
      simpleIntroduce,
      honorBox,
      cultureBox,
      photoBox
    }
  }
</script>
