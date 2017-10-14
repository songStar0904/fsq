<template>
  <div class="photo-wrap">
  <div class="closeBtn">
  <slot name="close"></slot>
  </div>
  <div class="refresh"><i class="fa fa-refresh fa-lg" @click="shuffle" :class="{'fa-spin':spin}" @mouseover="spin=true"@mouseout="spin=false"></i></div>
  <div class="photoBox" :style="{top:randomY[index]+'px', left:randomX[index]+'px', zIndex:photo.img.length-index, transform: 'rotate('+randomZ[index]+'deg)'}"v-for="(item, index) in photo.img" @mouseover="zIndex=index" @mouseout="zIndex=0" :class="{zIndex:zIndex==index}"><img :src="item.src" :title="item.title" alt="" @click="$preview.open(index, photo.img, options)" :key="index"></div></div>
</template>
<script>
export default{
  props: {
    photo: {
      type: Object
    }
  },
  data () {
    return {
      randomX: [],
      randomY: [],
      randomZ: [],
      zIndex: 0,
      options: {
        bgOpacity: 0.8
      },
      spin: false
    }
  },
  created () {
    this.random()
  },
  methods: {
    random () {
      this.photo.img.forEach((e, i) => {
        let randomX = Math.random()
        let randomY = Math.random()
        let maxR = 45
        let minR = -45
        let rotRandomD = Math.random() * (maxR - minR) + minR
        let rotRandomR = rotRandomD * Math.PI / 180
        let rotatedW = Math.abs(250 * Math.cos(rotRandomR)) + Math.abs(150 * Math.sin(rotRandomR))
        let rotatedH = Math.abs(250 * Math.sin(rotRandomR)) + Math.abs(150 * Math.cos(rotRandomR))
        let x = Math.floor((727 - rotatedW) * randomX)
        let y = Math.floor((500 - rotatedH) * randomY)
        this.randomX.splice(i, 1, x)
        this.randomY.splice(i, 1, y)
        this.randomZ.splice(i, 1, rotRandomD)
        // console.log(this.randomX[i])
      })
    },
    shuffle () {
      this.random()
    }
  }
}
</script>
<style scoped>
    .photo-wrap{
      margin: 20px;
      height: 500px;
      position: relative;
      border: 5px solid #13ce66;
      background: url(../../assets/wall.png);
    }
	.photoBox{
		padding: 10px;
		border: 1px solid #666;
		position: absolute;
		width: 250px;
		height: 150px;
		background-color: #fff;
		transition: all .5s ease;
	}
	.closeBtn{
	    position: absolute;
	    width: 40px;
	    height: 40px;
	    top: -25px;
        right: -25px;
	    cursor: pointer;
	    font-size: 20px;
	    background-color: #fff;
	    z-index: 100;
	    color: #13ce66;
	    border-radius: 50%;
	}
	.closeBtn:hover{
		color: #FF4949;
	}
	.zIndex{
		z-index: 100!important;
	}
	.refresh{
		color: #999;
		position: absolute;
		right: 10px;
		bottom: 10px;
		cursor: pointer;
	}
	.refresh:hover{
		color: #13ce66
	}
</style>
