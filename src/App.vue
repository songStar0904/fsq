<template>
  <div id="app">   
    <main-nav></main-nav>
    <router-view :top="top"></router-view>
    <transition
    name="custom-classes-transition"
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"
  >
    <back-top :top="top" v-show="top>screenHeight/4" v-scroll-to="'#app'"></back-top>
    </transition>
    <footer-box></footer-box>

  </div>
</template>

<script>
import {mainNav, footerBox, backTop} from './components'
export default {
  name: 'app',
  data () {
    return {
      msg: 'this is app',
      top: 0,
      screenHeight: document.documentElement.clientHeight
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setTop)
  },
  methods: {
    setTop () {
      this.top = document.documentElement.scrollTop
    }
  },
  components: {
    mainNav,
    footerBox,
    backTop
  }
}
</script>
<style lang="css" type="text/css" rel="stylesheet/css">
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  * {
  word-break: break-all;
  word-wrap: break-word;
  padding: 0;
  margin: 0;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body{
    position: relative;
    min-height: 100vh;
    font-family: "", Arial;
  }
 
   .panel-box{
    text-align: center;
   }
   .text-orange{
    color:#f60;
   }
   ol, ul, li {
    list-style-type: none;
    list-style: none;
  }
</style>
