<template>
  <div class="fishDetail-page" :style="{ backgroundImage: `url(${common.urlTobase64('imgs', 'bg2x')})` }">
    <div class="title" :style="{ paddingTop: common.getStatusBarHeight() }">上货分析图</div>
    <div class="charts-box">
      <qiun-data-charts type="pie" :chartData="state.chartData" :opts="state.opts" />
    </div>
    <div class="viewContent">
      <div class="tabs">
        <u-tabs
          active-color="#FB7A30"
          :list="list"
          :current="state.current"
          @change="tabsChange"
          :is-scroll="false"
        ></u-tabs>
      </div>
      <swiper class="swiper" :current="state.swiperCurrent" @animationfinish="animationfinish">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <!-- 排行榜 -->
          <div class="rankingList" v-if="index == 0">
            <div class="rankingTitle">钓王排行榜</div>
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
            <div class="userList">
              <div class="header">
                <div class="flex">
                  <div class="sort">排序</div>
                  <div class="sort">姓名</div>
                </div>
                <div class="sort">渔获(kg)</div>
              </div>
              <div class="userItem" v-for="i in 19">
                <div class="flex-center">
                  <div class="num">{{ i + 3 }}</div>
                  <div class="flex-center">
                    <u-avatar
                      src="https://img1.baidu.com/it/u=273892741,1142580910&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676221200&t=763f12b80292ecaf49a02704af694f13"
                      mode="circle"
                      size="mini"
                    ></u-avatar>
                    <div class="nickName">刘亦菲</div>
                  </div>
                </div>
                <div class="total">{{ 100 + i }}kg</div>
              </div>
            </div>
          </div>
          <!-- 钓友分享 -->
          <div class="list" v-else>
            <div class="item" v-for="i in 60">
              <div class="userBox">
                <div class="flex">
                  <u-avatar
                    src="https://img1.baidu.com/it/u=273892741,1142580910&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676221200&t=763f12b80292ecaf49a02704af694f13"
                    mode="circle"
                    size="mini"
                  ></u-avatar>
                  <div class="info">
                    <div class="name">可爱的猪</div>
                    <u-rate
                      :count="5"
                      v-model="state.value"
                      active-color="#FB7A30"
                      inactive-color="#CCCCCC"
                      size="20"
                    ></u-rate>
                  </div>
                </div>
                <div class="time">2021.05.16</div>
              </div>
              <div class="desc">环境不好，其他都很不错。给操作的100分，就是环境不好</div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import common from '@/libs/common'
const list = [{ name: '钓王排行榜' }, { name: '钓友分享' }]
const state = reactive<{
  chartData: any
  opts: any
  value: number
  current: number
  swiperCurrent: number
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
  value: 3,
  current: 0 /*tabs组件的current值，表示当前活动的tab选项 */,
  swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
})
onReady(() => {
  getServerData()
})

// tabs通知swiper切换
const tabsChange = (index: number) => {
  state.swiperCurrent = index
  state.current = index
}
// swiper滑动结束，分别设置tabs和swiper的状态
const animationfinish = (e: any) => {
  let current = e.detail.current
  state.swiperCurrent = current
  state.current = current
}

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
  .swiper {
    height: calc(100% - 20px);
  }
  .viewContent {
    background: #f2f2f2;
    height: 50vh;
  }
  .rankingList {
    height: 100%;
    margin-top: 13px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: linear-gradient(45deg, #ff9b57 0%, #ff791f 25.4%, #fd761b 50.38%, #ff791f 76.52%, #ff8533 100%);
    overflow: auto;
    .rankingTitle {
      padding-top: 13px;
      text-align: center;
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: #fff;
      z-index: 999;
      background: transparent;
    }
    .userRow {
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
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
    .userList {
      // height: 500px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      margin-top: 26px;
      padding: 0 16px 16px 16px;
      background: #fff;
      // overflow: auto;
      .header {
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        justify-content: space-between;
        padding: 0 8px;
        padding-bottom: 16px;
        background: #fff;
        padding-top: 16px;
        z-index: 999;
        .sort {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #928e88;
          &:nth-child(1) {
            margin-right: 73px;
          }
        }
      }
      .userItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px;
        margin-bottom: 10px;
        border-radius: 14px;
        background: linear-gradient(90deg, rgba(253, 118, 27, 0.1) 0%, rgba(253, 118, 27, 0.01) 100%);
        .num {
          margin-right: 40px;
          font-family: 'DIN Alternate';
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          color: #25221c;
        }
        .nickName {
          margin-left: 10px;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          color: #3f3b35;
        }
        .total {
          font-size: 12px;
          line-height: 17px;
          color: #ff7f28;
        }
      }
    }
  }
  .list {
    height: 100vh;
    background: #f9f9f9;
    padding: 0 16px 16px 16px;
    overflow: auto;
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
