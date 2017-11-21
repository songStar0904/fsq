<template>
	<div class="news-item">
  <div v-title>湘潭福盛全官网 - {{news.title}}</div>
	<div class="news-box">
	<h2 class="news-name text-success">{{news.title}}</h2>
	<div class="author"><img :src="author.img" alt=""><div class="name">{{author.nick}}</div></div>
	<div class="header">
	<el-row type="flex" class="row-bg" justify="space-between">
	 <el-col :span="6">
		<div class="date"><i class="el-icon-time"></i>&nbsp;&nbsp;{{news.date}}</div>
		</el-col>
		 <el-col :span="6">
		<div class="msg-box">
  	<i class="fa fa-eye">&nbsp;&nbsp;<span>{{news.view}}</span></i>
  	<i class="fa fa-heart-o">&nbsp;&nbsp;<span>{{news.love}}</span></i>
  	<i class="fa fa-commenting-o">&nbsp;&nbsp;<span>{{news.comment}}</span></i>
  </div>
  </el-col>
  </el-row>
	</div>
	<div class="content" v-html="news.content"></div>
	<div class="reply">
	<el-row type="flex" justify="space-around">
  <el-col :span="2"><img  v-if="this.$store.state.user.userInfo.img" :src="this.$store.state.user.userInfo.img" class="userImg"alt="">
<img  v-else src="http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/1164593408/avatar.jpg?&width=50&height=50" class="userImg"alt="">
  </el-col>
  <el-col :span="13"><el-input v-model="form.content" @focus="form.fid=0"placeholder="说说你的看法"></el-input></el-col>
  <el-col :span="4"><el-button type="primary" @click="onSubmit">发 表</el-button></el-col>
</el-row>
</div>
	</div>
	<comment-box :id="news.id" :noDataTitle="noDataTitle" :change="change" :show="show" :cContent="cContent" @onSubmit="onSubmit"></comment-box>
	</div>
</template>
<script>
import {commentBox} from '@/components'
export default{
  data () {
    return {
      author: {
        nick: '官方号',
        img: 'http://img.petshow.cc/pet_show/2015_03/9c888d6a1d4f676dd6ca77599e353a52.jpg'
      },
      news: {
        title: '限量福利 | 如果送一部小米5X，你最想要的颜色是___?',
        date: '2017-7-23',
        love: 23,
        view: 135,
        comment: 2,
        content: '眼看又要到周末啦！本周社区君的福利，给大家带来点不一样的“特！供！礼！物！”是什么呢？是什么呢？先来卖个关子，一会儿再说~距离7月26日，小米5X 和 MIUI 9 发布，倒计时还有 6 天，铺天盖地的都在传小米5X真机曝光的事儿，索性一不做二不休，先上几张小米5X真机图给大家解解馋！小米5X 变焦双摄，拍人更美！哪一款颜色最让你心动呢7月27日前，参与本次投票，选出你最稀罕的颜色，并说说你的理由！就有机会获得...小米手机品牌代言人 吴亦凡星座签名照 一套！（共七套）'
      },
      form: {
        nick: '',
        content: '',
        nid: this.$route.params.id,
        fid: 0,
        uid: ''
      },
      userImg: this.$store.state.user.userInfo.img,
      content: '',
      noDataTitle: '暂无评论，还不快抢沙发╮(╯▽╰)╭',
      // 是否展示评论框
      show: false,
      cContent: '',
      // 检测发送，发送一次加1
      change: 0
    }
  },
  watch: {
    userInfo (val) {
      if (val) {
        this.form.uid = val.uid
        this.form.nick = val.nick
        this.userImg = val.img
      }
    }
  },
  created () {
    this.getNews()
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    onSubmit (value) {
      let data
      if (value.uid) {
        data = value
      } else {
        data = this.form
      }
      if (this.$store.state.user.islogin) {
        if (data.content === '') {
          this.$message.error('回复内容不能为空')
        } else {
          // 发送
          this.$fetch.comment.send(data)
            .then((res) => {
              if (res.status) {
                this.form.content = ''
                this.cContent = ''
                this.change ++
                this.show = false
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
        }
      } else {
        this.$message('请先登录')
      }
    },
    getNews () {
      this.$fetch.news.get({
        id: this.$route.query.id
      }).then((res) => {
        if (res.status) {
          this.news = res.data[0]
          this.author = res.data[0].author
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    commentBox
  }
}
</script>
<style scoped>
  .news-box{
    padding: 50px 20px;
    background-color: #fff;
    border-bottom:1px solid #e6e6e6;
  }
  .news-box .author{
  	margin-top: 20px;
  	line-height: 50px;
  }
  .news-box .author img{
  	width: 50px;
  	height: 50px;
  	border-radius: 50%;
  	margin-right: 20px;
  	float: left;
  }
  .news-box .header{
  	color: #999;
  	border-bottom:1px solid #e6e6e6;
  	padding: 10px 0;
  }
  .news-box .header .msg-box{
    float: right;
  }
  .news-box .content{
  	padding: 30px 0;
  	border-bottom:1px solid #e6e6e6;
  }
  .news-box .content p{
    line-height: 28px;
    margin-top: 5px;
  }
  .news-box .reply{
  	margin-top: 40px;
  }
  .news-box .reply .el-col{
    line-height: 50px;
  }
  .news-box .reply .el-button{
  	    width: 100%;
  }
  .news-box .reply .userImg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
