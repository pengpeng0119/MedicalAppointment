1.打开src/manifest.json文件，微信小程序配置里，更改为你自己的
小程序APPID

2.打开src/pages/login-page/index.vue，第49行，
把appid和secret秘钥改为你自己的小程序appid和秘钥

3.在根目录下执行 npm install 安装依赖，成功后，
再执行npm run dev:mp-weixin
4.打开src/public/qq-Location.ts，的key
填写腾讯地图api的开发者密钥（key）
腾讯地图开放平台：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
申请开发者密钥（key）

5.将dist打包到小程序运行
