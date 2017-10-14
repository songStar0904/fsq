<template>
	<div class="address">
	<el-row :gutter="20">
	<el-col :span="8" v-for="(item,index) in filterAddress" :key="item.id">
		<div  class="box-card clearfix"  @click="current = index" :class="{checked:current===index}" >
        <div class="heard">
        	<div class="name">{{item.name}}</div>
        	<div class="edit"v-show="current===index" @click="editAddress(index, item)"><i class="el-icon-edit"></i></div>
        </div>
        <div class="content">{{item.addr}}</div>
        <div class="footer">
        	<div class="set" ><span class="default" v-if="item.default">默认地址</span>
        	<span v-else @click="setDefault(index, item.id)">设为默认</span></div>
        	<div class="phone"><i class="fa fa-phone"></i> {{item.phone}}</div>
        	<div class="del" v-show="current===index" @click="delAddress(index, item.id)">
        	<i class="el-icon-delete2"></i>
        	</div>
        </div>
</div>
</el-col>
<el-col :span="8">
<div  class="box-card" @click="addAddress">
	<div class="add"><i class="el-icon-plus"></i></div>
	<div class="title">添加新地址</div>
</div>
</el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12" :offset="10"><el-button class="more" type="text" @click="more">{{btnTitle}}  <i class="fa fa-angle-down" :class="{scale:down}"></i></el-button></el-col>
</el-row>
<el-dialog  :title="title" ref="form" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="收货人:" label-width="100px" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机:" label-width="100px" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="收货地址:" label-width="100px" prop="addr">
      <el-input v-model="form.addr"></el-input>
    </el-form-item>
    <el-form-item style="float:right">
    <el-button type="primary" @click="submitForm('form')">提  交</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
	</div>
</template>
<script>
export default{
  props: ['init'],
  data () {
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      address: [],
      show: false,
      current: null,
      limitNum: 3,
      length: 3,
      // 箭头是否朝下
      down: true,
      title: '添加地址',
      dialogFormVisible: false,
      // 填写地址表单
      editForm: {
        name: '',
        phone: '',
        addr: '',
        default: 0,
        id: 0
      },
      addForm: {
        name: '',
        phone: '',
        addr: '',
        default: 0
      },
      form: {},
      btnTitle: '展开',
      rules: {
        name: [
          { required: true, message: '请输入收货人', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        addr: { required: true, message: '请输入地址', trigger: 'change' },
        phone: { validator: checkPhone, trigger: 'change' }
      }
    }
  },
  watch: {
    current (val) {
      // console.log(this.address[val])
      this.$emit('chooseAddress', this.address[val])
      // this.$store.commit('SET_TCART_ADDRESS', this.address[val])
    }
  },
  computed: {
    filterAddress () {
      let temp
      if (this.address.length > 0) {
        for (let i = 0; i < this.address.length; i++) {
          if (this.address[i].id === this.init && this.init) {
            this.current = i
          }
          if (this.address[i].default === 1) {
            temp = this.address[i]
            this.address.splice(i, 1)
            this.address.unshift(temp)
            // break
          }
        }
      }
      return this.address.slice(0, this.limitNum)
    }
  },
  mounted () {
    this.getAddr()
  },
  methods: {
    getAddr () {
      this.$fetch.addr.get()
        .then((res) => {
          if (res.status) {
            if (res.address.length > 0) {
                 // 设置初始化默认地址
              res.address.forEach((item, index) => {
                if (item.default === 1) {
                  this.current = index
                }
              })
            }
            this.address = res.address
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    setDefault (index, id) {
      console.log(index, id)
      this.$fetch.addr.setDefault({
        id: id
      }).then((res) => {
        if (res.status) {
          this.address.forEach((item, index) => {
            if (id === item.id) {
              item.default = 1
            } else {
              item.default = 0
            }
          })
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addAddress () {
      this.dialogFormVisible = true
      this.form = this.addForm
      this.title = '添加地址'
    },
    editAddress (index, item) {
      this.dialogFormVisible = true
      this.editForm = item
      this.form = this.editForm
      this.title = '修改地址'
    },
    delAddress (index, id) {
      this.$confirm('此操作将永久删除此地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        this.$fetch.addr.del({
          id: id
        }).then((res) => {
          if (res.status) {
            this.$message.success(res.msg)
            this.address.splice(index, 1)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.addr.add(this.form)
            .then((res) => {
              if (res.status) {
                if (this.title === '添加地址') {
                  this.address.push(res.data)
                  // this.$refs['form'].resetFields()
                }
                this.$message.success(res.msg)
              }
            })
          this.dialogFormVisible = false
        } else {
          this.$message.error('请填写正确的表单')
          return false
        }
      })
    },
    more () {
      console.log(this.address.length)
      if (this.limitNum === this.address.length) {
        this.limitNum = this.length
        this.btnTitle = '展开'
        this.down = true
      } else {
        this.limitNum = this.address.length
        this.btnTitle = '收起'
        this.down = false
      }
    }
  }
}
</script>
<style scoped>
    .box-card{
		padding: 20px;
		border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
		position: relative;
		color: #333;
		font-size: 14px;
		background-color: #fff;
		//cursor: pointer;
		margin-bottom: 30px;

	}
	.box-card:hover{
		border-color: #13ce66;
	}
	.box-card.checked{
		border-color: #13ce66;
	}
	.name{
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
	}
	.edit,.del{
		position: absolute;
		right: 20px;
	}
	.edit{
		top: 20px;
	}
	.del{
		bottom: 20px;
	}
	.content{
		margin: 20px 0;
	}
	.set{
		height: 19px;
		cursor: pointer;
	}
	.set:hover{
		color: #13ce66;
	}
	.default{
		color: #13ce66;
	}
	.title{
		text-align: center;
		margin-bottom: 22px;
	}
	.add{
		text-align: center;
		font-size: 30px;
		margin:20px 0;
		cursor: pointer;
	}
	.more{
		width: 130px;
		font-size: 16px;
	}
	.more i{
	  transition: all .3s ease;
	}
	.more .scale{
		transform:rotate(180deg);
	}
</style>
