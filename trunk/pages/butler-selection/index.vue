<template>
	<!--管家精选-->
	<view class="cont">
        <view class="top-content">
        	<uni-search-bar radius="100"  cancelButton="none" placeholder="输入商品名称或关键字" @confirm="search" />
        	<!-- <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
        		<view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="ontabtap">
        			<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.label}}</text>
        		</view>
        	</scroll-view> -->
        </view>
		<template v-if="productList.length > 0">
			<view class="product">
				<view class="u-f h-wrap">
					<view class="u-f u-column health-list" v-for="(item,index) in productList" :key="index" @tap="goDetail(item.id,'community')">
						<image :src="item.pic" mode="aspectFill"></image>
						<view class="health-list-title">{{item.name}}</view>
						<view class="health-list-price">
							<view class="price"><text>{{  item.price/item.originalPrice*10 | toFixed2}}折</text>￥{{item.price | toFixed2}}</view>
							<view class="color_gre" style="font-size: 20rpx;">原价<text>￥{{item.originalPrice | toFixed2}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="wait-content">
				<image src="../../static/healthy-mall/img_sjz.png" mode="aspectFit"></image>
				<view class="">
					商品上架中，敬请期待...
				</view>
			</view>
		</template>
		
		<view v-if="ismore">
			<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				exist:true,
				productList:[],
				tabBars: [{
								id:'',
								label:'全部',
							}],
				tabIndex: 0,
				classifyId:'',
				pageNum: 1,
				pageSize: 10,
				ismore:false,
				contentText: {
				    contentdown: '查看更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多',
				},
				totalpage: 10000
			};
		},
		onLoad(options) {
			this.getProduct()
		},
		computed: {
			communityId(){
				return this.$store.getters.communityId
			}
		},
		onReachBottom() {
		    this.status = 'loading'
		    
		    this.pageNum++
			if(this.pageNum > this.totalpage) {
				this.status="noMore"
				return false
			}
		    this.getProduct()
		},
		methods: {
			goDetail(id, type){
				uni.navigateTo({
					url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${type}`,
				});
			},
			getProduct(){
				let that = this
				this.$api.communityBestPorductPage({
					communityId: this.communityId,
					keywords:this.searchValue,
					size:this.pageSize,
					page:this.pageNum,
				}).then(res=>{
					if(res.status=="OK"){
						console.log('this.res is ', res)
						this.totalpage = res.totalPages
						if(that.pageNum ==1)
						{
							that.productList = [];
						}
						res.list.map(item=>{
							that.productList.push({
								price:item.price/100,
								originalPrice:item.originalPrice/100,
								name:item.name,
								pic:JSON.parse(item.pics)[0].url,
								id:item.id,
								code:item.code
							})
						})
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			search(res){
				this.pageNum = 1;
				this.searchValue = res.value;
				this.getProduct()
			}
			
		},
		filters: {
			toFixed2: function(value) {
				return value.toFixed(2);
			},
			toFixed1: function(value) {
				return value.toFixed(1);
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	@mixin pad-left {
		padding:0 20rpx;
	}
	.color_gre{ color:#A0A8BC;}
	.top-content {
		background-color: #FFFFFF;
	}
	.product {
		padding:30rpx 36rpx ;
		.h-wrap{
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
				font-size: 30rpx;
				font-weight: 500;
				height:2em;line-height: 2;overflow:hidden;
				color: #16202E;
				@include pad-left
			}

			&-price {
				font-weight: 500;
				color: #03BE90;
				view {
					font-size: 30rpx;
					margin-left: 10rpx;
					&.price{
						text{
							font-size:20rpx; margin-right:16rpx;
						}
					}
				}
				view:nth-child(2) {
					text{
						margin-left:16rpx;
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

	.scroll-h {
		display: flex;
		width: 100%;
		height: 80rpx;
		flex-direction: row;
		background-color: transparent;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #434E5E;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #03BE90;
	}
	.wait-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 200rpx;
		image{
			width:236rpx;
			height: 188rpx;
		}
		color: #A2A9BA;
	}
</style>
