<template>
	<view class="content">
		
		<navbar titleColor="#fff" backgroundColor="#0BCF67" title="个人中心">
			<u-icon slot="icon" name='arrow-left' color='#fff' size="40" style="margin-right:20rpx;text-shadow:5rpx 5rpx 5rpx #a67b25;" @click="toBack"></u-icon>
		</navbar>
		<view :style="{paddingTop:customHeight+'px'}">
		<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn" @click.stop="wxLogin">登录</button>
			<view class="auth-title">登录申请获取以下权限</view>
			<view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		
			<u-form
							labelPosition="left"
							:model="model1"
							ref="uForm"
							labelWidth="auto"
					>
						<u-form-item
								label="用户名"
								prop="userInfo.username"
								borderBottom
								ref="item1"
						>
						<u-input
								v-model="model1.userInfo.username" 
										placeholder="手机号" :custom-style="{marginLeft:'20rpx'}"></u-input>
						</u-form-item>
						
						<u-form-item
								label="验证码"
								prop="userInfo.scalecode"
								borderBottom
								ref="item2"
						>
						<u-input
								v-model="model1.userInfo.scalecode" 
										placeholder="验证码" :custom-style="{marginLeft:'20rpx'}"></u-input>
						<view slot="right" >
							<button :loading="isloading"  v-if="!smsState" @click="handelSmsCaptcha"  class="custom-style">获取验证码</button>
							<text v-else class="un-activate">重新发送({{ times }})秒</text>
						</view>
						<!--  -->
						</u-form-item>
						</u-form>
			<button class="login-btn" @click="login">登录</button>
		<!-- #endif -->
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	// 倒计时时长(秒)
	const times = 60
	const papp=getApp()
	import navbar from '@/components/navbar/navbar.vue'
	import store from ''
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
		padding: 0 60rpx;
	}
	.custom-style{
		font-size:20rpx;
		padding:0;
		padding: 0rpx 10rpx;
		background-color:#0BCF67;
		color:#fff
	}
	.un-activate{
		font-size: 24rpx;
	}
	.login-btn{
		width:70%;
		height:90rpx;
		line-height: 90rpx;
		background-color: #0BCF67;color:#fff;
		font-weight: 500;
		border-radius: 50rpx;
		margin-top:200rpx;
		margin-bottom:30rpx;
	}
	.auth-title {
	  color: #585858;
	  font-size: 34rpx;
	  margin-bottom: 40rpx;
	}
	
	.auth-subtitle {
	  color: #888;
	  margin-bottom: 88rpx;
	  font-size: 28rpx;
	}
</style>
