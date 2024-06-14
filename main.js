import App from './App'
import defaultData from '@/defaultdata/store-data.js'
// #ifndef VUE3
	import Vue from 'vue'
	import './uni.promisify.adaptor'
	import uView from '@/uni_modules/uview-ui'
	Vue.use(uView)
	Vue.config.productionTip = false
	App.mpType = 'app'
	const app = new Vue({
	  ...App,
	  created:defaultData
	})
	app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif