<template>
  <map
    class="map"
    id="myMap"
    :longitude="state.longitude"
    :latitude="state.latitude"
    scale="14"
    :show-location="true"
    :markers="state.markers"
    @markertap="markertap"
  >
  </map>
  <u-popup v-model="state.popupShow" mode="bottom" border-radius="24" height="430px" closeable>
    <div class="charts-box">
      <qiun-data-charts type="pie" :chartData="state.chartData" :opts="state.opts" />
    </div>
    <div class="rankingList">
      <div class="title">钓王排行榜</div>
      <div class="userRow">
        <div class="userItem" v-for="i in 3">
          <u-avatar
            src="https://img1.baidu.com/it/u=273892741,1142580910&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676221200&t=763f12b80292ecaf49a02704af694f13"
            mode="circle"
            show-level
            size="mini"
            :level-bg-color="i == 1 ? '#e2e2e2' : i == 2 ? '#ffd729' : '#ffbb4b'"
          ></u-avatar>
          <div class="nickname">李钟硕</div>
          <div class="num">渔获：500gk</div>
        </div>
      </div>
    </div>
    <div class="detailBox">
      <div class="local">
        {{ state.local }}<text class="distance" v-if="state.range !== ''">(距离你{{ state.range }})</text>
      </div>
      <div class="textBox" @click="goToDetail">
        <img class="img" :src="common.urlTobase64('imgs', 'detail')" />
        <div>查看详情</div>
      </div>
      <div class="textBox" @click="navigation">
        <img class="img" :src="common.urlTobase64('imgs', 'navigation')" />
        <div>标点导航</div>
      </div>
    </div>
  </u-popup>
  <uni-fab
    ref="fab"
    :pattern="pattern"
    :content="state.content"
    horizontal="right"
    vertical="bottom"
    direction="horizontal"
    @trigger="trigger"
  />
</template>

