<template>
    <view class="video-view" v-for="(item, index) in video_data" :key="index">
        <view class="video-area">
            <video :src='item.video_url' :id='item._id' :controls='item.controls' :show-center-play-btn="false"
                object-fit="cover" :title='item.video_title'>

            </video>
            <text class="video-title">{{ item.video_title }}</text>
            <image v-if="item.play_but" src="/static/other/video-bofang.png" mode="widthFix"
                @click="startPlay(index, item._id)"></image>
        </view>
        <view class="video-name">
            <image src="/static/other/video-bofang.png" mode="widthFix"></image>
            <text>{{ item.name }}</text>
        </view>
    </view>
    <!-- 加载图标 -->
    <view class="Loading">
        <image v-if="loading" src="/static/other/loading.svg" mode="widthFix"></image>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RequestApi } from '@/public/request';
import type { Videotype } from '@/public/decl-type'
import { onReachBottom } from '@dcloudio/uni-app';
import { onShow } from '@dcloudio/uni-app';
onMounted(() => {
    retriData(0)
})
// 接受视频相关地址
let video_data = ref<Videotype[]>([])
interface Resdata {
    data: { data: Videotype[] }
}
async function retriData(page: number) {
    const res = await RequestApi.VideoList({ page: page }) as Resdata
    video_data.value = [...video_data.value, ...res.data.data]
}
// 上拉加载
let loading = ref(false)
let page = ref(0)
onReachBottom(async () => {
    page.value++
    loading.value = true
    await retriData(page.value)
    loading.value = false
})
// 点击自定义播放按钮播放视频
// 存储视频的id
function startPlay(index: number, video_id: string) {
    video_data.value[index].controls = true
    video_data.value[index].play_but = false
    dealWith(index, video_id)
}
let videoId = ref('')
let videoIndex = ref(-1)
function dealWith(index: number, video_id: string) {
    if (videoId.value == '') {
        videoId.value = video_id
        videoIndex.value = index
        uni.createVideoContext(video_id).play()
    } else {//已有视频播放
        let prevideos_id = uni.createVideoContext(videoId.value)
        if (videoId.value != video_id) {
            prevideos_id.pause()
            pausefun(videoIndex.value)
        }
        setTimeout(() => {
            videoId.value = video_id
            videoIndex.value = index
            uni.createVideoContext(video_id).play()
        }, 700)

    }
}
function pausefun(index: number) {
    video_data.value[index].controls = false
    video_data.value[index].play_but = true
}
onShow(() => {
    console.log(1111)
    uni.createVideoContext(videoId.value).pause()
})
</script>

<style>
page {
    background: #f5f5f5;
}

.video-view {
    background-color: #ffffff;
    margin-bottom: 30rpx;
}

.video-area {
    height: 400rpx;
    position: relative;
}

.video-area video {
    height: 400rpx;
    width: 100%;
    display: block;
}

.video-area image {
    width: 100rpx;
    height: 100rpx;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.video-title {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    right: 20rpx;
    z-index: 99;
    color: #ffffff;
    font-size: 35rpx;
    font-weight: bold;
}

.video-name {
    display: flex;
    align-items: center;
    padding: 20rpx;
}

.video-name image {
    width: 40rpx;
    height: 40rpx;
    display: block;
    margin-right: 20rpx;
    border-radius: 50%;
}

/* loading */
.Loading {
    height: 150rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Loading image {
    display: block;
    width: 70rpx;
    height: 70rpx;
    animation: myfirst 1s infinite linear;
}

@keyframes myfirst {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>
