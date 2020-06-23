<template>
	<view>
		<view class="search-bar">
			<uni-search-bar bgColor="#F1F2F7" :value="searchValue" radius="100" cancelButton="none" placeholder="输入商品名称或关键字"
			 @confirm="search" />
		</view>
		<view class="search-content">
			<template v-if="searchList.length>0">
				<view class="empty" v-if="classifyName!=''">
					在“{{classifyName}}”下找到以下商品
				</view>
				<view class="u-f search-list" v-for="(item,index) in searchList" :key="index" @click="goDetail(item.id)">
					<view class="search-list-pic">
						<image :src="item.pic" mode="aspectFit"></image>
					</view>
					<view class="u-f u-column search-list-info">
						<view class="search-list-info-title">
							{{item.name}}
						</view>
						<view class="u-f">
							<view class="search-list-info-realprice">
								<text style="line-height: 2.0;">{{item.price/item.originalPrice*10|toFixed2}}折</text>
								<text>￥{{item.price|toFixed2}}</text>
							</view>
							<view class="search-list-info-price">
								<text>原价</text>
								<text>￥{{item.originalPrice|toFixed2}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="empty" v-if="classifyName!=''">
					<image src="/static/image/img_wnr@2x.png" mode=""></image> <text>在“{{classifyName}}”下未找到您要的商品，搜索其他试试吧~</text>
				</view>
			</template>
		</view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
	</view>
</template>

<script>
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	export default{
	    components: {uniLoadMore},
		data() {
			return {
	            ismore:false,
	            contentText: {
	                contentdown: '查看更多',
	                contentrefresh: '加载中',
	                contentnomore: '没有更多',
	            },
	            page:1,
	            size:10,
				searchValue: '',
				searchList: [],
				classifyId:'',
				classifyName:'',
				type:''
			};
		},
		onLoad(options) {
			this.searchValue = options.value
			this.classifyName = options.classifyName
			this.classifyId= options.classifyId
			this.type = options.type;
			this.searchProduct(this.searchValue)
		},
        onReachBottom() {
            console.log('onReachBottom')
            this.status = 'loading'
            uni.showNavigationBarLoading()
            
            this.page++
            this.searchProduct(this.searchValue)
        },
		methods: {
			searchProduct(input) {
				this.$api.communityProductList({
					size: this.size,
					page: this.page,
					keywords: input,
					classifyId:this.classifyId?this.classifyId:'',
				}).then(res => {
					console.log(res);
                    
					if (res.status == "OK") {
                        if(this.page == 1){
                            this.searchList = []
                            if(res.list.length>=this.size){
                                this.ismore = true
                            }
                        }
						res.list.map(item => {
							this.searchList.push({
								price: item.price / 100,
								originalPrice: item.originalPrice / 100,
								name: item.name,
								pic: JSON.parse(item.icon)[0].url,
								id: item.id
							})
						})
					}
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
				}).catch(err => {
					console.log(err);
				})
			},
			search(res) {
                this.searchValue = res.value
                this.page = 1
				this.searchProduct(this.searchValue)
			},
			goDetail(id){
				uni.navigateTo({
					url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${this.type}`,
				});
			},
		},
		filters: {
			toFixed2: function(value) {
				return value.toFixed(2);
			},
		}
	}
</script>

<style lang="scss">
	.search-bar {
		background-color: #FFFFFF;
	}

	.search-content {
		.search-list {
			background-color: #FFFFFF;
			border-radius: 30rpx;
			margin: 20rpx 32rpx;
			padding: 20rpx;

			.search-list-pic {
				width: 160rpx;
				height: 160rpx;
				border-radius: 30rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.search-list-info {
				padding-left: 30rpx;
				justify-content: center;
                flex: 1;
				&-realprice {
					color: #03BE90;
					font-weight: 500;

					text:nth-child(1) {
						font-size: 20rpx;
					}

					text:nth-child(2) {
						font-size: 24rpx;
					}
				}

				&-price {
					font-size: 20rpx;
					font-weight: 500;
					color: #A0A8BC;
					display: flex;
					align-items: center;
                    margin-top: 8upx;
                    margin-left: 30upx;
					text {
						position: relative;
						margin-left: 20rpx;
					}

					text:nth-child(2)::after {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						width: 100%;
						height: 1px;
						background-color: #A0A8BC;
					}
				}
			}
		}
	}

	.empty {
		padding: 30rpx 20upx;
		color: #A2A9BA;
		font-size: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 20px;
			height: 20px;
		}
        text{
            margin-left: 10upx;
            flex: 1;
        }
	}
    .search-list-info-title{
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>
