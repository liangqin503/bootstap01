<template>
	<!-- 确认支付密码 -->
		<u-keyboard @change="onChange"  :safe-area-inset-bottom="true"  @close="initPwd" ref="uKeyboard"  :random="true" v-model="showpwd" @backspace="onBackspace" mode="number" :dot-enabled="false"  default="" :tooltip="false" :mask-close-able="false">
			<view style="text-align: center;margin:30rpx auto;display: flex;justify-content: flex-start;width:680rpx;">
				<view style="100rpx">
					<u-icon name="close" @click="initPwd()"></u-icon>
				</view>
				<view style="width:580rpx;text-align:center">请输入密码</view>
			</view>
			<view style="margin:30rpx auto;">
				<u-message-input mode="bottomLine" font-size="26" :maxlength="pwd_num" :dot-fill="true" v-model="default_pwd" :disabled-keyboard="true"   value=""></u-message-input>
			</view>
		</u-keyboard>
</template>

<script>
	export default {
		name:"keyboard",
		data() {
			return {
				showpwd:false,
				default_pwd:'',
				pwd_num:6
			};
		},
		methods:{
			show(data){
				this.showpwd=true
			},
			onChange(val) {
				if (this.default_pwd.length < 6) {
					this.default_pwd += val;
				}
			
				if (this.default_pwd.length >= 6) {
					this.getPwd();//封装的结束函数，我是在后续还有请求接口和判断等
				}
			},
			// 键盘返回
			onBackspace(e) {
				if (this.default_pwd.length > 0) {
					this.default_pwd = this.default_pwd.substring(0, this.default_pwd.length - 1);
				}
				},
			initPwd(){
				console.log("空")
				this.showpwd=false
				this.default_pwd=''
			},
			getPwd(){
				this.showpwd=false
				this.$emit('getPwd',this.default_pwd)
				this.default_pwd=""
			},
		}
	}
</script>

<style>

</style>