<script setup lang="ts">
import { onBackPress, onLoad, onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { AMapWX } from '@/libs/amap-wx.js'
import { sdks } from '@/static/sdk/index'
import common from '@/libs/common'

const pattern = {
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#FB7A30',
  buttonColor: '#FB7A30',
  iconColor: '#fff'
}
const fab = ref()
const state = reactive<{
  chartData: any
  opts: any
  markers: any[] /* 标记点 */
  myAmapFun: any /* 地图实例化的方法 */
  latitude: number /* 纬度 */
  longitude: number /* 经度 */
  showID: number /* 用于记录当前那个点被点击了 */
  popupShow: boolean
  local: string
  range: string
  content: any
}>({
  chartData: {},
  markers: [],
  myAmapFun: null,
  latitude: 0,
  longitude: 0,
  showID: 2,
  popupShow: false,
  opts: {
    color: ['#1890FF', '#91CB74', '#73C0DE', '#FC8452', '#b70b0b'],
    padding: [5, 5, 5, 5],
    enableScroll: false,
    extra: {
      pie: {
        activeOpacity: 0.5 /* 启用Tooltip点击时，突出部分的透明度 */,
        activeRadius: 10 /* 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth） */,
        offsetAngle: 0 /* 起始角度偏移度数，顺时针方向，起点为3点钟位置为0度（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */,
        labelWidth: 15 /* 数据标签到饼图外圆连线的长度 */,
        border: false /* 是否绘制各类别中间的分割线 */,
        borderWidth: 3 /* 分割线的宽度 */,
        borderColor: '#FFFFFF' /* 分割线的颜色 */
      }
    }
  },
  local: '',
  range: '',
  content: [
    {
      iconPath: common.urlTobase64('imgs', 'add'),
      selectedIconPath: common.urlTobase64('imgs', 'add'),
      text: '添加标点',
      active: false
    },
    {
      iconPath: common.urlTobase64('imgs', 'list'),
      selectedIconPath: common.urlTobase64('imgs', 'list'),
      text: '申请列表',
      active: false
    }
  ]
})
let mapCtx: any = null
onLoad(() => {
  mapCtx = uni.createMapContext('myMap')
  getAuthorizeInfo()
  initMP()
})
onBackPress(() => {
  if (fab.value.isShow) {
    fab.value.close()
    return true
  }
  return false
})

onShow(() => {})

// 位置授权
const getAuthorizeInfo = () => {
  uni.authorize({
    scope: 'scope.userLocation',
    success() {
      // 允许授权
      uni.getLocation({
        success: function (res) {
          console.log('经纬度', res)
        }
      })
    },
    fail() {
      // 拒绝授权
      openConfirm()
      uni.showToast({
        title: '你拒绝了授权，无法获得周边信息',
        duration: 2000
      })
    }
  })
}

const openConfirm = () => {}

/* 初始化 */
const initMP = () => {
  uni.showLoading({
    title: '获取信息中'
  })
  state.myAmapFun = new AMapWX({
    key: sdks.key
  })
  state.myAmapFun.getRegeo({
    success: (res: any) => {
      console.log('res', res)
      // 移动到当前位置
      toLocation(res)
      state.latitude = res[0].latitude
      state.longitude = res[0].longitude
      state.local = res[0].regeocodeData.formatted_address
      state.markers = [
        {
          id: 1,
          latitude: res[0].latitude,
          longitude: res[0].longitude,
          name: '112232',
          width: 12,
          height: 20
        },
        {
          id: 2,
          latitude: 22.53112,
          longitude: 113.91049,
          iconPath: '../../static/imgs/fishing.png',
          width: 40,
          height: 40,
          name: '双界河附近'
        },
        {
          id: 3,
          latitude: 22.51112,
          longitude: 113.90049,
          iconPath: '../../static/imgs/fishing.png',
          width: 40,
          height: 40,
          name: '凯旋城附近'
        }
      ]
      uni.hideLoading()
    },
    fail: (err: any) => {
      console.log(err)
      uni.hideLoading()
    }
  })
}

/* 点击标点 */
const markertap = async (e: any) => {
  console.log(e)
  state.showID = e.markerId
  state.popupShow = true
  const markDetail = state.markers.find((v) => v.id == state.showID)
  console.log('markDetail', markDetail)
  await getServerData()
  let distance = getDistance(state.latitude, state.longitude, markDetail.latitude, markDetail.longitude)
  distance = parseInt(distance * 1000)
  if (distance != null && distance > 0) {
    state.range = distance + '米'
    if (distance >= 1000) {
      state.range = (Math.round(distance / 100) / 10).toFixed(1) + '公里'
    }
  }
}

// 计算距离
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  let EARTH_RADIUS = 6378.137 //地球半径
  let radLat1 = (lat1 * Math.PI) / 180.0
  let radLat2 = (lat2 * Math.PI) / 180.0
  let radlon1 = (lon1 * Math.PI) / 180.0
  let radlon2 = (lon2 * Math.PI) / 180.0
  //差值
  let vLat = radLat1 - radLat2
  let vLon = radlon1 - radlon2
  //s就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆。
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(vLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(vLon / 2), 2)
      )
    )
  s = s * EARTH_RADIUS
  let distance = Math.round(s * 10000) / 10000
  return distance
}
/* 移动到当前位置 */
const toLocation = (obj: any) => {
  // 改变地图中心位置
  mapCtx.moveToLocation(obj)
  // 移动标记点并添加动画效果
  mapCtx.translateMarker({
    markerId: 1,
    autoRotate: false,
    duration: 100,
    destination: {
      latitude: obj[0].latitude,
      longitude: obj[0].longitude
    },
    animationEnd() {
      console.log('animation end')
    }
  })
}
/* 获取标点数据 */
const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    let res = {
      series: [
        {
          data: [
            { name: '1-5斤', value: 50 },
            { name: '5-10斤', value: 30 },
            { name: '10-15斤', value: 20 },
            { name: '15-20斤', value: 18 },
            { name: '25+', value: 1 }
          ]
        }
      ]
    }
    state.chartData = JSON.parse(JSON.stringify(res))
  }, 500)
}
/* 前往详情 */
const goToDetail = () => {
  uni.navigateTo({
    url: '/pages/fishDetail/index?id=1'
  })
}
/* 导航 */
const navigation = () => {
  const markDetail = state.markers.find((v) => v.id == state.showID)
  uni.openLocation({
    latitude: markDetail.latitude, //目标纬度
    longitude: markDetail.longitude, //目标经度
    name: markDetail.name, //名称
    address: state.local, //地址
    scale: 14
  })
}
/* 点击浮层 */
const trigger = (e: any) => {
  console.log(e)
  state.content[e.index].active = !e.item.active
  if (e.index == 1) {
    uni.navigateTo({
      url: '/pages/subPackage/mapList/index'
    })
    return
  }
  uni.showModal({
    title: '提示',
    content: '如果您附近一公里内有标点信息将无法添加标点信息',
    success: function (res) {
      if (res.confirm) {
        uni.navigateTo({
          url: '/pages/subPackage/addMap/index'
        })
      } else if (res.cancel) {
        fab.value.close()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}

.charts-box {
  padding-top: 5px;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #eeeeee;
}
.rankingList {
  padding: 10px 0;
  background: linear-gradient(180deg, #ff9b57 0%, #ff7c24 25.4%, #fd761b 50.38%, #ff7c24 76.52%, #ff9e5c 100%);
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #fff;
  }
  .userRow {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    .userItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(1) {
        margin-top: 20px;
      }
      &:nth-child(3) {
        margin-top: 20px;
      }
      .nickname {
        margin-top: 2px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #fff;
      }
      .num {
        margin-top: 2px;
        font-size: 12px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

.detailBox {
  display: flex;
  padding: 16px;
  font-size: 12px;
  line-height: 16px;
  color: #999999;
  .distance {
    color: #4295fa;
    font-size: 12px;
  }
  .textBox {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-left: 20px;
    .img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      object-fit: cover;
    }
  }
}
</style>
