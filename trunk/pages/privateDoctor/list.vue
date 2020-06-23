<template>
	<view class="cont">
		<view class="uni-padding-wrap swiperList">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" circular :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in swiperLists" :key="index" @tap="goInfo(item.id,'doctor')">
							<view class="swiper-item uni-bg-red">
								<image :src="item.url" style="width:100%; height:100%;"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view v-for="(item, index) in itemList" :key="index" class="itemlist" @tap="goInfo(item.id,'doctor')">
			<view class="img">
				<image :src="item.icon[0].url"></image>
			</view>
			<view class="texts">
				<view class="title">{{ item.name }}</view>
				<view class="desc">{{ item.description }}</view>
				<view class="price">￥<text class="f16">{{ item.price/100 }}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api.js';
	export default{
		onLoad(){
			this.getbannerList()
			this.getitemList()
		},
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true, //指示点
				autoplay: true, //自动播放
				interval: 2000,//自动播放间隔时长
				duration: 500 ,//幻灯片切换时长
				swiperLists: [],
				itemList: [],
				page: 1,
				size: 10,
				totalpage: 0
			}
		},
		methods: {
			goInfo(id,type) {
				uni.navigateTo({
				    url: `/pages/privateDoctor/info?id=${id}&type=${type}`
				})
			},
			getbannerList() {
				// 获取图片列表
				this.$api.doctorItemList({
					size: 999,
					page: 1,
					banner: 1
				}).then(res=>{
					this.swiperLists = []
					res.list.map(item=>{
						this.swiperLists.push({
							url:JSON.parse(item.bannerPic)[0].url,
							name:item.name,
							id:item.id
						})
					})
				})
			},
			getitemList() {
				// 获取列表
				this.$api.doctorItemList({
					size: this.size,
					page: this.page,
					keywords: ''
				}).then(res=>{
					this.totalpage = res.totalPages
					res.list.map(item=>{
						item.icon = JSON.parse(item.icon);
						this.itemList.push(item)
					})
				})
			}
		},
		onReachBottom() {
		    console.log('onReachBottom')
			if(this.page < this.totalpage) {
				this.status = 'loading'
				uni.showNavigationBarLoading()
				this.page++
				this.getitemList()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.swiperList{ padding: 30rpx 32rpx; background:#fff; }
	.swiper-item { height:100%; }
	.swiper{ border-radius:10rpx; overflow:hidden; }
	
	.uni-bg-red{ background: #f76260; }
	.uni-bg-green{ background: #09bb07; }
	.uni-bg-blue{ background: #007aff; }
	
	.itemlist{ background: #fff; border-radius:30rpx; overflow:hidden; box-sizing: border-box; margin:30rpx 32rpx;  padding:20rpx; display:flex; align-items: center;
		.img{ flex:3; height:240rpx; margin-right:40rpx;
			image{ width:100%; height:100%; border-radius:30rpx; }
		 }
		.texts{ flex:7;
			.title{ font-size:32rpx; font-weight: 500; line-height: 44rpx; }
			.desc{ font-size:26rpx; color:#A2A9BA; line-height: 40rpx; margin:16rpx 0 10rpx 0; max-height:80rpx; overflow:hidden; }
			.price{ font-size:24rpx; color:#03BE90; font-weight: 400; line-height: 44rpx;}
		  }
	}
	.f16{ font-size: 32rpx; }
</style>
