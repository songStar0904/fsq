<template>
 <div class="order">
 <div class="nav">
 	<div class="nav-left">
 		<span class="nav-item" @click="type=0" :class="{actived:type===0}">全部订单</span>
 		<span class="nav-item" @click="type=-1" :class="{actived:type===-1}">未付款</span>
 		<span class="nav-item" @click="type=1" :class="{actived:type===1}">已付款</span>
    <span class="nav-item" @click="type=3" :class="{actived:type===3}">待评论</span>
    <span class="nav-item" @click="type=4" :class="{actived:type===4}">已完成</span>
 	</div>
 	<div class="nav-right">
 		<el-input
  placeholder="输入商品名称,订单号"
  icon="search"
  v-model="search"
  :on-icon-click="handleIconClick">
</el-input>
 	</div>
 </div>
 <div v-if="order.length>0">
 	<order-item v-for="item in order" :key="item.id" :order="item" @delOrder="delOrder" @comment="comment"></order-item>
 	 <bottom-tool-bar>
    <div slot="handler">
    </div>
    <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next, jumper"
            :total="total"
            >
          </el-pagination>
        </div>
      </bottom-tool-bar>
 </div>
 <div v-else class="no-order">{{noOrder}}</div>
<el-dialog title="评价商品" :visible.sync="commentDialog">
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item>
    <div class="goods-img" style="width:80px;height:80px;">
      <img :src="form.goods.img" alt="">
      </div>
      <span class="goods-name">{{form.goods.gname}}</span>
    </el-form-item>
    <el-form-item label="评价:" prop="rate">
    <el-rate
    v-model="form.rate"
    show-text
    style="margin-top: 8px;"
    :texts="texts">
     </el-rate>
     </el-form-item>
     <el-form-item prop="content">
     <el-input
  type="textarea"
  :rows="2"
  placeholder="说说你的看法吧"
  v-model="form.content">
</el-input>
</el-form-item>
     <el-form-item label="">
           <el-upload
  class="upload-demo"
  action="/api/tm/ifile/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  :file-list="form.img"
  :data="params"
  :before-upload="beforeAvatarUpload"
  list-type="picture-card">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
</el-upload>
</el-form-item>
<el-form-item style="float:right;">
  <el-button @click="commentDialog = false">取 消</el-button>
    <el-button type="primary" @click="evaluate('ruleForm')">确 定</el-button>
</el-form-item>
  </el-form>
</el-dialog>
<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
 </div>
</template>
<script>
import {orderItem, bottomToolBar} from '@/components/common'
export default{
  data () {
    return {
      order: [],
      noOrder: '您还未有订单记录,赶紧行动吧(ง •_•)ง',
      // 当前页码
      currentPage: 1,
      // 数据总条目
      total: 0,
      // 每页显示多少条数据
      length: 3,
      type: 0,
      search: '',
      form: {
        goods: [],
        img: [],
        content: '',
        rate: 0,
        cid: 0
      },
      dialogVisible: false,
      commentDialog: false,
      dialogImageUrl: '',
      params: {
        id: 0,
        type: 'comment'
      },
      rules: {
        content: [
          { required: true, message: '请填写评论', trigger: 'change' }
        ],
        rate: [
          { type: 'number', required: true, message: '请进行评分', trigger: 'change' }
        ]
      },
      texts: ['1分', '2分', '3分', '4分', '5分']
    }
  },
  watch: {
    type (val) {
      this.currentPage = 1
      this.getOrder()
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.$fetch.order.get({
        page: this.currentPage,
        length: this.length,
        type: this.type,
        str: this.search
      })
        .then((res) => {
          if (res.status) {
            this.order = res.data
            this.total = res.total
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 删除操作完成后执行
    delOrder (val) {
      if (val) {
        this.getOrder()
      }
    },
    // 评价
    comment (id, item) {
      // console.log(id, item)
      this.$fetch.comment.cnew({
        oiid: item.oiid
      })
        .then((res) => {
          this.params.id = res.id
          this.form.cid = res.id
          this.commentDialog = true
          this.form.goods = item
        })
    },
    evaluate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.comment.send(this.form)
            .then((res) => {
              if (res.status) {
                this.getOrder()
                this.commentDialog = false
                this.$message.success('感谢您的评价')
              } else {
                this.$message.error(res.msg)
              }
            })
        } else {
          this.$message.error('请填写正确表单')
          return false
        }
      })
    },
    // 搜索
    handleIconClick (ev) {
      this.getOrder()
    },
    // 页码选择
    handleCurrentChange (val) {
      this.currentPage = val
      this.getOrder()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.$fetch.upload.del({
        url: file.url,
        id: this.params.id
      }).then((res) => {
        if (res.status) {
          this.$message.success(res.msg)
          this.form.img = fileList
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('访问失败')
      })
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传成功时，添加img数列
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      let newImg = {
        name: file.name,
        url: response.info.url // file.url
      }
      this.form.img.push(newImg)
    },
    // 设置上传要求
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
    }
  },
  components: {
    orderItem,
    bottomToolBar
  }
}
</script>
<style scoped>
	.order .no-order{
	  padding: 150px 0;
	  font-size: 30px;
	  text-align: center;
	}
	.nav{
		width: 100%;
		display: inline-block;
		margin-bottom: 20px;
	}
	.nav .nav-left{
		float: left;
		line-height: 36px;
	}
	.nav .nav-left .nav-item.actived{
		color: #13ce66;
	}
	.nav .nav-left .nav-item{
		margin-left: 10px;
		cursor: pointer;
	}
	.nav .nav-right{
		float: right;
	}
</style>
