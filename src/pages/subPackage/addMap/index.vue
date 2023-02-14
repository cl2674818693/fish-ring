<template>
  <view class="addMap-page">
    <div class="addRow">
      <u-form :model="state.form" ref="uForms">
        <u-form-item label="标点昵称" label-position="top" prop="nickName" required>
          <u-input v-model="state.form.nickName" placeholder="请输入标点昵称" maxlength="30" />
        </u-form-item>
        <u-form-item label="标点简介" label-position="top" prop="intro" required>
          <u-input v-model="state.form.intro" placeholder="请输入描述一下标点情况" maxlength="200" type="textarea" />
        </u-form-item>
        <u-form-item label="标点附近图片" label-position="top" prop="intro" required>
          <u-upload ref="uUploads" action="http://www.example.com/upload" :auto-upload="false" max-count="6"></u-upload>
        </u-form-item>
      </u-form>
    </div>
    <div class="confirm">
      <u-button type="success" @click="submit">提交审核</u-button>
    </div>
  </view>
</template>
<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
const uForms = ref()
const uUploads = ref()

const rules = {
  name: [
    {
      required: true,
      message: '请输入标点昵称',
      trigger: ['change', 'blur']
    }
  ],
  intro: [
    {
      min: 5,
      message: '请输入描述一下标点情况',
      trigger: ['change', 'blur']
    }
  ]
}
const state = reactive<{
  form: {
    nickName: string
    intro: string
  }
}>({
  form: {
    nickName: '',
    intro: ''
  }
})

onReady(() => {
  uForms.value.setRules(rules)
})

const submit = () => {
  console.log(uUploads.value.lists)
}
</script>

<style lang="scss" scoped>
.addMap-page {
  padding: 10px 16px;
  height: 100vh;
  background-color: #f9f9f9;
  .addRow {
    padding: 14px;
    border-radius: 8px;
    background-color: #fff;
  }
}
.confirm {
  margin-top: 20px;
}
</style>
