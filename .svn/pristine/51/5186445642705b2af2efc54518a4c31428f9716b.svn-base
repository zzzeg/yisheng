<template>
	<view class="cont">
		<video class="myVideo" :src="formData.videoUrl" @error="videoErrorCallback" autoplay controls></video>
		<view class="title">{{formData.title}}</view>
		<view class="from">来源：{{formData.author}}</view>
		<h-community-share :info="communityInfo" v-if="communityId"></h-community-share>
	</view>
</template>

<script>
	import api from '../../common/api.js';
	export default {
		onLoad(option) {
			this.id = option.id
			this.communityId = option.communityId
			this.getMyhvideo(this.id)
			if(this.communityId){
				this.getCommunityByIdOmit(this.communityId)	
			}
		},
		data() {
			return {
				id: '',
				formData: {},
				communityId: '',
				communityInfo: {}
			}
		},
		methods: {
			getMyhvideo(id) {
				// 获取关于我的直播
				api.getMyhVideo({
					id: id
				}).then(res=>{
					this.formData = res.data
				})
			},
			getCommunityByIdOmit (id) {
				this.$api.getCommunityByIdOmit({
					id: id
				}).then(res => {
					if(res.status=="OK"){
						this.communityInfo = res.data
					}
				})
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			onShareAppMessage () {
				return {
					title: this.formData.title,
					path: `pages/liveborad/share?id=${this.formData.id}&communityId=${this.communityId}`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myVideo{ width: 100%; height: 326rpx; }
	.title{
		color: #16202E;
		font-size: 28rpx;
		line-height: 36rpx;
		padding: 54rpx 32rpx 16rpx;
	}
	.from{
		padding: 0 32rpx;
		color: #868E9D;
		font-size: 24rpx;
		line-height: 36rpx;
	}
</style>
