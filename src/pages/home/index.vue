<template>
  <view class="home-page"> </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { reactive } from 'vue'
const state = reactive<{
  arr: any
}>({
  arr: {
    accountid: '153',
    adminid: '19',
    cost_1: '10.00',
    cost_2: '5.00',
    cost_3: '5.00',
    cost_4: '5.00',
    cost_5: '5.00',
    cost_6: '5.00',
    cost_7: '5.00',
    cost_8: '5.00',
    id: '3',
    mealname: '1格机优享套餐',
    photo_1: 'https://xcmicsell.xcmic.com/images/meal/1496/1/990A870B-9C6A-4480-99E8-2180F0700A6D.jpeg',
    photo_2: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_3: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_4: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_5: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_6: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_7: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    photo_8: 'https://xcmicsell.xcmic.com/images/goods.jpg',
    placeid: '2484',
    stock_1: '0',
    stock_2: '0',
    stock_3: '0',
    stock_4: '0',
    stock_5: '0',
    stock_6: '0',
    stock_7: '0',
    stock_8: '0',
    timer1: '3.00',
    timer2: '12.00',
    title: '“延时”黄金硬汉安全套2只',
    title1: '电之初体验',
    title2: '电之畅享',
    title_2: 'no',
    title_3: 'no',
    title_4: 'no',
    title_5: 'no',
    title_6: 'no',
    title_7: 'no',
    title_8: 'no',
    total: '38.00',
    total1: '9.99',
    total2: '15.00',
    total_2: '99.00',
    total_3: '99.00',
    total_4: '99.00',
    total_5: '99.00',
    total_6: '99.00',
    total_7: '99.00',
    total_8: '99.00'
  }
})

const getList = (data: any, iKey: string) => {
  const newData = []
  for (const key in data) {
    if (key.split('_')[0] === iKey) {
      newData.push({
        [iKey]: data[key]
      })
    }
  }
  return newData
}

const getALL = () => {
  const arrData: any = []
  const keys = ['title', 'total', 'photo', 'stock']
  const newDataAll: any = []
  keys.forEach((key) => {
    arrData.push(getList(state.arr, key))
  })
  for (var v = 0; v < arrData.length; v++) {
    for (var i = 0; i < keys.length; i++) {
      arrData[i].map((val: any, index: number) => {
        // console.log(v,val);
        // console.log(index);
      })

      // console.log(v,arrData[i]);
    }
  }

  // console.log(arrData)
}

onShow(() => {
  getALL()
})
</script>

<style lang="scss" scoped></style>
