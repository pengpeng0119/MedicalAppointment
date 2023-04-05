<template>
  <view class="AI-card">
    <image
      src="/static/other/AI-shibie.svg"
      mode="widthFix"
      @click="upload"
    ></image>
    <text>身份证智能识别</text>
  </view>
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>请输入姓名</text>
      <input
        placeholder="请输入姓名"
        placeholder-class="input-style"
        v-model="submitData.name"
      />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker
        mode="selector"
        class="flex-left"
        @change="changeGender"
        :range="['男', '女']"
      >
        <view>
          <text>
            {{ submitData.sex == '' ? '请输入性别' : submitData.sex }}
          </text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeDate">
        <view>
          <text>
            {{ submitData.born == '' ? '请选择出生日期' : submitData.born }}
          </text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>成员关系</text>
      <picker
        mode="selector"
        class="flex-left"
        :range="['自己', '父母', '其他']"
        @change="changeTem"
      >
        <view>
          <text>
            {{
              submitData.relation === ''
                ? '请选择成员关系'
                : submitData.relation
            }}
          </text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>请输入身份证</text>
      <input
        placeholder="请输入身份证"
        placeholder-class="input-style"
        type="number"
        v-model="submitData.id_card"
      />
    </view>
    <view class="xinguan-flex">
      <text>请输入手机号</text>
      <input
        placeholder="请输入手机号"
        placeholder-class="input-style"
        type="number"
        v-model="submitData.phone"
      />
    </view>
  </view>
  <view style="height: 300rpx"></view>
  <view class="submit">
    <text @click="canCel">取消</text>
    <text @click="addPatient">确认添加</text>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { uploadImage } from '@/public/misc'
import { AICARD, RequestApi } from '@/public/request'
// 待提交
const submitData = reactive({
  name: '',
  sex: '',
  born: '',
  relation: '',
  id_card: '',
  phone: ''
})
// 选择器
function changeGender(event: any) {
  submitData.sex = event.detail.value == '0' ? '男' : '女'
}
function changeDate(event: any) {
  submitData.born = event.detail.value
}
function changeTem(event: any) {
  const res = event.detail.value
  console.log(res)
  submitData.relation = res == '0' ? '自己' : res == '1' ? '父母' : '其他'
}
// 身份证智能识别
async function upload() {
  const res: any = await uploadImage(AICARD, '识别中', '识别失败')
  let data = JSON.parse(res.data)
  console.log('res1', res)
  if (res.statusCode == 200) {
    console.log(res)
    submitData.name = data.data.name
    submitData.sex = data.data.sex
    submitData.born = data.data.born
    submitData.id_card = data.data.id_card
  } else {
    uni.showToast({ title: data.data, icon: 'none', duration: 1000 })
  }
}
// 取消与确认添加
function canCel() {
  uni.navigateBack({
    delta: 1
  })
}
async function addPatient() {
  const res: any = await RequestApi.PatientRes(submitData)
  if (res.statusCode == 200) {
    uni.navigateBack({ delta: 1 })
  }
}
</script>

<style>
@import url('../../../common-style/form.css');

page {
  background-color: #f6f6f6;
}

.AI-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 35rpx;
  border-radius: 15rpx;
  padding: 30rpx 20rpx;
  margin: 20rpx 20rpx 50rpx 20rpx;
}

.AI-card image {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  display: block;
}
</style>
