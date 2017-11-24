<template>
<div class="reply-box">
<div  @mouseover="show=true" @mouseleave="show=false">
<el-row type="flex" justify="space-around" class="freply">
  <el-col :span="1"><img class="userImg" :src="comment.author.img" alt=""></el-col>
  <el-col :span="15" class="main"><div class="header">
  	<span class="name text-success">{{comment.author.nick}}</span>
  	<span class="date">发表于  {{comment.date}}</span>
  </div>
  <div class="content">{{comment.content}}</div>
<div class="goods-comment" v-if="type==='goods'">
  <div class="comment-img">
    <img class="preview-img" v-for="(item, index) in comment.img" :src="item.src" title="点击放大" height="100" @click="$preview.open(index, comment.img, options)" :key="index">
  </div>
  <div class="goods-rate">
    <el-rate
  v-model="comment.rate"
  disabled
  show-score
  text-color="#ff9900"
  score-template=" {value}分">
</el-rate>
  </div>
</div>
  </el-col>
  <el-col :span="4" class="right">
  <div class="header floor">{{floor}}#</div>
  <div class="btn">
   <del-button class="del":id="comment.cid" v-if="uid===comment.author.uid" v-show="show" @del="delComment"></del-button>
  	<span class="love" @click="love" :class="{actived:comment.isLove===true}"><i class="fa fa-thumbs-o-up"></i> <span v-if="comment.love>0">{{comment.love}}人赞</span>
  	<span v-else>赞</span></span>
  	<el-button type="text" size="mini" @click="openReply(comment.cid, comment.author.nick)">回复</el-button>
  </div>
  </el-col>
</el-row>
</div>
<div class="sreplay" v-if="comment.reply.length>0" >
<div  @mouseover="show2=true" @mouseleave="show2=false">
<el-row  type="flex" justify="space-around" v-show="isOpen" v-for="item in comment.reply" :key="item.id">
  <el-col :span="1" class="left"></el-col>
  <el-col :span="15" style="padding-left:10px;"><div class="header">
  	<span class="name text-success"v-text="item.author.nick"></span>
  	<span class="date">发表于  {{item.date}}</span>
  </div>
  <div class="content"><span class="text-success">@{{item.call.nick}}</span>: <span>{{item.content}}</span></div>
  </el-col>
  <el-col :span="4" class="right">
  <div class="btn">
   <del-button class="del" :id="item.cid" v-if="uid===item.author.uid" v-show="show2" @del="delComment"></del-button>
  	<el-button type="text" size="mini" @click="openReply(item.cid, item.author.nick)">回复</el-button>
  </div>
  </el-col>
</el-row>
<el-row type="flex" class="open-btn-box" justify="space-around" >
  <el-col :span="1" class="left"></el-col>
  <el-col :span="15" style="padding-left:10px;"><div v-show="!isOpen" ><span class="text-success">{{comment.reply[0].author.nick}} </span>等{{comment.reply.length}}人回复了此评论</div></el-col>
  <el-col :span="4" class="right">
  <div class="btn">
    <el-button type="text" size="mini" @click="isOpen=!isOpen">{{lab}}</el-button>
  </div>
  </el-col>
</el-row>
</div>
</div>
</div>
</template>
<script>
import delButton from './delButton'
export default {
  props: {
    comment: {
      type: Object
    },
    floor: {
      type: Number
    },
    type: {
      type: String
    },
    uid: {
      type: Number
    }
  },
  data () {
    return {
      lab: '展开',
      isOpen: false,
      options: {
        bgOpacity: 0.8
      },
      // 展示父评论删除
      show: false,
      // 展示子评论删除
      show2: false,
      visible: false
    }
  },
  mounted () {
  },
  watch: {
    isOpen (val) {
      this.lab = val ? '收起' : '展开'
    }
  },
  methods: {
    doLove () {
      // 点赞
      this.comment.isLove = !this.comment.isLove
      if (this.comment.isLove) {
        this.comment.love ++
      } else {
        this.comment.love --
      }
    },
    delComment (cid) {
      let data = [{
        cid: cid
      }]
      this.$fetch.comment.del(data).then((res) => {
        if (!res.status) {
          this.$message.error(res.msg)
        } else {
          this.$emit('delSucess', res.status)
        }
        this.visible = false
      })
    },
    openReply (id, responder) {
      this.$emit('openReply', id, responder)
    },
    love () {
      if (this.$store.state.user.islogin) {
        this.$fetch.comment.love({
          cid: this.comment.cid
        }).then((res) => {
          if (!res.status) {
            this.$message.error(res.msg)
          } else {
            this.doLove()
          }
        })
      } else {
        this.$message('请先登录')
      }
    }
  },
  components: {
    delButton
  }
}
</script>
<style scoped>
  .reply-box{
    border-bottom:  1px solid #e6e6e6;
    padding: 20px;
    padding-bottom: 0;
  }
  .userImg{
  	width: 50px;
  	height: 50px;
  	border-radius: 50%;
  }
  .main{
    padding-left: 10px;
  }
  .content{
  	margin: 10px 0;
  }
  .goods-comment,.goods-comment .comment-img{
    margin-bottom: 10px;
  }
  .goods-comment .comment-img img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .header .date{
  	color: #8c8c8c;
  }
  .right{
  	position: relative;
  }
  .freply{
  	min-height: 80px;
  }
  .sreply{
  	height: 65px;
    padding: 5px 0;	
  	border-top:  1px dotted  #e6e6e6;
  }
  .open-btn-box{
    padding-bottom: 4px;
    color: #999;
  }
  .open-btn-box .btn{
    bottom: 0;
    top: 5px;
  }
  .floor{
  	position: absolute;
  	right: 10px;
  	color: #c3c3c3;
  }
  .btn{
  	position: absolute;
  	right: 10px;
  	bottom: 5px;
  	font-size: 12px;
  }
  .sreply .btn{
    bottom: -5px;
  }
  .btn .love,.btn .del{
  	margin-right: 10px;
  	cursor: pointer;
  }
  .btn .love.actived{
  	color: #13ce66;
  }
  .content{

  }
</style>
