<template>
	<view class="cont">
		<video class="myVideo" :src="formData.playUrl" @error="videoErrorCallback" autoplay controls></video>
	</view>
</template>

<script>
	import api from '../../common/api.js';
	export default {
		onLoad(option) {
			this.id = option.id
			this.getbackInfo(this.id)
		},
		data() {
			return {
				id: '',
				formData: {}
			}
		},
		methods: {
			getbackInfo(id) {
				// 获取关于我的直播
				api.getbackInfo({
					id: id
				}).then(res=>{
					this.formData = res.data
					
				})
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cont{ height:100vh; width:100vw;}
	.myVideo{ width: 100%; height:100%; }
</style>
