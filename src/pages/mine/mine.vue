<template>
  <view class="user-name">
    <image
      :src="
        user_data.avatarUrl ? user_data.avatarUrl : '/static/other/touxiang.svg'
      "
      mode="aspectFill"
    ></image>
    <text
      @click="loGin"
      :class="user_data.nickName ? 'disabled' : 'split-now'"
      >{{ user_data.nickName ? user_data.nickName : '登录' }}</text
    >
  </view>
  <view class="infor_mation">
    <view v-for="(item, index) in information" :key="index">
      <text>{{ item.number }}</text>
      <text>{{ item.title }}</text>
    </view>
  </view>
  <view class="my-order">
    <view
      v-for="(item, index) in orderData"
      :key="index"
      @click="jumpPath(item.path)"
    >
      <image :src="item.icon"></image>
      <text>{{ item.title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'

let user_data = ref({ avatarUrl: '', nickName: '' })
onShow(() => {
  let wxUser = uni.getStorageSync('wxuser') as {
    avatarUrl: string
    nickName: string
  }
  if (!wxUser) {
    user_data.value.avatarUrl = ''
    user_data.value.nickName = ''
  } else {
    user_data.value.avatarUrl = wxUser.avatarUrl
    user_data.value.nickName = wxUser.nickName
  }
})
// 去登录
function loGin() {
  uni.navigateTo({
    url: '/pages/login-page/index'
  })
}
// static
let information = reactive([
  {
    number: 5,
    title: '健康分'
  },
  {
    number: 5,
    title: '已预约'
  },
  {
    number: 8,
    title: '消息'
  }
])
// static2
let orderData = reactive([
  {
    icon: '/static/mine/jiuzhenren.svg',
    title: '就诊人管理',
    path: '/pages/my-service/my-patient/my-patient'
  },
  {
    icon: '/static/mine/guahao.svg',
    title: '我的挂号',
    path: '/pages/my-service/my-registration/index'
  },
  {
    icon: '/static/mine/xinguanyimiao.svg',
    title: '新冠疫苗',
    path: '/pages/my-service/xinguan/index'
  },
  {
    icon: '/static/mine/hpvyimiao.svg',
    title: 'HPV疫苗',
    path: '/pages/my-service/hpv-view/index'
  },
  {
    icon: '/static/mine/hesuan.svg',
    title: '核酸检测',
    path: '/pages/my-service/nucleic-acid/index'
  },
  {
    icon: '/static/mine/tijianbaogao.svg',
    title: '我的体检',
    path: '/pages/my-service/phy-exam/index'
  }
])
function jumpPath(path: string) {
  uni.navigateTo({
    url: path
  })
}
</script>

<style>
page {
  background: linear-gradient(to bottom, #e3efff 30%, #f6f6f6 40%);
}
/* 昵称 */
.user-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 35rpx;
}
.user-name image {
  width: 80rpx;
  height: 80rpx;
  display: block;
  border-radius: 50%;
  border: 5rpx solid #ffffff;
  margin-bottom: 10rpx;
}
/* 三个排列 */
.infor_mation view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.infor_mation {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  margin: 50rpx 0;
}
.infor_mation text {
  padding-bottom: 15rpx;
}
/* 我的订单 */
.my-order {
  background-color: #ffffff;
  border-radius: 20rpx;
  margin: 0 20rpx 20rpx 20rpx;
  display: flex;
  flex-wrap: wrap;
  font-size: 28rpx;
}
.my-order image {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 25rpx;
}
.my-order view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(25% - 20rpx * 2);
  margin: 20rpx;
}
/* 未登陆的背景 */
.split-new {
  background: #0176ff;
  color: #ffffff;
  border-radius: 10rpx;
  padding: 10rpx 50rpx;
}
/* 禁用点击 */
.disabled {
  pointer-events: none;
}
</style>
