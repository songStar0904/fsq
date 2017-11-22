<template>
  <div id="app">   
    <main-nav></main-nav>
    <router-view :style="{minHeight:(screenHeight-303)+'px'}"></router-view>
    <tool-bar :top="top" :screenHeight="screenHeight"></tool-bar>
    <footer-box></footer-box>

  </div>
</template>

<script>
import {mainNav, footerBox, toolBar} from './components'
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
    toolBar
  }
}
</script>
