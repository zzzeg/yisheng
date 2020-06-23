<template>
	<!--我的明我-->
	<view class="cont">
		<view class="mine_top" style="background:url('https://coffer.bainuo.cn/mdt-pub/mine_bg@2x.png') no-repeat top center; background-size: 100% 100%; background-position: 0 -4rpx;;">
			<view class="user-section">
				<view class="cu-avatar">
					<image :src="formData.avatar" mode="aspectFill"></image>
				</view>
				<view class="color_fff">
					{{formData.name ? formData.name : ''}}
				</view>
			</view>
			<view class="items">
				<view class="item">
					<view class="text">{{ formData.reportCount }}</view>
					<view class="text">报告数</view>
				</view>
				<view class="item">
					<view class="text">{{ formData.communityJoin }}</view>
					<view class="text">加入服务站数</view>
				</view>
				<view class="item">
					<view class="text">{{ formData.totalMark }}</view>
					<view class="text">收藏数</view>
				</view>
			</view>
		</view>
		
		<view class="waiper">
			<view class="title">
				数字健康档案<text style="font-size:28rpx;">（全周期生命账户）</text>
			</view>
			<view class="disinline items" @tap="clickReport('advisory_report','驻站医生报告',1)">
				<view class="iimg"><image src="../../static/image/icons@2x(5).png" style="width:50rpx; height:60rpx;"></image></view>
				<view>驻站医生报告</view>
			</view>
			<view class="disinline items" @tap="clickReport('TONGUE_QUES,QUES,TONGUE,face_check,znwz','智能医生报告',1)">
				<view class="iimg"><image src="../../static/image/icons@2x(3).png" style="width:60rpx; height:52rpx;"></image></view>
				<view>智能医生报告</view>
			</view>
			<view class="disinline items" @tap="clickHealth">
				<view class="iimg"><image src="../../static/image/icons@2x(4).png" style="width:46rpx; height:54rpx;"></image></view>
				<view>健康风险报告</view>
			</view>
			<view class="disinline items" style="padding-top: 5px;" @tap="clickReport2('doctorReport','就医报告')">
				<view class="iimg"><image src="../../static/image/jybg@2x.png" style="width:46rpx; height:54rpx;"></image></view>
				<view>就医报告</view>
			</view>
			<view class="disinline items" style="padding-top: 5px;" @tap="clickReport2('checkupReport','体检报告')">
				<view class="iimg"><image src="../../static/image/tjbg@2x.png" style="width:46rpx; height:54rpx;"></image></view>
				<view>体检报告</view>
			</view>
            <view style="color: #A2A9BA;font-size:25upx; line-height: 1.5; padding: 0upx 30upx 68upx 30upx;">
                健康档案属于个人高度保密的私人文件，未经本人许可且授权，任何人都不得以任何形式对其进行查阅，详见<br> <text @click="navigateTo('/pages/aldiscriminate/pages/protocol')" style="color: #01AC82;" >《用户隐私政策》</text>
            </view>
		</view>
		
		<view class="waiper" style="margin-bottom: 20px;">
			<view class="disinline items" @tap="navigateTo('/pages/service-record/service-record')">
				<view class="iimg"><image src="../../static/image/icons@2x(1).png" style="width:60rpx; height:56rpx;"></image></view>
				<view>服务记录</view>
			</view>
			<view class="disinline items" @tap="navigateTo('/pages/serverStation/stationList')">
				<view class="iimg"><image src="../../static/image/icons@2x(2).png" style="width:60rpx; height:54rpx;"></image></view>
				<view>已加入服务站</view>
			</view>
			<view class="disinline items" @tap="navigateTo('/pages/mine/collectList')">
				<view class="iimg"><image src="../../static/image/icons@2x(6).png" style="width:60rpx; height:56rpx;"></image></view>
				<view>收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api.js';
	export default{
		data() {
			return {
				userInfo: uni.getStorageSync('userinfo'),
				formData: {}
			}
		},
		onLoad(option) {
			this.$store.state.communityId = '';
			this.userstatisticsInfo()

		},
		onShow() {
			this.$store.state.communityId = '';
		},
		methods: {
            clickReport:function(type,title,bought){
                uni.navigateTo({
                    url:'reportList?type='+type + '&title='+title+'&bought='+bought
                })
               
            },
			clickReport2:function(type,title){
				switch (type){
					case 'checkupReport':
						uni.navigateTo({
							url:'/pages/checkup-report/checkup-report'
						});
						break;
					case 'doctorReport':
						uni.navigateTo({
							url:'/pages/doctor-report/doctor-report'
						})
						break;
				}
                
            },
            clickHealth:function(){
                wx.navigateToMiniProgram({
                      appId: 'wxab951c0fe39a06c4', // 要跳转的小程序的appid
                      path: '/pages/index/index', // 跳转的目标页面
                      extarData: {
                        open: 'auth'
                      },
                      success(res) {
                        // 打开成功  
                      }
                }) 
            },
			userstatisticsInfo() {
				api.userstatisticsInfo().then(res=>{
					this.formData = res.data
				})
			},
			navigateTo(url) {
				uni.navigateTo({
				    url: url
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.cont{ height:100vh; background:#EFF1F6; overflow: auto; }
	.mine_top{ min-height:266rpx; }
	.user-section {	padding: 20rpx 0;font-size:24rpx;text-align: center;}
	.cu-avatar {
		image {
			width: 74rpx;
			height: 74rpx;
			border-radius: 74rpx;
		}
	}
	.color_fff {color: #FFFFFF;}
	.items{
		.item{
			display:inline-block; text-align:center;  vertical-align: middle;
			width:33%; position: relative;
			&:before{ content: ''; height:30rpx; width:1px; background:#fff; position: absolute; right:1px; top:calc(50% - 16rpx); }
			&:last-child:before{ background: none; }
			.text{ font-size:28rpx; line-height:40rpx; color:#fff;}
			.text+.text{ font-size:22rpx; }
		}
	}
	.waiper{ background:rgba(255,255,255,1);box-shadow:0px 4rpx 20rpx 0px rgba(85,112,105,0.1);border-radius:20rpx;
		margin:64rpx 32rpx 0 32rpx;
		.title{ font-size:32rpx; line-height:44rpx; padding:30rpx 28rpx 14rpx 28rpx; 
			border-bottom:solid 1px #EFF1F6; font-weight: 400;
		 }
		.items{ display:inline-block; width:33.333%; vertical-align: top; text-align: center; padding:50rpx 0 50rpx 0;
		font-size:24rpx; line-height:60rpx;
			.iimg{display: flex; align-items: center; height:60rpx; justify-content:center; }
		}
	}
</style>
