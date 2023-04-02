import { createSSRApp } from "vue";
import App from "./App.vue";
import {createPinia} from 'pinia'
// 创建pinia实例
const pinia=createPinia()
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
