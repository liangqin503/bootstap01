<template>
	<view class="content">
		<view class="test-p">4灰色空间合肥市第三大飞机</view>
	</view>
</template>
<script>
	// 倒计时时长(秒)
	const times = 60
	const papp=getApp()
	import navbar from '@/components/navbar/navbar.vue'
	import store from '@/store/index.js'
	export default {
		components:{
			navbar
		},
		data() {
			return {
				customHeight:30,
				model1: {
					userInfo: {
						username: '',
						scalecode: '',
					},
				},
				isloading:false,
				smsState:false,
				times,
				rules: {
					'userInfo.username': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.scalecode': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onReady(){
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			// 点击发送短信验证码
			handelSmsCaptcha() {
			  const app = this
			  // if (!app.isLoading && !app.smsState && app.formValidation(GET_CAPTCHA)) {
			  //   app.sendSmsCaptcha()
			  // }
			  if(this.model1.userInfo.username==''){
				  app.$refs.uToast.show({
					  title:'先填写手机号',
					  type:'warning'
				  })
				return
			  }
			  app.isloading=true
			  setTimeout(()=>{
				  app.isloading=false
				  app.$refs.uToast.show({
					  title:'短信发送成功',
					  type:'success'
				  })
				  app.timer()
			  },1000)
			  
			},
			// 执行定时器
			timer() {
			  const app = this
			  app.smsState = true
			  const inter = setInterval(() => {
			    app.times = app.times - 1
			    if (app.times <= 0) {
			      app.smsState = false
			      app.times = times
			      clearInterval(inter)
			    }
			  }, 1000)
			},
			wxLogin(){
				const app=this
				wx.canIUse('getUserProfile') && wx.getUserProfile({
				  lang: 'zh_CN',
				  desc: '获取用户相关信息',
				  success({ userInfo }) {
				    console.log('用户同意了授权')
				    console.log('userInfo：', userInfo)
				    // 授权成功事件
				    app.onAuthSuccess(userInfo)
				  },
				  fail() {
				    console.log('用户拒绝了授权')
				  }
				})
			},
			onAuthSuccess(userInfo){
				console.log()
			},
			login(){
				
			},
			getData(data){
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
						if(data==1){
							resolve('success')
						}else{
							console.log('失败')
							reject('fail')
						}
						
					},1000)
				})
			},
			
		},
		onLoad() {
			this.customHeight=this.customBarH
			console.log('自定义高度',papp.globalData.customBarH)
		},
		onPullDownRefresh() {
			let flag=0
			this.getData(flag).then((res)=>{
				console.log(res)
			}).catch(err=>{
				
			}).finally(()=>{
				uni.stopPullDownRefresh()
				console.log('停止刷新动画')
			})
			
		}
	}
</script>

<style scoped>
	.content{
		/* padding: 0 60rpx; */
	}
	.test-p{
		position: fixed;
		top:0;
		left:50%;
		max-width:750px;
		width:100%;
		height:100rpx;
		background-color: #ff5500;
		transform:translate(-50%,0) ;
	}
</style>
