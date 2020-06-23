<template>
	<view>
		<template v-if="exist">
			<view class="top-content">
				<uni-search-bar radius="100"  cancelButton="none" placeholder="输入商品名称" @confirm="search" />
				<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
					<view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="ontabtap">
						<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.label}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="product">
				<view class="u-f h-wrap">
					<view class="u-f u-column health-list" v-for="(item,index) in productList" :key="index" @tap="goDetail(item.id,'customer')">
						<image :src="item.pic" mode="aspectFill"></image>
						<view class="health-list-title">{{item.name}}</view>
						<view class="health-list-price">
							<text>￥{{item.price|toFixed2}}</text>
							<text>￥{{item.originalPrice|toFixed2}}</text>
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
				pageNum:''
			};
		},
		onLoad(options) {
			this.getClassifyData(this.communityId)
		},
		computed: {
			communityId(){
				return this.$store.getters.communityId
			}
		},
		methods: {
			ontabtap(e) {
				this.tabIndex = e.target.dataset.current || e.currentTarget.dataset.current;
				this.classifyId = this.tabBars[this.tabIndex].id
				this.getProduct(1,'')
			},
			goDetail(id,type){
				uni.navigateTo({
					url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${type}`,
				});
			},
			getClassifyData(id){
				this.$api.getClassify({
					communityId:id,
				}).then(res=>{
					let arr = res.data
					if(res.status=="OK"){
						arr.map(item=>{
							this.tabBars.push({
								id:item.id,
								label:item.name,
							})
						})
						this.classifyId = this.tabBars[0].id
						this.getProduct(1,'')
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			getProduct(pageNum,searchValue){
				this.$api.customerProductPage({
					name:searchValue,
					size:10,
					page:pageNum,
					communityId:this.communityId,
					classifyId:this.classifyId
				}).then(res=>{
					if(res.status=="OK"){
						res.list.map(item=>{
							this.productList.push({
								price:item.price/100,
								originalPrice:item.originPrice/100,
								name:item.name,
								pic:JSON.parse(item.mainPic)&&JSON.parse(item.mainPic)[0]&&JSON.parse(item.mainPic)[0].url,
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
				this.getProduct(1,res.value)
			}
			
		},
		filters: {
			toFixed2: function(value) {
				return value.toFixed(2);
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	@mixin pad-left {
		padding-left: 20rpx;
	}

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
				color: #16202E;
				@include pad-left
			}

			&-price {
				font-weight: 500;
				color: #03BE90;
				display: flex;
				align-items: center;
				text {
					font-size: 30rpx;
					position: relative;
					margin-left: 10rpx;
				}
				text:nth-child(2) {
					font-size: 24rpx;
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
