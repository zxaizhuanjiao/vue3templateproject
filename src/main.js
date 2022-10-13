import { createApp } from 'vue'
import App from './App.vue'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./styles/index.scss";

// 引入封装的router
import router from './router/index'
// vuex
import { store } from '@/store/index'
// 引入gin-vue-admin前端初始化相关内容
import './core/vue-admin'
import run from '@/core/vue-admin.js'
// svg
import './icons'
import SvgIcon from '@/components/svgIcon/index.vue'

// element plus icon
// import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
app.config.productionTip = false

app.use(run)
   .use(router)
   .use(ElementPlus)
   .use(store)
   .component('svg-icon', SvgIcon)
   .mount('#app')
export default app
