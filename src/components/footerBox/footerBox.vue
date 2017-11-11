<template>
    <footer class="bg-success">
    <div class="footer">
<el-row :gutter="20">
  <el-col :xs="24" :sm="12" :md="12" :lg="12">
    <ul class="footer-link">
      <li v-for="item in link" v-text="item.title"></li>
    </ul>
    <div class="copy-right" v-text="title"></div>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="12" class="footer-right">
  <a href="tencent://message/?uin=173858731&Site=&Menu=yes"><i class="fa fa-qq"></i></a>
   <i class="fa fa-wechat" @mouseover="show=true" @mouseout="show=false">
        <transition name="custom-classes-transition"
    enter-active-class="animated flipInY"
    leave-active-class="animated flipOutY">
    <div class="qr" v-show="show">
  <img src="../../assets/wechat.png" alt="" class="qr-img" >
  <p>扫一扫，关注微信</p>
  </div>
  </transition>
   </i>
   <i class="fa fa-weibo"></i>
  </el-col>
</el-row>
</div>
    </footer>
</template>
<script type="text/javascript">
export default{
  data () {
    return {
      title: 'Copyright © 2017 xtfsq.com All Rights Reserved | 湘ICP备17018205号-1',
      show: false,
      link: [{
        title: '网站首页',
        href: '/'
      }, {
        title: '联系我们',
        href: '/'
      }, {
        title: '友情链接',
        href: '/'
      }, {
        title: '留言反馈',
        href: '/'
      }]
    }
  }
}
</script>
<style type="text/css" scoped>
footer{
  padding: 27px 0;
  font-size: 14px;
  background-color: rgb(230, 245, 240);
  color: rgba(72, 106, 92, 0.8);
  border-top: 1px solid #e2e4e6;
}
.footer{
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}
.footer .footer-link{
  display: block;
  height: 21px;
  margin-bottom: 15px;
}
.footer .footer-link li{
  float: left;
  margin-right: 16px;
  cursor: pointer;
}
.footer .footer-link li:hover{
  color: rgba(72, 106, 92, 1);
}
.footer .footer-right{
  text-align: center;
  margin-top: 20px;
}
.footer .footer-right .fa{
  font-size: 32px;
  color: rgba(72, 106, 92, 0.8);
  margin-right: 20px;
  cursor: pointer;
}
.footer .footer-right .fa:hover{
  color: #13CE66;
}
.footer .footer-right .fa.fa-wechat{
  position: relative;
}
.footer .footer-right .qr{
  position: absolute;
  width: 100px;
  height: 112px;
  top: -148px;
  left: -50%;
  margin-left: -22px;
  padding: 10px;
  background-color: #fff;
  text-align: center;
  box-shadow: 2px 1px 25px rgba(0,0,0,0.4);
  z-index: 100001;
}
.footer .footer-right .qr:after{
  content: '';
  border: 10px solid transparent;
  border-top: 10px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 132px;
  left: 50%;
  margin-left: -12px;

}
.footer .footer-right .qr p{
  font-size: 12px;
  color: black;
  margin: 0;
}
.footer .footer-right .qr .qr-img{
  height: 100px;
}
</style>
