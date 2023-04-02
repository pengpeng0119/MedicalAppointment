<template>
    <page-container :show="submitData.show" @enter="onEnter" @clickoverlay="submitData.show = false">
        <view class="popups">
            <text class="popups-title">选择成员</text>
            <view class="member-view">
                <image src="/static/other/touxiang.svg" mode="widthFix"></image>
                <text>{{ name }}</text>
                <text @click="choosePatient">{{ name == '' ? '选择就诊人' : '重新选择' }}</text>
            </view>
            <view class="select-submit" @click="subMit">提交预约</view>
        </view>
    </page-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { myData } from '@/store';
import { RequestApi } from '@/public/request';
export interface Event {
    phy_name: string;
    phy_time: string;
    show: boolean
}


function onEnter() {
    console.log('进入中触发')
}
// 待提交的值
let submitData = reactive({
    phy_name: '',
    phy_time: '',
    show: false,
    patient_id: ''
})

// 被父组件调用的方法
function triGer(event: Event) {
    submitData.phy_name = event.phy_name
    submitData.phy_time = event.phy_time
    submitData.show = event.show
}
defineExpose({ triGer })
// 选择就诊人
function choosePatient() {
    uni.navigateTo({
        url: "/pages/my-service/my-patient/my-patient"
    })
}
const store = myData()
let name = ref('')
store.$subscribe((mutayion, state) => {
    console.log(state)
    name.value = state.patient.name
    submitData.patient_id = state.patient._id
})
// 最后提交
async function subMit() {
    uni.showLoading({ title: '提交中', mask: true })
    const res = await RequestApi.ResPhy(submitData) as { statusCode: number }
    if (res.statusCode == 200) {
        uni.hideLoading()
        uni.redirectTo({
            url: "/pages/my-service/phy-exam/index"
        })
    }
}
</script>

<style scoped>
@import url('../common-style/nucleic-time.css');

.popups {
    height: 400rpx;
    width: 100%;
    background-color: #ffffff;
}
</style>