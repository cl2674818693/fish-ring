<template>
  <map
    class="map"
    :longitude="state.longitude"
    :latitude="state.latitude"
    scale="14"
    :show-location="true"
    :markers="state.markers"
    @markertap="markertap"
  >
  </map>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import { AMapWX } from '@/libs/amap-wx.js'
import { sdks } from '@/static/sdk/index'
const state = reactive<{
  markers: any[] /* 标记点 */
  myAmapFun: any /* 地图实例化的方法 */
  latitude: number /* 纬度 */
  longitude: number /* 经度 */
  showID: number /* 用于记录当前那个点被点击了 */
}>({
  markers: [],
  myAmapFun: null,
  latitude: 0,
  longitude: 0,
  showID: 2
})
onLoad(() => {
  initMP()
})
onShow(() => {})
/* 初始化 */
const initMP = () => {
  uni.showLoading({
    title: '获取信息中'
  })
  state.myAmapFun = new AMapWX({
    key: sdks.key
  })
  // 获取位置
  uni.getLocation({
    type: 'gcj02',
    success: function (res) {
      console.log('res', res)
      console.log('当前位置的经度：' + res.longitude)
      console.log('当前位置的纬度：' + res.latitude)
      state.longitude = res.longitude
      state.latitude = res.latitude
      state.markers = [
        {
          id: 2,
          longitude: 113.91049,
          latitude: 22.53112,
          iconPath: '../../static/imgs/fishing.png',
          width: 40,
          height: 40
        },
        {
          id: 3,
          longitude: 113.90049,
          latitude: 22.51112,
          iconPath: '../../static/imgs/fishing.png',
          width: 40,
          height: 40
        }
      ]
      uni.hideLoading()
    }
  })
}
/* 点击标点 */
const markertap = (e: any) => {
  console.log(e)
  uni.navigateTo({
    url: '/pages/fishDetail/index?id=1'
  })
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
