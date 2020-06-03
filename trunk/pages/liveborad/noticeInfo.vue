<template>
	<view class="cont">
		<!--直播预告-->
		<view class="box">
			<view class="disinline" style="width:5em;">
				直播主题：
			</view>
			<view class="disinline" style="width:calc(100% - 5em);">
				{{ formData.title }}
			</view>
			<view class="disinline" style="width:5em; margin-top:10rpx;">
				开播时间：
			</view>
			<view class="disinline color_gray" style="width:calc(100% - 5em); margin-top:10rpx;">
				{{ formData.startTime }}
			</view>
			
			<view class="linethrough"></view>
			
			<view class="title">
				特邀专家：
			</view>
			<view class="disinline" style="width:100rpx; height:100rpx; vertical-align: middle; margin-right:30rpx; border-radius: 100rpx; overflow:hidden;">
				<image :src="formData.avatar[0].url" style="width: 100%; height:100%;" mode=""></image>
			</view>
			<view class="disinline" style="width:calc(100% - 130rpx); vertical-align: middle;">
				<view class="titleb" style="font-size:36rpx; line-height: 50rpx;;">
					{{ formData.name }}
				</view>
				<view class="color_gray" style="line-height: 40rpx;;">
					{{ formData.rank }}
				</view>
			</view>
			<view style="font-size:26rpx; margin:20rpx 0;">
				{{ formData.remark }}
			</view>
			<view class="linethrough"></view>
			
			<view class="title">
				直播内容：
			</view>
			<view class="notice color_gray">
				{{ formData.content }}
			</view>
			
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import api from '../../common/api.js'
	export default {
		data() {
			return {
				id: '',
				formData: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getinfo(this.id)
		},
		methods: {
			getinfo(id) {
				api.liveFindById({
					id: id
				}).then(res=>{
					this.formData = res.data
					this.formData.startTime = util.formatTimestamp(this.formData.startTime, 'yyyy年MM月dd日 hh:mm')
					this.formData.endTime = util.formatTimestamp(this.formData.endTime, 'yyyy年MM月dd日 hh:mm')
					this.formData.avatar = JSON.parse(this.formData.avatar)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.disinline{ display:inline-block; vertical-align: top; }
	.color_gray{ color:#868E9D }
	.cont{ background: #EFF1F6;overflow: hidden;height: 100vh; font-size:28rpx; line-height:36rpx;
		.box{ margin:40rpx 32rpx; border-radius:20rpx; background: #fff; padding: 40rpx 26rpx 40rpx 26rpx;}
	}
	.linethrough { border-bottom:solid 1px #EFF1F6; margin:20rpx 0 30rpx 0;}
	.notice{ line-height: 60rpx; font-size:28rpx; overflow: hidden;
		&:before{ content: ''; display:inline-block; width:20rpx;height:20rpx;border:1px solid rgba(99,196,128,1); 
		border-radius: 20rpx; vertical-align: middle; margin-right:10rpx;}
	}
	.title{ font-weight:500; line-height: 40rpx; margin: 0 0 20rpx 0; }
</style>
