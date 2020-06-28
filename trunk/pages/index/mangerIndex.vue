<template>
	<view class="content">
		<image class="logo" src="https://coffer.bainuo.cn/mdt-pub/img_gjzy_bg.png"></image>
		<view class="login-box">
			<view class="boxxxx"></view>
			<view class="headerBox">
				<image :src="doctor.pics[0].url" mode=""></image>
			</view>
			<view style="color: #2A3441;font-size: 38upx;">
				{{doctor.name?doctor.name:''}}
			</view>
			<view class="headerText">
				<text style="color: #2A3441;">管家活跃榜：</text> {{'第' + doctor.rank?doctor.rank:'100+' + '名'}}
			</view>
		</view>
		<view class="menuBox">
			<view style="display: flex;flex-direction: row;">
				<view @click='clickMenu(0)' class="menuText">管家分享</view>
				<view @click='clickMenu(1)' style="text-align: center;" class="menuText">健康职业证</view>
				<view @click='clickMenu(2)' style=" text-align: right; padding-right: 10rpx;" class="menuText">管家推荐</view>
			</view>
			<view style="background: #E2E6EF; width: 100%; height: 6upx;border-radius: 3upx;">
				<view v-if="current == 0" class="menuLine"></view>
				<view v-if="current == 1" class="menuLine" style="margin-left: 264upx;"></view>
				<view v-if="current == 2" class="menuLine" style="margin-left: 528upx; padding-right: 10rpx;"></view>
			</view>
		</view>
		<view v-if="current == 0" class="">
			<view class="product">
				<view v-if="shareList.length > 0" class="u-f h-wrap">
					<block v-for="(item,index) in shareList" :key="index">
						<h-share-list :item="item" @click="goDetail"></h-share-list>
					</block>
				</view>
				<view class="empty" v-else>
					<image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
					<view class="empty-tips">暂无分享内容~</view>
				</view>
				<view v-if="ismore">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>
			</view>
		</view>
		<view v-if="current == 1" class="">
			<view class="imgList" v-for="(xx,xi) in info.pics" :key="xi">
				<image class="zhengjianimg" :src="xx.url" mode="aspectFill" />
				<view class="name" style="text-align: center;">
					{{ xx.content }}
				</view>
			</view>
		</view>


		<view v-if="current == 2">
			<view class="top-content">
				<uni-search-bar radius="100" cancelButton="none" placeholder="输入商品名称/功效" @confirm="search" />
			</view>
			<template v-if="productList.length > 0">
				<view class="product">
					<view class="u-f h-wrap">
						<view class="u-f u-column health-list" v-for="(item,index) in productList" :key="index" @tap="goDetail1(item.id,'community')">
							<image :src="item.pic" mode="aspectFill"></image>
							<view class="health-list-title">{{item.name}}</view>
							<view class="health-list-price">
								<view class="price" style="font-size: 24rpx; font-weight: 600;"><text>{{ item.price/item.originalPrice*10 | toFixed2}}折</text>￥{{item.price | toFixed2}}</view>
								<view style="font-size: 20rpx; color:#A0A8BC;">原价<text style="font-size:22rpx;">￥{{item.originalPrice | toFixed2}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="wait-content">
					<image src="../../static/healthy-mall/img_sjz.png" mode="aspectFit"></image>
					<view class="">
						暂无推荐...
					</view>
				</view>
			</template>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				doctor: {},
				current: 0,
				communityId: '',
				page: 1,
				size: 10,
				ismore: false,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多',
				},
				shareList: [],
				info: {
					pics: []
				},
				searchValue: '',
				productList: [{
					name: '测试名字',
					price: '1223.213',
					originalPrice: '12123.1',
					pic: "http://coffer-cdn.bainuo.cn//useravatar-pub/98/98eda25dd8926bdf62ac79190b5340ac.jpg"
				}],
				totalPages: 1,
			}
		},
		onLoad(options) {
			this.current = options.current
			this.communityId = this.$store.getters.communityId
			// console.log('communityId is',this.communityId)
			// 第一次肯定是进第一个tab项，不用判断
			// this.getData()
			this.refreshSomeOne()
			this.getmanagerInfo()
		},
		onPullDownRefresh() {
			this.page = 1
			this.refreshSomeOne()
		},
		onReachBottom() {
			if (this.totalPages <= this.page) {
				return false
			}
			this.status = 'loading'
			uni.showNavigationBarLoading()

			this.page++
			this.refreshSomeOne()
		},
		filters: {
			toFixed2: function(value) {
				return Number(value).toFixed(2);
			},
		},
		methods: {
			getmanagerInfo() {
				this.$api.findCommunityById({
					data: {
						id: this.communityId
					}
				}).then(res => {
					if (res.status == "OK") {
						this.doctor = res.data
						this.doctor.pics = JSON.parse(res.data.mangerAvatar)
					}
				})
			},
			clickMenu: function(tag) {
				this.current = tag
				// 重置page
				this.page = 1
				this.refreshSomeOne()
			},
			refreshSomeOne() {
				// 根据不同的tab标签  去加载对应栏目的内容
				switch (parseInt(this.current)) {
					case 0:
						this.getData()
						break
					case 1:
						this.getPics()
						break
					case 2:
						this.getProduct()
						break
				}
			},
			getData() {
				this.$api.marketMaterialPage({
					page: this.page,
					size: this.size,
					communityId: this.communityId,
					type: 'COMMUNITY', //MATERIAL PRODUCT COMMUNITY
					keywords: '',
					classifyId: ''
				}).then(res => {
					console.log(res);
					if (res.status == "OK") {
						if (this.page == 1) {
							this.shareList = []
							if (res.list.length >= this.size) {
								this.ismore = true
							}
						}
						res.list.map(item => {
							this.shareList.push(item)
						})
						this.totalPages = res.data.totalPages
						console.log('this.shareList is ', this.shareList)
					}
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading()
				}).catch(err => {
					console.log(err);
				})
			},
			getPics() {
				let that = this
				that.$api.findByCommunityId({
					communityId: that.communityId
				}).then(res => {
					if (that.page == 1) {
						that.info.pics = []
					}
					res.data.map(item => {
						item.pics = JSON.parse(item.pics)
						that.info.pics.push(item.pics)
					})
					console.log('info.pics is', res.data[0].pics)
					console.log('info.pics 22222', that.info.pics)
				})
			},
			search(res) {
				this.page = 1;
				this.searchValue = res.value;
				this.getProduct()
			},
			getProduct() {
				let that = this
				this.$api.communityBestPorductPage({
					communityId: this.communityId,
					keywords: this.searchValue,
					size: this.size,
					page: this.page,
				}).then(res => {
					if (res.status == "OK") {
						console.log('this.res is ', res)
						if (that.page == 1) {
							that.productList = [];
						}
						res.list.map(item => {
							that.productList.push({
								price: item.price / 100,
								originalPrice: item.originalPrice / 100,
								name: item.name,
								pic: JSON.parse(item.pics)[0].url,
								id: item.id,
								code: item.code
							})
						})
						this.totalPages = res.data.totalPages
					}
				}).catch(err => {
					console.log(err);
				})
			},
			goDetail({id,type}) {
				if (type == 'VIDEO') {
					uni.navigateTo({
						url: `/pages/housekeeper-sharing-video/housekeeper-sharing-video?id=${id}`,
					});
				} else {
					uni.navigateTo({
						url: `/pages/housekeeper-sharing-img/housekeeper-sharing-img?id=${id}`,
					});
				}
			},
			goDetail1(id, type){
				uni.navigateTo({
					url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${type}`,
				});
			},
		}
	}
</script>

<style lang="scss" scope>
	page {
		background: #EFF1F6;
	}

	.content {
		text-align: center;
		font-size: 29upx;
		color: #434E5E;
	}

	.logo {
		height: 264upx;
		width: 100%;
		position: absolute;
		left: 0upx;
		top: 0upx;
		z-index: -99;
	}

	.login-box {
		width: 683upx;
		height: 224upx;
		/* margin-top: -310upx; */
		position: relative;
		margin-top: 125upx;
		margin-left: 33upx;
	}

	.boxxxx {
		position: absolute;
		z-index: -97;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0upx 42upx 208upx 0upx rgba(22, 32, 46, 0.15);
		border-radius: 31upx;
		height: 220upx;
		top: 84upx;
	}

	.headerBox {
		width: 168upx;
		height: 168upx;
		margin-top: -84upx;
		background: #FFFFFF;
		border-radius: 50%;
		margin-left: calc(50% - 84upx);

	}

	.headerBox image {
		margin: 8upx;
		width: 152upx;
		height: 152upx;
		border-radius: 50%;
		background: #F8F8F8;
	}

	.menuBox {
		margin: 150upx 40upx 0upx 40upx;
	}

	.menuText {
		width: 100%;
		text-align: left;
		height: 60rpx;
		padding-left: 10rpx;
	}

	.menuLine {
		width: 128upx;
		height: 100%;
		border-radius: 3upx;
		background: #03BE90;
	}

	@mixin pad-left {
		padding: 0 20rpx;
	}

	.product {
		padding: 30rpx 36rpx;

		.h-wrap {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.health-list {
			margin-bottom: 40rpx;
			padding-bottom: 16rpx;
			width: 320rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			overflow: hidden;

			image {
				width: 320rpx;
				height: 310rpx;
			}

			&-title {
				font-size: 24rpx!important;
				font-weight: 500;
				height: 2em;
				line-height: 2;
				overflow: hidden;
				color: #16202E;
				text-align: left;
				@include pad-left
			}

			&-price {
				font-weight: 500;
				color: #03BE90;
				margin-right:10rpx;
				view {
					font-size: 30rpx;
					margin-left: 10rpx;

					&.price {
						text {
							font-size: 20rpx;
							margin-right: 16rpx;
						}
					}
				}

				view:nth-child(2) {
					text {
						margin-left: 16rpx;
						position: relative;
						font-size: 22rpx;
						color: #C6CAD4;

						&::after {
							font-size: 24rpx;
							content: '';
							position: absolute;
							left: 0;
							top: 49%;
							width: 100%;
							height: 1px;
							background-color: #A0A8BC;
						}
					}
				}
			}
		}
	}
	.product{
		>.h-wrap{
			>.health-list{
				>.health-list-title{ font-size:30rpx!important; font-weight:500; line-height: 42rpx; margin:10rpx 0 0 0;}
				>.health-list-price{ text-align:left; padding:0 20rpx;
					> view{margin:0; line-height:34rpx;}
				 }
			}
		}
	}
	.imgList {
		margin-top: 60rpx;
	}

	.zhengjianimg {
		width: 60vw;
		height: 36vw;
	}

	.empty {
		text-align: center;

		.empty-img {
			margin-top: 52rpx;
			width: 360rpx;
			height: 320rpx;
		}

		.empty-tips {
			color: #A2A9BA;
			font-size: 32rpx;
			line-height: 48rpx;
		}
	}
</style>
