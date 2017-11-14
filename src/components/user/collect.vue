<template>
  <div>
    <div class="panel-body">
      <el-table
        :data="collect"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          sortable>
        </el-table-column>
        <el-table-column
          label="商品图片">
           <template scope="props">
           <img style="height:60px;" :src="props.row.style.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="分类"
          sortable>
          <template scope="props" >
          <p>{{props.row.type.type_name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          sortable>
           <template scope="props" >
        <span style="color:#f60;">￥{{ props.row.sub.price }}.00 元</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收藏时间"
          prop="date"
          sortable>
           <template scope="props">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ props.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="props">
          <router-link :to="{ name: 'goodsItem', params: { id: props.row.gid }}">
              <el-button type="info" size="small"><i class="fa fa-credit-card-alt"></i></el-button>
              </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
      <div slot="handler">
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <el-button @click.stop="refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      </div>
        <div slot="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {bottomToolBar} from '@/components/common'

  export default{
    data () {
      return {
        collect: [],
        // 当前页码
        currentPage: 1,
        // 数据总条目
        total: 0,
        // 每页显示多少条数据
        length: 5,
        // 请求时的loading效果
        load_data: false,
        // 批量选择数组
        batch_select: []
      }
    },
    components: {
      bottomToolBar
    },
    created () {
      this.get_table_data()
    },
    methods: {
      // 获取数据
      get_table_data () {
        this.load_data = true
        // console.log(this.$fetch)
        this.$fetch.collect.get({
          page: this.currentPage,
          length: this.length
        })
          .then((res) => {
            // console.log(res)
            this.collect = res.data
            this.total = res.total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      // 刷新
      refresh () {
        this.get_table_data()
      },
      // 单个删除
      delete_data (item) {
        // 后台哥哥硬要我加个数组
        let data = []
        data[0] = item
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.collect.handle(data)
              .then((res) => {
                console.log(res)
                if (res.status) {
                  this.get_table_data()
                  this.$message.success(res.msg)
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(() => {
                this.load_data = false
              })
          })
          .catch(() => {
          })
      },
      // 页码选择
      handleCurrentChange (val) {
        this.currentPage = val
        this.get_table_data()
      },
      // 页码长度
      handleSizeChange (val) {
        this.length = val
        this.get_table_data()
      },
      // 批量选择
      on_batch_select (val) {
        this.batch_select = val
      },
      // 批量删除
      on_batch_del () {
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.collect.handle(this.batch_select)
              .then((res) => {
                this.load_data = false
                if (res.status) {
                  this.$message.success(res.msg)
                  this.get_table_data()
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(() => {
                this.load_data = false
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
