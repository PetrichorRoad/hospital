import { createApp } from 'vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
import '@/assets/reset.scss'
import header from './components/HospitalHeader.vue'
import footer from './components/HospitalFooter.vue'
import login from './components/login.vue'
import pinia from '@/store/index'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {locale: zhCn})
app.component('hospitalTop', header)
app.component('hospitalBot', footer)
app.component('login', login)
// 引入路由鉴权
import './permisstion.ts'
app.mount('#app')