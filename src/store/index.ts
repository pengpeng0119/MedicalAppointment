import {defineStore} from 'pinia'
interface Patient{
    name:string
    _id:string
}
export const myData=defineStore('main_data',{
    // 定义数据仓库
    state(){
        return{
            // 用户在某些页面选择就诊人需要值就存在这里
            patient:{

            } as Patient
        }
    },
    // 同步异步传值
    actions:{
        // 调用传值给state=>patient
        addPadtient(value:Patient){
            this.patient=value
        }
    },

    
})
