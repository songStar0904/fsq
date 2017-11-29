<template>
	<div class="comment" ref="comment">
  <div class="coment-header" slot="handler">
      <span class="new-comment" @click="current=1" :class="{actived:current===1}">最新评论</span>
      |
      <span class="hot-comment" @click="current=2"  :class="{actived:current===2}">最热评论</span>
    </div>
		<reply-box v-loading="loading"
    element-loading-text="拼命加载中" v-if="data.length>0" v-for="(item, index) in data" :uid="userInfo.uid":comment="item" :key="index" @openReply="openReply" :floor="data.length-index+(length*(currentPage-1))" :type="type"
    @delSucess="delSucess"></reply-box>
    <div v-if="data.length==0" class="sofa">{{noDataTitle}}</div>
    <div class="editor" v-show="commentShow">
      <el-input
        type="textarea"
        placeholder="说说你的看法"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="form.content"></el-input>
        <div class="btn">
        <el-button type="primary" @click="onSubmit">发送</el-button> <el-button type="text" @click="canel">取消</el-button>
        </div>
        </div>
        <bottom-tool-bar>
        <div slot="page" v-if="total>length">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="length"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
	</div>
</template>
<script>
import {replyBox, bottomToolBar} from '@/components/common'
export default {
  props: ['id', 'noDataTitle', 'change', 'show', 'type'],
  data () {
    return {
      data: [],
      comment: [],
      current: 1,
      total: 0,
      currentPage: 1,
      length: 8,
      form: {
        nick: '',
        content: '',
        nid: this.$route.params.id,
        fid: 0,
        uid: ''
      },
      loading: false,
      userImg: 'http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/1164593408/avatar.jpg?&width=50&height=50',
      content: '',
      scroll: 0,
      commentShow: false
    }
  },
  watch: {
    current (val) {
      if (val === 1) {
        this.data = this.newComment
      } else {
        this.data = this.hotComment
      }
    },
    userInfo (val) {
      if (val) {
        this.form.uid = val.uid
        this.form.nick = val.nick
        this.userImg = val.img
      } else {
        this.form.uid = ''
        this.form.nick = ''
        this.userImg = 'http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/1164593408/avatar.jpg?&width=50&height=50'
      }
    },
    comment (val) {
      this.data = this.newComment
    },
    change (val) {
      this.getComment()
    },
    show (val) {
      this.commentShow = val
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    getComment () {
      this.loading = true
      let data
      if (this.type === 'goods') {
        data = {gid: this.$route.query.id, page: this.currentPage, length: this.length}
      } else {
        data = {nid: this.$route.query.id, page: this.currentPage, length: this.length}
      }
      console.log(data)
      this.$fetch.comment.get(data).then((res) => {
        this.loading = false
        if (res.status) {
          this.comment = res.data
          this.total = res.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除成功的消息
    delSucess () {
      this.getComment()
    },
    onSubmit () {
      this.$emit('onSubmit', this.form)
    },
    openReply (id, responder) {
      console.log(id, responder)
      this.form.fid = id
      this.$message('@' + responder + ':')
      // this.form.responder = responder
      this.commentShow = true
    },
    // 取消
    canel () {
      this.commentShow = false
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getComment()
      this.$scrollTo('.coment-header')
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    newComment () {
      return this.comment.sort((a, b) => {
        return a.date - b.date
      })
    },
    hotComment () {
      return this.comment.sort((a, b) => {
        return a.love - b.love
      })
    }
  },
  components: {
    replyBox,
    bottomToolBar
  }
}
</script>
<style scoped>
  .comment{
  	padding: 50px 20px;
    background-color: #fff;
  }
  .comment .coment-header{
  	margin-bottom: 20px;
  }
  .comment .coment-header .actived{
  	color: #13ce66;
  	font-size: 18px;
  }
  .new-comment, .hot-comment{
  	cursor: pointer;
  }
  .editor{
    width: 100%;
    display: inline-block;
    margin-top: 20px;
  }
  .editor .btn{
    display: inline-block;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
  }
</style>
