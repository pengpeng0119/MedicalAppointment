<template>
    <view class="Login-page">
        <image mode="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg">
        </image>
        <button @click="Login">授权登录</button>
    </view>
</template>

<script setup lang="ts">
// 引入
import { ref, onMounted, reactive, toRefs } from 'vue'
import { RequestApi } from '../../public/request'

// 授权登录
function Login() {
    uni.getUserProfile({
        desc: '获取个人信息',
        success: (res) => {
            console.log('first', res)
            let { avatarUrl, nickName } = res.userInfo
            // 获取code
            uni.login({
                success: (code) => {
                    uni.showLoading({ title: '登录中', mask: true })
                    apiLogin(avatarUrl, nickName, code.code)
                },
                fail: (err) => {
                    uni.showToast({
                        title: '服务器发生位置错误',
                        icon: 'none',
                        duration: 1000
                    })
                }
            })
        },
        fail: (err) => {
            uni.showToast({
                title: '服务器发生位置错误',
                icon: 'none',
                duration: 1000
            })
        }
    })
}
// 调用api接口登录
async function apiLogin(avatarUrl: string, nickName: string, code: string) {
    try {
        console.log(avatarUrl, nickName, code)
        let obj = { appid: 'wx6203db8697114a30', secret: 'a9243135931edfb095afd201f6442f55', avatarUrl, nickName, code }
        let res: any = await RequestApi.WxLogin(obj)
        uni.setStorageSync('wxuser', res.data.data)
        setTimeout(() => {
            uni.navigateBack({ delta: 1 })
            uni.hideLoading()
        }, 600)


    } catch (err) {
        uni.showToast({
            title: '登录失败111',
            icon: 'none',
            duration: 1000
        })
    }
}
</script>

<style >
.Login-page {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.Login-page image {
    width: 100%;
    height: 100%;
}

.Login-page button {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 30%;
    background-color: #2c76ef;
    color: #ffffff;
    padding: 0 100rpx;
    font-size: 35rpx;
}

checkbox .wx-checkbox-input {
    border-radius: 50%;
    /* 圆角 */
    width: 30rpx;
    /* 背景的宽 */
    height: 30rpx;
    /* 背景的高 */
}

/* 选中后的 背景样式*/
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
    border: 1rpx solid #2c76ef;
    background: #2c76ef;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
    border-radius: 50%;
    /* 圆角 */
    width: 30rpx;
    /* 选中后对勾大小，不要超过背景的尺寸 */
    height: 30rpx;
    /* 选中后对勾大小，不要超过背景的尺寸 */
    line-height: 30rpx;
    text-align: center;
    font-size: 20rpx;
    /* 对勾大小 30rpx */
    color: #fff;
    /* 对勾颜色 白色 */
    background: transparent;
    transform: translate(-50%, -50%) scale(1);
    -webkit-transform: translate(-50%, -50%) scale(1);
}

.protocol-view {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 27%;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
}

.protocol-tip {
    color: #2c76ef;
}

/* 弹窗 */
.tip-view {
    padding-bottom: 50rpx;
}

.tip-title {
    text-align: center;
    font-size: 35rpx;
    font-weight: bold;
    padding: 20rpx 0;
}

.tip-view text {
    display: block;
    padding: 20rpx;
    font-size: 27rpx;
}
</style>