<template>
  <baidu-map class="bm-view" ak="KiuXnKh574nupZ83bTvhuPi0RdBnT7EI" :zoom="zoom":center="center" @ready="handler">
   <bm-marker :position="center"  animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="湘潭社会福利厂" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
    <bm-copyright
      anchor="BMAP_ANCHOR_TOP_LEFT"
      :copyright="[{id: 1, content: 'Copyright Message'}, {id: 2, content: '<a>湘潭社会福利厂</a>'}]">
    </bm-copyright>
     <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
     <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
</template>

<script>
import {BaiduMap, BmMarker, BmLabel, BmCopyright, BmGeolocation, BmNavigation} from 'vue-baidu-map'
export default {
  data () {
    return {
      center: {lng: 112.913055, lat: 27.873924},
      zoom: 17
    }
  },
  methods: {
    handler ({BMap, map}) {
      // console.log(BMap, map)
      this.lng = 112.913055
      this.lat = 27.873924
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel,
    BmCopyright,
    BmGeolocation,
    BmNavigation
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
