<template>
	<view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<block v-for="(item, index) in buylist" :key="index">
				<view class="cart-item">
					<view class="image-wrapper">
						<image :src="item.snapshot.packageImage" mode="aspectFill" lazy-load @load="onImageLoad('buylist', index)"
						 @error="onImageError('buylist', index)"></image>
					</view>
					<view class="item-right">
						<view class="title">{{ item.packageName }}</view>
						<view class="hosptical">{{ item.hospName }}</view>
						<view class="price">
							￥ <text>{{ item.snapshot.sealPrice | toFixed}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view v-if="buylist.length>0" class="price">
				<text>实付款</text>￥ <text>{{ buylist[0].snapshot.sealPrice | toFixed}}</text>
			</view>
			<text class="submit" :class="{activation:activat}" @click="submit">立即支付</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.productId = option.code
			this.hospId = option.hospId
			this.getPorcudeInfo()
		},
		data() {
			return {
				activat: true,
				productId: '',
				productCode: '',
				hospId: '',
				buylist: []
			}
		},
		methods: {
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/healthy-mall/errorImage.jpg';
			},
			getPorcudeInfo() {
				this.$api.findByKKPackage({
					data:{
					    code:this.productId
					}
				}).then(res=>{
					this.buylist.push(res.data)
					this.productCode = res.data.packageCode;
					this.buylist.map(item=>{
						item.snapshot = JSON.parse(item.snapshot)
					})
				})
			},
			submit() {
				let items = [{
					num: 1,
					productId: this.productCode,
					type: 'KK'
				}]
				// 下单支付
				this.$api.constitutionOrderAddOrder({
					name: '',
					communityId:this.communityId,
					address: '',
					contcatPhone: '',
					items: items,
				    source:'MINGWO',
				    instanceId: '',
					hospId:this.hospId,
				    orderType: 'KK'
				}).then(res=>{
					console.log(res);
				    if(res.status == 'OK'){
                        var _self = this
				        uni.requestPayment({
				            provider: 'wxpay',
				            timeStamp:res.data.payInfo.timeStamp,
				            nonceStr: res.data.payInfo.nonceStr,
				            package: res.data.payInfo.packageValue,
				            signType: 'MD5',
				            paySign: res.data.payInfo.sign,
				            success: function (payres) {
				                console.log('OK1111:' + JSON.stringify(payres));
				                
				                uni.navigateTo({
				                    url:'/pages/health-examination/orderPaid?hospId=' +_self.hospId+ '&id='+res.data.id +'&productId=' + _self.productId
				                })
				            },
				            fail: function (err) {
				                console.log('fail:' + JSON.stringify(err));
				                
				            }
				        });
				    }else{
				        uni.showToast({
				            title: res.message,
				            icon:'none'
				        })
				    }
				    
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		computed: {
			communityId() {
				return this.$store.getters.communityId 
			}
		},
		filters: {
			toFixed: function(value) {
				value = parseFloat(value)
				return value.toFixed(2);
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods-section {
		margin-top: 16rpx;
		background: #fff;
		padding-bottom: 1px;
		.cart-item {
			display: flex;
			align-items: center;
			position: relative;
			margin: 0 30rpx;
			padding:30rpx 0;
			background-color: #FFFFFF;
			overflow: hidden;
	
			.image-wrapper {
				margin-left: 30rpx;
				width: 156rpx;
				height: 156rpx;
				flex-shrink: 0;
				position: relative;
	
				image {
					border-radius: 8upx;
					width: 100%;
					height: 100%;
					transition: .6s;
	
					&.loaded {
						opacity: 1;
					}
				}
			}
	
			.item-right {
				display: flex;
				flex-direction: column;
				flex: 1;
				overflow: hidden;
				position: relative;
				padding-left: 30rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				
			}
		}
	}
	
	.title{ font-size:32rpx; line-height:44rpx; font-weight: bold; margin-top:16rpx;}
	.price{ color:#03BE90; font-size:24rpx;
		text{ font-size:32rpx; }
	}
	.hosptical{ font-size:26rpx; line-height:3;}
	
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		font-size: 30rpx;
		background-color: #fff;
		z-index: 998;
		color: #4cd964;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1); padding:22rpx 32rpx; box-sizing:border-box;
		.price{
			text:first-child{color:#16202E; font-size:28rpx;}
		}
		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			padding:0 28rpx;
			height: 60rpx;
			color: #fff;
			font-size: 30rpx;
			background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
			box-shadow:0px 3px 15px 0px rgba(3,190,144,0.3);
			border-radius:18px;
		}
	    .activation{
	        opacity: 1;
	    }
	}
</style>
