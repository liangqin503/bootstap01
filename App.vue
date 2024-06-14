<script>
	import Vue from 'vue'
	export default {
		globalData: {},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: (e) => {
					// 获取手机状态栏高度
					let statusBar = e.statusBarHeight
					let customBar
					
					// #ifndef MP
					customBar = statusBar + (e.platform == 'android' ? 50 : 45)
					// #endif
					
					// #ifdef MP-WEIXIN
					// 获取胶囊按钮的布局位置信息
					let menu = wx.getMenuButtonBoundingClientRect()
					// 导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
					customBar = menu.bottom + menu.top - statusBar
					// #endif
					
					// #ifdef MP-ALIPAY
					customBar = statusBar + e.titleBarHeight
					// #endif
					
					// 注意：此方法不支持原生Nvue页面
					Vue.prototype.statusBarH = statusBar
					Vue.prototype.customBarH = customBar
					
					// 支持nvue页面写法（兼容H5/小程序/APP/APP-Nvue）
					this.globalData.statusBarH = statusBar
					this.globalData.customBarH = customBar
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
