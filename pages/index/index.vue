<template>
	<view class="content">
		<u-popup v-model="showagreement" mode="center"  width="600" border-radius="14" :mask-close-able="false" >
				<view style="width:100%;height:100%;padding-bottom: 120rpx;background-color: #fff;">
					<view >
						<needknow></needknow>
					</view>
					<view class="agree-btn-box">
						<view @click="check1=true">
							<radio :checked="check1 == true" class="radio" :color="'#f00'" style="transform:scale(0.7)"/>勾选表示已阅读并同意
						</view>
						<button class="agree-btn" @click="toAgree">同意并继续</button>
					</view>
				</view>
		</u-popup>
		<view class="banner" >
			<swiper class="swiper-box" indicator-dots="true" autoplay="true" indicator-color="#fff" indicator-active-color="#b4a5ff" circular="true">
				<!-- v-for="item in bannerList" :key="item.id" -->
				<block  v-for="item in bannerList" :key="item.id">
					<swiper-item >
						<view class="swiper-item-r">
							<view class="" style="width: 100%;height:100%;" :style="{backgroundColor:item.color}"></view>
							<!-- <image  :src="item.img" style="width:100%;height:100%;" mode="widthFix" @click="toDetail(item)"></image>
							
							<video muted  v-if="item.type=='video'" @click="toshowVideo(item.image)" :src="item.image" style="width:100%;height:100%;"></video> -->
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!--  -->
		<view style="width:100%;padding:0 25rpx">
			<u-notice-bar type="success" :list="notice" width="100%"></u-notice-bar>
		</view>
		<view class="goods_list">
			<view class="goods-item" v-for="item in datalist" :key="item.id" >
				<view class="goods-head">
					<view style="text-align: center;margin:20rpx auto;font-size:28rpx;">
						<block v-if="item.time>0">
						开始倒计时：
						<u-count-down separator-color="#333"  bg-color="#000" font-size="28" color="#fff" separator="zh" ref="uCountDown" :timestamp="item.time" ></u-count-down>
						</block>
						<block v-else>
							已经开始啦
						</block>
					</view>
				</view>
				<view class="goods-body">
					<view class="goods-img">
						<image v-if="item.img" :src="item.img" style="width:100%;height:100%;"></image>
						<view v-else style="width:100%;height:100%;background-color: #d0f4d4;" ></view>
					</view>
					<view class="goods-info">
						<view class="goods_name">
							<view class="name">{{item.name}}</view>
							<view class="sign-in" v-if="item.is_qd==0" @click="toShowSign(item)">
								<view style="width:30rpx;height:30rpx;background: #f4af10;border-radius: 100%;display: flex;align-items: center;justify-content: center;margin-right:5rpx">
									<u-icon name="rmb-circle-fill" size="30" color="#ffff7f"></u-icon>
								</view>
								签到
							</view>
							<view class="sign-in" v-if="item.is_qd==1&item.is_yuyue==0" @click="toShowYuyue(item)">
								预约
							</view>
						</view>
						<view class="price">
							积分区间：<text style="color:red">{{item.min}}-{{item.max}}个</text>
						</view>
						<view class="price">
							价格区间：<text style="color:red">{{item.money_min}}-{{item.money_max}}元</text>
						</view>
						<view class="buy-btn" v-if="item.is_qd" @click="toBuy(item)">
							<image src="@/static/buy-btn.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 签到框 -->
		<u-modal v-model="showSign" width="70%" title="签到" :mask-close-able="true" @confirm="toSignin" content="消耗200个积分" confirm-text="立即签到"></u-modal>
		<u-popup v-model="showYuyue" mode="center">
			<view style="width:600rpx;height:430rpx;background-color: #fff;border-radius: 15rpx;">
				<view style="width:100%;line-height:70rpx;text-align:center">确定预约个数</view>
				<view style="width:70%;margin:50rpx auto;display: flex;align-items: center;justify-content: space-around;">
					<view class="action-btn" @click="yuyuwNum>1?yuyuwNum--:yuyuwNum=1">-</view>
					<input type="number" style="width:150rpx;margin:0 15rpx;text-align: center;border:1rpx solid #ddd;height:70rpx;padding:0;"  v-model="yuyuwNum"/>
					<view class="action-btn" @click="yuyuwNum<orderItem.sy_count?yuyuwNum++:yuyuwNum=orderItem.sy_count">+</view>
				</view>
				<view style="width:100%;text-align: center;">最多可预约{{orderItem.sy_count}}个</view>
				<button @click="comfirmYuyue" style="width:80%;color:#fff;font-size:30rpx;height:70rpx;line-height:70rpx;background: linear-gradient(#ed5d50,#db1100);border-radius: 50rpx;margin-top:40rpx">预约</button>
			</view>
		</u-popup>
		<!-- 确认购买框 -->
		<confirmbox ref="conbox" @confirmBuy="confirmBuy"></confirmbox>
		<!-- 密码框 -->
		<keyboard ref="keyboard" @getPwd="getPwd"></keyboard>
		<u-toast ref="uToast" />
		<!-- 自定义消息弹框 -->
		<myMessage ref="mymsg"></myMessage>
	</view>
