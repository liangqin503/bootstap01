<template>
	<!-- ,background:backgroundColor?(backgroundColor!='none'?'linear-gradient(to right, '+backgroundColor+')':'none'):'linear-gradient(to right,  #735ff7, #537afb)' -->
	<view class="nav_main" :style="{height:(customHeight)+'px',background:background?(background.length>1?'linear-gradient(to right,'+background[0]+','+background[1]+')':background):'linear-gradient(to right,  #735ff7, #537afb)'}">
		
		<view class="nav-box" :style="{height:(customHeight)+'px'}">
			<view class="nav-title" :style="{marginTop:marginTop+'px',color:titleColor}">
				<slot name="icon"></slot>
				<view>{{title?title:''}}</view>
			</view>
		</view>
		<slot name="bottom"></slot>
	</view>
</template>
<script>
	export default{
		props:{
			title:String,
			titleColor:String,
			backgroundColor:String,
		},
		data() {
			return {
				customHeight:0,
				marginTop:20,
				background:''
			}
		},
		onLoad() {
			console.log('页面？？？？')
		},
		created(){
			// initCustomH(){
				this.background=this.backgroundColor?this.backgroundColor.split(','):''
				console.log('颜色',this.background)
				this.customHeight=this.customBarH
			// }
			
		},
		computed:{
			getPosition(){
				let customh=this.customBarH
				let textH=(uni.getSystemInfoSync().windowWidth/750)*70
				console.log("margin-top:"+(customh-textH))
				console.log(this.title)
				this.marginTop=customh-textH-3
			}
		}
	}
</script>
<style>
	.nav_main{
		position: fixed;
		top:0;
		left: 0;
		margin:auto;
		display: flex;
		width:100%;
		/* max-width: 750rpx; */
		
		background: linear-gradient(to right,  #735ff7, #537afb);
		/* border:1rpx solid #ff00ff; */
		z-index: 1024;
	}
	.nav-box{
		
		width:700rpx;
		margin:0 25rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/* border:1rpx solid #00C989; */
		/* border:1rpx solid white; */
	}
	.nav-title{
		font-family: normal;
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		width:100%;height:60rpx;line-height: 60rpx;left:0;font-size:32rpx;color:#333;
	}
</style>
