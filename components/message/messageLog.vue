<template>
	<view class="container">
		<u-popup v-model="showSuccess" mode="center" width='400' border-radius="15" :mask-close-able="false">
			<view style="width:100%;background-color: #fff;display: flex;align-items: center;flex-direction: column;padding-top:30rpx;border-radius: 20rpx;">
				<image src="../../static/zan.png" style="width:120rpx;height: 120rpx;margin:40rpx auto"></image>
				<view style="width:100%;margin:20rpx auto;margin-top:30rpx;text-align: center;font-size:40rpx;padding-bottom:30rpx ;color:#db1100">{{Msg}}</view>
			</view>
		</u-popup>
		<u-popup v-model="showFail" mode="center" border-radius="15" :mask-close-able="false">
			<view style="min-width:400rpx;background-color: #fff;display: flex;align-items: center;flex-direction: column;padding:30rpx;border-radius: 20rpx;overflow: hidden;">
				<image src="../../static/no.png" style="width:120rpx;height: 120rpx;margin:40rpx auto"></image>
				<view style="width:100%;margin:20rpx auto;margin-top:30rpx;text-align: center;font-size:40rpx;padding-bottom:30rpx ;color:#666">{{Msg}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				showSuccess:false,
				showFail:false,
				Msg:''
			}
		},
		methods:{
			showSu(Msg){
				this.showSuccess=true
				this.Msg=Msg
			},
			hideShow(){
				this.showSuccess=false
				this.showFail=false
			},
			showFa(errMsg){
				this.showFail=true
				this.Msg=errMsg
			},
			
		}
	}
</script>

<style scoped lang="scss">
	
</style>