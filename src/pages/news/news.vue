<template>
<div class="news-box">
<div v-title>湘潭福盛全官网 - 新闻中心</div>
<div class="top-img">
  <img src="../../assets/top1.jpg" alt="">
</div>
<el-row :gutter="0"  type="flex" justify="space-around">
    <el-col :xs="24" :sm="24" :md="18" :lg="15">
<router-view></router-view>
</el-col>
</el-row>
</div>
</template>
<style type="text/css" scoped>
.news-box{
  width: 100%;
  transition: all 0.4s ease;
  background: #f4f4f4;
  }
</style>
