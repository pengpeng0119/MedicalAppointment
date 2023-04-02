<template>
  <view class="progress-box">
    <text>测评进度</text>
    <progress
      class="progress"
      :percent="percent"
      border-radius="40"
      stroke-width="10"
      color="#cce3ff"
      activeColor="#2d8dfe"
      :active="true"
      active-mode="forwards"
      duration="20"
    />
    <text>{{ add_to }} / {{ topic_length }}</text>
  </view>
  <!-- 题目 -->
  <view class="question">{{ each_question.data.topic }}</view>
  <!-- 单选题 -->
  <view class="topic-view">
    <view class="topic-Title">
      <text></text>
      <text>单选题</text>
    </view>
    <view
      class="totic"
      hover-class="hover-style"
      hover-stay-time="200"
      v-for="(item, index) in each_question.data.options"
      :key="index"
      @click="choose(item.son_id)"
    >
      {{ item.title }}
    </view>
  </view>
  <ske-leton v-if="skshow"></ske-leton>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { RequestApi } from '@/public/request'
import type { Topic } from '@/public/decl-type'
import SkeLeton from '@/Skeleton/SK-self-test.vue'
// 接受上个页面的参数
let judg_value = ref('003')
onLoad((event) => {
  let { type, name } = event as { type: string; name: string }
  judg_value.value = type
  uni.setNavigationBarTitle({ title: name })
})
// 进度条计算
let percent = ref(0)
// 存储所有题目
let topic_data = ref<Topic[]>([])
// 存储每一题
let each_question = reactive<{ data: Topic }>({
  data: {
    topic: '',
    _id: '',
    options: []
  }
})
// 一共有多少题
interface Resdata {
  data: { data: Topic[] }
}
// 题目数量
let topic_length = ref(0)
let skshow = ref(true)
onShow(async () => {
  add_to.value = 1
  percent.value = 0
  topic_id.value = []
  if (judg_value.value == '001') {
    //抑郁
    var res = (await RequestApi.DepressionTopics()) as Resdata
  } else if (judg_value.value == '002') {
    //男性
    var res = (await RequestApi.PrematureTopics()) as Resdata
  } else {
    //失眠
    var res = (await RequestApi.InsomniaTopics()) as Resdata
  }
  skshow.value = false
  topic_data.value = res.data.data
  topic_length.value = res.data.data.length
  each_question.data = res.data.data[0]
  percent.value = 100 / topic_length.value
})
/* 选择每一道题触发 */
// 存储每一道题的下标
let add_to = ref(1)
// 存储每次点击的id
let topic_id = reactive<{ value: string[] }>({ value: [] })
function choose(id: string) {
  add_to.value++
  if (add_to.value - 1 === topic_length.value) {
    add_to.value--
    topic_id.value.push(id)
    let OBJ = JSON.stringify({
      type: judg_value.value,
      topic_id: topic_id.value
    })
    uni.navigateTo({
      url: '/pages/self-test/result?value=' + OBJ
    })
  } else {
    percent.value = (100 / topic_length.value) * add_to.value
    each_question.data = topic_data.value[add_to.value - 1]
    topic_id.value.push(id)
  }
}
</script>
<style>
page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.progress-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.progress {
  flex: 1;
  padding: 0 40rpx;
}

.question {
  padding: 30rpx 20rpx;
  margin: 40rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}

.topic-view {
  background-color: #f3f8ff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 20rpx;
  box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
}

.topic-Title {
  display: flex;
  align-items: center;
}

.topic-Title text:nth-child(1) {
  width: 8rpx;
  height: 27rpx;
  background-color: #0d7cff;
  display: block;
  margin-right: 10rpx;
}

.totic {
  background: #ffffff;
  margin: 20rpx 0;
  padding: 40rpx 10rpx;
  border-radius: 10rpx;
}

.hover-style {
  background-color: #ebf4ff;
  color: #298cff;
}
</style>
