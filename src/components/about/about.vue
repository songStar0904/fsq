<template>
	<div class="about">
		<img src="../../assets/background.jpg">
		<span class="cover"></span>
		<div class="txt-about">
		<h1 class="title">{{ title }}</h1>
		<p class="content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ content }}</p>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
  data () {
    return {
      title: '关于社会福利厂',
      content: '湖南省湘潭市社会福利厂有限公司创建于1986年（前身为湘潭市社会福利厂，于2015年改制），至今已有30年的历史。它位于湘潭市雨湖区，比邻火车站和长途汽车站，交通十分便利。该公司是湘潭市集生产、加工、销售劳动防护用品于一体的民政福利专业企业。目前拥有一栋3000平方米生产加工综合厂房和一个销售经营门店，从业人员86人。 公司具备存储劳动防护用品生产销售资质认证，拥有完善的质量监督和管理机制。主要产品有：全棉细帆布工作服，涤棉工作服，牛仔工作服，食品服，医务人员工作服，迷彩服，湘莲牌细口罩，电焊手套，脚套，工具袋，防尘帽，帆布手套等几百种。同时承接来料加工。产品销售国内外各地。'
    }
  }
}
</script>
<style type="text/css" scoped>
    .about{
		width: 100%;
        height: 400px;
        position: relative;
        color: #fff;
	}
	.about img{
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
	}
	.cover{
    position: absolute;
    display: inline-block;
    width: 100%;
    height:100%;
    background-color: rgba(0, 0, 0, .45);
    z-index: 1;
	}
	.about .txt-about{
		width:500px;
		position: absolute;
		right: 15%;
		top: 50px;
		z-index: 2;
	}
	.about .txt-about .title{
		text-align: center;
		margin-bottom: 25px;
	}
</style>
