<template>
    <div @input="result" id="editor">
    </div>
</template>
<script>
import WangEditor from 'wangeditor'
export default {
  props: ['content'],
  data () {
    return {
      editor: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#editor')
    // console.log(editor)
    editor.customConfig.menus = [
      'emoticon',
      'undo',  // 撤销
      'redo'  // 重复
    ]
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadFileName = 'file'
    editor.create()
    // 这里axios是异步获取 结果会慢于给content赋值 暂做一个定时器解决
    setTimeout(() => {
      // console.log(this.content)
      editor.txt.html(this.content)
    }, 500)
    this.editor = editor
  },
  methods: {
    result () {
      this.$emit('input', this.editor.txt.text())
    }
  }
}
</script>
<style>
#editor {
   
}
.w-e-toolbar{
  background-color: #fff!important;
}
.w-e-text {
    border-radius: 2px;
    overflow: hidden !important;
}
.w-e-text-container{
  height: 100px!important;
}
.w-e-droplist {
z-index: 10001;
}
</style>
