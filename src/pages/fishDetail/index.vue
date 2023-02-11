<template>
  <div class="fishDetail-page" :style="{ backgroundImage: `url(${common.urlTobase64('imgs', 'bg2x')})` }">
    <div class="title" :style="{ paddingTop: common.getStatusBarHeight() }">上货分析图</div>
    <div class="charts-box">
      <qiun-data-charts type="pie" :chartData="state.chartData" :opts="state.opts" />
    </div>
    <div class="list">
      <div class="listTitle">钓友分享</div>
      <div class="item" v-for="i in 60">
        <div class="userBox">
          <div class="flex">
            <u-avatar
              src="https://img1.baidu.com/it/u=273892741,1142580910&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676221200&t=763f12b80292ecaf49a02704af694f13"
              mode="circle"
              show-level
              size="mini"
            ></u-avatar>
            <div class="info">
              <div class="name">可爱的猪</div>
              <u-rate :count="5" v-model="state.value" active-color="#FB7A30" inactive-color="#CCCCCC" size="20"></u-rate>
            </div>
          </div>
          <div class="time">2021.05.16</div>
        </div>
        <div class="desc">
          环境不好，其他都很不错。给操作的100分，就是环境不好
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import common from '@/libs/common'

const state = reactive<{
  chartData: any
  opts: any
  value: number
}>({
  chartData: {},
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
  value: 3
})

onReady(() => {
  getServerData()
})

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
</script>

<style lang="scss" scoped>
.fishDetail-page {
  width: 100%;
  height: 100vh;
  opacity: 0.8;
  backdrop-filter: blur(10px);
  .title {
    text-align: center;
    font-size: 15px;
    line-height: 20px;
    padding: 25px 0 5px 0;
  }
  .charts-box {
    width: 100%;
    height: 300px;
  }

  .list {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: #f9f9f9;
    padding: 0 16px 16px 16px;
    .listTitle {
      padding: 20px 0;
      position: sticky;
      top: 0;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      background: #f9f9f9;
      border-bottom: 1px solid #eeeeee;
      border-radius: 16px 16px 0 0;
      z-index: 999;
    }
    .item {
      margin-top: 13px;
      padding: 12px;
      background: #fff;
      border-radius: 8px;
      .userBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .info {
          margin-left: 12px;
          .name {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
        }
        .time {
          font-size: 12px;
          line-height: 17px;
          color: #cccccc;
        }
      }
      .desc {
        font-size: 14px;
        line-height: 146%;
        letter-spacing: 2px;
        color: #353535;
      }
    }
  }
}
</style>
