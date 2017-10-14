<template>
	<div class="address">
	<address-box @chooseAddress="chooseAddress" :init="this.$store.state.cart.tCart.address.id"></address-box>
<el-input
  type="textarea"
  autosize
  placeholder="请输入备注(可为空)"
  v-model="remarks">
</el-input>
	</div>
</template>
<script>
import {addressBox} from '@/components/common'
export default{
  data () {
    return {
      remarks: ''
    }
  },
  watch: {
    remarks (val) {
      this.$store.commit('SET_TCART_REMARKS', this.remarks)
    }
  },
  mounted () {
  },
  methods: {
    chooseAddress (address) {
      this.$store.commit('SET_TCART_ADDRESS', address)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.addr.add(this.form)
            .then((res) => {
              if (res.status) {
                if (this.title === '添加地址') {
                  this.address.push(this.form)
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
    }
  },
  components: {
    addressBox
  }
}
</script>
<style scoped>
</style>
