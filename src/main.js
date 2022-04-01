/* eslint-disable eol-last */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UI from './components/library'
// 重置樣式的庫
import 'normalize.css'
// 自己項目的重置樣式和公用樣式
import '@/assets/styles/common.less'
// 插件的使用，在main.js使用app.use(插件)
// mockjs
import '@/mock'
createApp(App).use(store).use(router).use(UI).mount('#app')