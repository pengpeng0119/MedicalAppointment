<template>
  <view class="xinguan-view">
    <slot />
  </view>
  <!-- 提示组件 -->
  <point :show="show" />
  <view style="height: 300rpx"></view>
</template>

<script setup>
import point from '@/com-components/point.vue'
</script>

<style>
@import url('../common-style/vaccine.css');
</style>
