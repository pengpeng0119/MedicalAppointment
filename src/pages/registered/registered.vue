<template>
  <view class="regist-view">
    <view class="regist-left">
      <text
        v-for="(item, index) in department_data"
        :class="addColor == index ? 'addcolor' : ''"
        @click="changeList(index, item._id)"
        >{{ item.dep_ment }}</text
      >
    </view>
    <view class="regist-right">
      <block v-for="(item, index) in reglist_data">
        <view
          v-for="(item_a, index_a) in item.dep_ment_list"
          :key="index_a"
          @click="jumpRoute(item_a.dep_id)"
          >{{ item_a.dep_name }}</view
        >
      </block>
    </view>
  </view>
  <ske-leton v-if="skshow"></ske-leton>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RequestApi } from '@/public/request'
import type { Reglist } from '@/public/decl-type'
import SkeLeton from '../../Skeleton/SK-registered.vue'
interface Resdatain {
  _id: string
  dep_ment: string
}
interface Resdata {
  data: { data: Resdatain[] }
}
// 父科室的数据
let department_data = ref<Resdatain[]>([])
let skshow = ref(true)
onMounted(async () => {
  const res = (await RequestApi.DeparTment()) as Resdata
  skshow.value = false
  department_data.value = res.data.data
  changeList(0, res.data.data[0]._id)
})
let addColor = ref(0)
// 子科室的数据
let reglist_data = ref<Reglist[]>([])
async function changeList(index: number, id: string) {
  addColor.value = index
  const res = (await RequestApi.RegList({ id })) as {
    data: { data: Reglist[] }
  }
  reglist_data.value = res.data.data
}
// 选择科室后,选择医生
function jumpRoute(id: string) {
  uni.navigateTo({
    url: '/pages/doctor/index?id=' + id
  })
}
</script>

<style scoped>
.regist-view {
  display: flex;
  justify-content: space-between;
}

.regist-left {
  background-color: #f5f5f5;
  width: 200rpx;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  overflow: auto;
}

.regist-left text {
  display: block;
  padding: 25rpx;
}

.addcolor {
  background-color: #ffffff;
  color: #2c76ef;
}

.regist-right {
  padding-left: 200rpx;
  flex: 1;
}

.regist-right view {
  padding: 25rpx;
}
</style>
