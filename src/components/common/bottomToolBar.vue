<template>
  <div class="bottom-toolbar ofh">
    <el-row>
      <el-col :span="24">
        <div class="fl">
          <slot name="handler"></slot>
        </div>
        <div class="fr">
          <slot name="page"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
	.ofh{
		max-width: 1000px;
		padding: 20px 0;
		background-color: #fff;
		margin: 0 auto;
	}
  .fl{
    float: left;
    line-height: 36px;
  }
  .fr{
    float: right;
  }
</style>