</template>
<script>
	import needknow from '@/components/needknow.vue'
	import confirmbox from '@/components/confirmBox.vue'
	import keyboard from '@/components/keyboard/keyboard.vue'
	import myMessage from '@/components/message/messageLog.vue'
	export default {
		components:{
			needknow,
			confirmbox,
			keyboard,
			myMessage
		},
		data() {
			return {
				showagreement:false,
				check1:false,
				notice:['通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'],
				showSign:false,
				showYuyue:false,
				yuyuwNum:1,
				orderItem:{},
				buycount:1,
				datalist:[
					{
						time:30 * 60 * 60 * 1000,
						id:1,
						name:'产品1',
						is_qd:1,
						is_yuyue:0,
						min:20,
						max:200,
						money_min:300,
						money_max:2000,
						sy_count:4,
						
						e_time:1718370985
					},
					{
						time:-45,
						id:2,
						name:'产品1',
						is_qd:1,
						is_yuyue:1,
						min:20,
						max:200,
						money_min:300,
						money_max:2000,
						sy_count:4
					},
					{
						time:30 * 60 * 60 * 1000,
						id:3,
						name:'产品1',
						is_qd:0,
						is_yuyue:0,
						min:20,
						max:200,
						money_min:300,
						money_max:2000,
						sy_count:4
					}
				],
				timer:null,
				bannerList:[
					{
						id:1,
						color:'#b3c3c3'
					},
					{
						id:2,
						color:'#e1ffd5'
					},
					{
						id:3,
						color:'#fff9b7'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			
			// 同意
			toAgree(){
				if(this.check1){
					this.showagreement=false
				}else{
					this.$refs.uToast.show({
						title:'请先同意协议',
						type:'warning'
					})
				}
				
			},
			toShowYuyue(item){
				this.orderItem=item
				this.showYuyue=true
			},
			toBuy(item){
				item.s_time = (new Date().getTime())/1000
				item.time = (item.e_time-item.s_time).toFixed(0)
				this.buyItem=item
				this.$refs.conbox.show(item)
			},
			confirmBuy(count){
				console.log("数量--",count)
				const app=this
				this.buycount=count
				app.$refs.keyboard.show()
			},
			getPwd(pwd){
				const app=this
				setTimeout(()=>{
					app.$refs.conbox.hidebox()
					app.$refs.mymsg.showSu("购买成功")
					app.timer = setInterval(function() {
							app.$refs.mymsg.hideShow()
							clearInterval(app.timer)
					}, 3000);
				})
				
				// let param={
				// 	number:app.buycount,
				// 	id:app.buyItem.id,
				// 	pay_password:pwd
				// }
				// Api.toBuy(param).then(res=>{
				// 	console.log(res)
				// 	// app.$refs.uToast.show({
				// 	// 	title: '抢购成功，可往我的订单查看',
				// 	// 	type: 'success',
				// 	// 	// url: '/pages/user/index'
				// 	// })
				// 	app.successToast('恭喜抢购成功')
				// 	app.getInfo()
				// }).catch(err=>{
				// 	app.failToast(err)
				// 	// app.successToast('恭喜抢购成功')
				// }).finally(()=>{
				// 	app.$refs.conbox.hidebox()
				// })
			},
			// 签到
			toShowSign(item){
				this.showSign=true
				this.signItem=item
			},
			toSignin(){
				let app=this
				let id=this.signItem.id
				let list=this.datalist
				list.forEach(item=>{
					if(item.id==id){
						app.$set(item,'is_qd',1)
					}
				})
				this.datalist=list
				
				// let param={
				// 	id:this.signItem.id
				
				// }
				// Api.tosignIn(param).then(res=>{
				// 	// this.$refs.uToast.show({
				// 	//   title: "签到成功",
				// 	//   type: 'success',
				// 	// })
				// 	app.successToast('签到成功')
				// 	app.getInfo()
				// }).catch(err=>{
				// 	app.failToast(err)
				// })
			},
		}
	}
</script>

<style lang="scss">
	page{
		height:100%;
	}
	.content {
		height:100%;
		/* background-color: #e1cede; */
		/* display: flex; */
		/* flex-direction: column;
		align-items: center;
		justify-content: center; */
	}
.agree-btn-box{
		
		position: absolute;
		left:0;
		bottom: 0;
		width:100%;
		// height:140rpx;
		display: flex;flex-direction:column;
		padding:15rpx 20rpx;
		align-items: center;
		// margin:30upx auto;
	}
	.agree-btn{
		padding:0;height:70rpx;line-height: 70rpx;font-size:32rpx;width: 100%;
		border-radius: 50rpx;
		color:white;
		margin:10rpx auto;
		background: linear-gradient(to right,#ed5d50,#db1100);
	}
	/deep/.u-mode-center-box{
			background-color: transparent !important;
		}
	
.banner{
		width:100%;
		padding:0 25rpx;
		height:373rpx;
		overflow: hidden;
		margin-bottom: 10rpx;
		border-radius: 15rpx;
		margin-top:20rpx;
		.swiper-box{
			width:100%;height:100%;
		}
		.swiper-item-r{
			width:100%;height:100%;overflow: hidden;border-radius: 15rpx;
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
	.goods_list{
		width:100%;
		padding:0rpx 30rpx 0 30rpx;
		padding-bottom: 120rpx;
		.goods-item{
			position: relative;
			width:100%;
			border-radius: 30rpx;
			margin:30rpx auto;
			// background: linear-gradient(to left top,#6cb091,#88ddb6);
			box-shadow: 5rpx 5rpx 5rpx #ddd;
			overflow: hidden;
			.goods-head{
				width:100%;
				display: flex;
				align-items: center;
				justify-content: center;
				height:80rpx;
				background:linear-gradient(#fde2a7,#fac870);
				
			}
			.goods-body{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding:25rpx 10rpx;
				background-color: #fffff3;
				.goods-img{
					width:250rpx;
					height:200rpx;
					margin-right:20rpx;
				}
				.goods-info{
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: flex-start;
					min-width:400rpx;
					.goods_name{
						width:100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 15rpx;
						// max-width: 500rpx;
						
						.name{
							font-size:30rpx;
							font-weight: bold;
						}
						.sign-in{
							height:55rpx;
							width:150rpx;
							line-height: 55rpx;
							border-radius: 50rpx;
							background: linear-gradient(to right,#00e7a1,#08b0d1);
							// box-shadow: 5rpx 5rpx 10rpx #6eb393;
							display: flex;
							align-items:center;
							justify-content: center;
							font-size:26rpx;
							color:#fff;
						}
					}
					.price{
						width:100%;
						font-size:28rpx;
						color:#666;
						margin:5rpx 0;
					}
					.percent-class{
						width:400rpx;
						// display: flex;align-items: center;justify-content: center;color:#ffaa00;
						font-size:26rpx;
						margin-top:20rpx;
					}
					.buy-btn{
						width:360rpx;
						color:white;
						height:86rpx;
						border-radius: 20rpx;
						margin-top:15rpx;
						& image{
							width:100%;
							height:100%;
						}
					}
				}
			}
			
			
		}
	}
</style>
