import Vue from 'vue'
import App from './App'
// import jwx from '@/components/jwx/index.js'

Vue.config.productionTip = false
// if(jwx.isWechat()){
// 	Vue.prototype.$wechat =wechat;
// }

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
