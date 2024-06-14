<template>
	<!-- 购买窗口 -->
	<u-popup v-model="showPannel" mode="center" border-radius="14" width="650" :closeable="closeable" @close="closeBuyPannel" close-icon="#fff" :custom-style="customStyle">
			<view class="buy-pannel-box">
				<view class="bg">
					<image src="../static/buy-title.png" style="width:100%;height:163rpx;position: absolute;left:0;top:20rpx;" mode="aspectFit"></image>
					<view class="buy_name">{{buyitem.name}}</view>
				</view>
				<view class="price-box">
					<view class="price-item">
						<!-- <view class="price">
							<text>价格区间</text>
							<view class="price-data">{{buyitem.money_min+'~'+buyitem.money_max}}<text style="font-size:26rpx;margin-left:5rpx">元</text></view>
						</view>
						<view class="price">
							<text>积分区间</text>
							<view class="price-data">{{buyitem.min+'~'+buyitem.max}}<text style="font-size:26rpx;margin-left:5rpx">积分</text></view>
						</view> -->
						<view class="price">
							<block v-if="buyitem.time>0">
							<text style="margin-bottom: 10rpx;">开始倒计时</text>
							<view class="price-data" style="margin:30rpx 0;"><u-count-down separator-color="#ff0000"  bg-color="#ff0000" font-size="34" color="#fff" separator="zh" ref="uCountDown" :timestamp="buyitem.time" ></u-count-down></view>
							</block>
							<block v-else>
								<view class="price-data" style="font-size:32rpx;">已经开始啦</view>
							</block>
						</view>
						<view style="width:100%;display: flex;justify-content: center;align-items:center;margin:30rpx auto;">
							<view class="action-btn"  @click="subNum">-</view>
							<input type="number" style="width:150rpx;margin:0 15rpx;text-align: center;border:1rpx solid #ddd;height:70rpx;padding:0;" @input="getCount" v-model="buycount"/>
							<view class="action-btn" @click="addNum">+</view>
						</view>
						<view style="width:100%;margin-top:30rpx;margin-bottom:30rpx;text-align: center;">
							<text >您今日可抢{{buyitem.sy_count}}个</text>
						</view>
						<view class="btn-box">
							<button class="rent-btn" @click="rentNow(buyitem)">立即购买</button>
						</view>
					</view>
				</view>
				
			</view>
		</u-popup>
</template>

<script>
	export default{
		data(){
			return{
				closeable:true,
				buycount:1,
				customStyle:{
					backgroundColor:'rgba(255,255,255,0)'
				},
				showPannel:false,
				buyitem:{},
			}
		},
		props:{
			
			
		},
		
		methods:{
			
			show(data){
				this.buyitem=data
				this.showPannel=true
			},
			hidebox(){
				this.showPannel=false
			},
			closeBuyPannel(){
				this.buycount=1
				this.showPannel=false
				console.log("这里")
				this.$emit('cancel',false)
			},
			subNum(){
				console.log('减')
				let num=this.buycount
				if(num>1){
					this.buycount=num-1
				}
			},
			getCount(e){
				let count=parseInt(e.detail.value)
				if(count){
					let snum=this.buyitem.order_count
					if((count)<=snum){
						count=count
					}else{
						count=this.buyitem.sy_count
					}
					this.$nextTick(() => {
						this.buycount= count
					})
				}
			},
			addNum(){
				console.log("加")
				let num=parseInt(this.buycount) 
				let snum=this.buyitem.sy_count
				if(num<snum){
					this.buycount=num+1
				}
			},
			toTicket(){
				uni.navigateTo({
					url:'./ticket'
				})
			},
			// 长按最大
			toMax(){
				console.log("长按")
				this.buycount=this.buyitem.buy_limit-this.buyitem.order_count
			},
			rentNow(){
				console.log('数量',this.buycount,this.buyitem)
				this.$emit('confirmBuy',this.buycount)
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.buy-pannel-box{
		width: 100%;
		overflow: hidden;
		padding-bottom: 30rpx;
		.bg{
			position: relative;
			width:100%;
			background-color: blue;
			z-index:5;
		}
		.buy_name{
			position: absolute;
			left:0;
			top:20rpx;
			width:100%;
			font-size:45rpx;
			line-height:150rpx;
			color:#fff;
			text-align: center;
			text-shadow:3px 3px 3px #7167f7;
		}
		.price-box{
			position: relative;
			margin-top:0rpx;
			z-index:0;
			width:600rpx;
			margin:0 auto;
			padding:0 40rpx;
			
			.price-item{
				background-color: #fff;
				border-radius: 10rpx;
				padding-bottom: 30rpx;
				padding-top:170rpx;
				.price{
					width:100%;margin:30rpx auto;text-align: center;
				}
				.price-data{
					width:100%;margin:10rpx auto;font-size:32rpx;color:red;text-align: center;
				}
				.title-icon{
					width:100%;
					display: flex;
					align-items: center;
					justify-content: center;
					& image{
						width:180rpx;
						height:180rpx;
						margin-top: -50rpx;
					}
				}
			}
		}
		.btn-box{
			margin-top:50rpx;
			width:100%;
			padding:0 40rpx;
			.rent-btn{
				width:100%;
				height:75rpx;
				padding:0;
				line-height: 75rpx;
				background: linear-gradient(#ed5d50,#db1100);
				color:#fff;
				border-radius: 40rpx;
				font-size: 30rpx;
				// color:rgba($color: #ffc5aa, $alpha: 0)
			}
		}
	}
	.action-btn{
		border:1rpx solid #FEC56F;
		background-color:#FDF6EC ;
		color:#FEC56F;
		padding:15rpx;
		width:80rpx;
		// height:80rpx;
		line-height: 40rpx;
		text-align: center;
		font-size:50rpx;
		marign:0 10rpx;
		border-radius: 10rpx;
	}
	/deep/.u-mode-center-box{
			background-color: transparent !important;
		}
</style>