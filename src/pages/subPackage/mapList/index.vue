<template>
  <view class="maplist-page">
    <u-tabs
      :list="options1"
      :is-scroll="false"
      v-model="state.current"
      @change="change"
      active-color="#FB7A30"
    ></u-tabs>
    <div class="list">
      <div class="item"></div>
    </div>
  </view>
</template>
<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
const options1 = [
  {
    name: '审核通过',
    count: 1
  },
  {
    name: '审核拒绝',
    count: 2
  },
  {
    name: '审核中',
    count: 3
  }
]

const state = reactive<{
  current: number
}>({
  current: 1
})

const change = (index: number) => {
  console.log('index', index)
}
</script>

<style lang="scss" scoped>
.maplist-page {
  height: 100vh;
  background-color: #f9f9f9;
  .list {
    padding: 10px 16px;
    height: 100%;
    .item {
      padding: 12px;
      background: #ffffff;
      box-shadow: 0px 3px 12px rgba(48, 159, 140, 0.1);
      border-radius: 8px;
    }
  }
}
</style>
