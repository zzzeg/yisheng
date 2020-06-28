<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/mine-address-detail/mine-address-detail" class="address-section">
			<view class="order-content">
				<image src="/static/healthy-mall/icon_jksc_ddshdz.png" mode="aspectFit"></image>
				<view class="cen">
					<template v-if="addressData.name">
						<view class="top">
							<text class="name">{{addressData.name}}</text>
							<text class="mobile">{{addressData.mobile}}</text>
						</view>
						<text class="address">{{addressData.regions}} {{addressData.detailAddress}}</text>
					</template>
					<template v-else>
						<view class="top">
							<text class="name">请填写收货地址</text>
						</view>
					</template>
				</view>
				<uni-icons type="arrowright" color="#c6cad4"></uni-icons>
			</view>
		</navigator>

		<view class="goods-section">
			<!-- 商品列表 -->
			<block v-for="(item, index) in buylist" :key="item.id">
				<view class="cart-item">
					<view class="image-wrapper">
						<image :src="item.image" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('buylist', index)"
						 @error="onImageError('buylist', index)"></image>
					</view>
					<view class="item-right">
						<text class="clamp title">{{item.title}}</text>
						<text class="attr">{{item.attr_val?item.attr_val:''}}</text>
						<view class="u-f item-right-bottom">
							<text class="price">¥{{item.price|toFixed}}</text>
							<view class="price">
                                <view style="margin-right: 20upx;" @click="clickJisuan(1,index)" class="jisuanbtn"><image src="../../../static/image/-_n@2x.png" mode=""></image></view>
                                {{item.number}}
                                <view style="margin-left: 20upx;" @click="clickJisuan(2,index)" class="jisuanbtn"><image src="../../../static/image/+@2x.png" mode=""></image></view>
                            </view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">共 <text class="base">{{totalNum}}</text> 件商品 总价：</text>
				<text class="cell-tip base">￥{{goodsPrice|toFixed}}</text>
				<text class="cell-tip smalltip">（含配送费￥{{fee}}）</text>
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<text class="submit" :class="{activation:activat}" @click="submit">提交订单</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',//健康商城 community  自营  customer
				buylist: [],
				payType: 1, //1微信 2支付宝
				totalNum:0,
				total:0,
				goodsPrice:0,
				fee:0,
				// addressStatus:false,//是否有默认地址
				addressData: {
					name: '',
					mobile: '',
					regions: '',
                    provinceName:'',
                    cityName:'',
                    areaName:'',
					detailAddress: ''
				},
                instanceId:'',
                
                activat:false,
                isSubmit:false
			}
		},
		computed: {
			communityId() {
				return this.$store.getters.communityId 
			}
		},
		onLoad(options) {
			//健康商城 community  自营  customer   私家医生  doctor    
			this.type =options.type
		
            this.instanceId = options.instanceId ? options.instanceId : ''
            
			if(options.webpid){
				let cartList = [];
				let obj = {
					id: options.productId,
					image: options.url,
					title: options.name,
					price: options.price,
					number: 1
				};
				cartList.push(obj)
				uni.setStorage({
					key: 'buylist',
					data: cartList
				})
			}
			
			
            this.getPostFee(this.type)
			
			uni.getStorage({
				key: 'deliAddress',
				success: (e) => {
					this.addressData = e.data;
                    if(this.addressData.name !=undefined && this.addressData.name!=''){
                        console.log(this.addressData)
                        this.activat = true
                    }
				}
			})
		},
		onShow() {
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];
        
			if(currPage.data.addressData.name==undefined || currPage.data.selectedAddress==''){
			
			}else{
				this.addressData = currPage.data.addressData
                if(this.addressData.name !=undefined && this.addressData.name!=''){
                    this.activat = true
                }
			}
		},
		methods: {
            calcTotal:function(){
                //商品数据
                uni.getStorage({
                	key: 'buylist',
                	success: (res) => {
                		this.buylist = res.data;
                		this.goodsPrice = 0;
                		let list = this.buylist;
                		//合计 计算总价
                		list.forEach(item => {
                			console.log(item);
                			this.goodsPrice += item.price * item.number;
                			this.totalNum += item.number;
                		})
                        this.fee = this.minimum - this.goodsPrice>0 ? this.expenses:0
                		this.goodsPrice+= this.fee
                		// this.goodsPrice = this.goodsPrice - this.deduction + this.freight;
                	}
                });
            },
            getPostFee(type){
            	// 健康商城 community  服务站商城  customer
            	switch (type){
                    case 'doctor':
                    	
                    	this.expenses = 0
                    	this.minimum = 0
                    	
                    	this.calcTotal()
                    		
                    	break;
            		case 'community':
            			this.$api.communityGetPostage().then(res=>{
            				if(res.status=="OK"){
								if(res&&res.data&&res.data.expenses){
									this.expenses = res.data.expenses/100
									this.minimum = res.data.minimum/100
								}
            					this.calcTotal()
            				}
            			}).catch(err=>{
            				console.log(err);
            			})
            			break;
            		case 'customer':
            			this.$api.customerGetPostage().then(res=>{
            				if(res.status=="OK"){
								if(res&&res.data&&res.data.expenses){
									this.expenses = res.data.expenses/100
									this.minimum = res.data.minimum/100
								}
                                this.calcTotal()
            				}
            			}).catch(err=>{
            				console.log(err);
            			})
            			break;
            	}
            	
            },
            clickJisuan:function(tag,index){
                if(tag == 1){   //减
                    if(this.buylist[index].number>1){
                        this.buylist[index].number = this.buylist[index].number - 1
                        this.totalNum = 0
                        var price = 0
                        this.buylist.forEach(item => {
                            price += item.price * item.number;
                            this.totalNum += item.number;
                        })
                        this.fee = this.minimum - price>0 ? this.expenses:0
                        this.goodsPrice = price + this.fee
                    }else{
                        if(this.buylist.length>1){
                            this.buylist.splice(index,1)
                            this.totalNum = 0
                            var price = 0
                            this.buylist.forEach(item => {
                                price += item.price * item.number;
                                this.totalNum += item.number;
                            })
                            this.fee = this.minimum - price>0 ? this.expenses:0
                            this.goodsPrice = price + this.fee
                        }
                    }
                }else{
                    this.buylist[index].number = this.buylist[index].number + 1
                    var price = 0
                    this.totalNum = 0
                    this.buylist.forEach(item => {
                    	this.totalNum += item.number;
                        price += item.price * item.number;
                    })
                    this.fee = this.minimum - price>0 ? this.expenses:0
                    this.goodsPrice = price + this.fee
                }
            },
			//显示优惠券面板
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/healthy-mall/errorImage.jpg';
			},
			submit() {
				// console.log(this.addressData);
				let addressData = this.addressData
	
				if(addressData.name==''){
					// uni.showToast({
					// 	title: '地址有误',
					// 	icon:'none'
					// });
					return
				}
                var address = {"provinceName":this.addressData.provinceName,"cityName":this.addressData.cityName,"areaName":this.addressData.areaName,"address":this.addressData.detailAddress}
                address = JSON.stringify(address)
                
                if(this.type == 'community' || this.type == 'doctor'){
                    let items = []
                    this.buylist.map(item=>{
                    	items.push({
                    		num: item.number,
                    		productId: item.id,
                    		type: item.productType?item.productType:'COMMUNITY_PRODUCT'
                    	})
                    })
                    var order_type = 'MALL'
                    var data
                    if(this.type == 'doctor'){
                        order_type = 'DOCTOR'
                        data = {
                        	name:addressData.name,
                        	communityId:this.communityId,
                        	address:address,
                        	contcatPhone:addressData.mobile,
                        	items:items,
                            source:'MINGWO',
                            instanceId:this.instanceId,
                            orderType:order_type
                        }
                    }else if(this.instanceId != ''){
                        data = {
                        	name:addressData.name,
                        	communityId:this.communityId,
                        	address:address,
                        	contcatPhone:addressData.mobile,
                        	items:items,
                            source:'MINGWO',
                            instanceId:this.instanceId
                        }
                    }else{
                        data = {
                        	name:addressData.name,
                        	communityId:this.communityId,
                        	address:address,
                        	contcatPhone:addressData.mobile,
                        	items:items,
                            source:'MINGWO',
                            instanceId:this.instanceId,
                            orderType:order_type
                        }
                    }
                    if(!this.isSubmit){
                        this.isSubmit = true
                    }else{
                        return
                    }
					let that = this;
                    this.$api.constitutionOrderAddOrder(data).then(res=>{
                    	console.log(res);
                        if(res.status == 'OK'){
                           
                            uni.requestPayment({
                                provider: 'wxpay',
                                timeStamp:res.data.payInfo.timeStamp,
                                nonceStr: res.data.payInfo.nonceStr,
                                package: res.data.payInfo.packageValue,
                                signType: 'MD5',
                                paySign: res.data.payInfo.sign,
                                success: function (payres) {
                                    that.isSubmit = false;
                                    uni.navigateTo({
                                        url:'../../order-detail/order-detail?type=99&orderid='+ res.data.id
                                    })
                                },
                                fail: function (err) {
                                    console.log('fail:' + JSON.stringify(err));
                                    that.isSubmit = false;
                                }
                            });
                        }else{
							that.isSubmit = false;
                            uni.showToast({
                                title: res.message,
                                icon:'none'
                            })
                        }
                        
                    }).catch(err=>{
                    	console.log(err);
                    })
                }else if(this.type == 'customer'){
                    this.$api.constitutionOrderAddOrder({
                    	name:addressData.name,
                    	address:address,
                    	contcatPhone:addressData.mobile,
                    	items:[],
                        source:'MINGWO'
                    }).then(res=>{
                    	console.log(res);
                        if(res.status == 'OK'){
                            
                            uni.requestPayment({
                                provider: 'wxpay',
                                timeStamp:res.data.payInfo.timeStamp,
                                nonceStr: res.data.payInfo.nonceStr,
                                package: res.data.payInfo.packageValue,
                                signType: 'MD5',
                                paySign: res.data.payInfo.sign,
                                success: function (payres) {
                                    
                                    uni.navigateTo({
                                        url:'../../order-detail/order-detail?type=99&orderid='+ res.data.id
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
				
				// {
				//   "address": "string",
				//   "contcatPhone": "string",
				//   "items": [
				//     {
				//       "num": 0,
				//       "productId": "string",
				//       "type": "DIET_PLAN"
				//     }
				//   ],
				//   "name": "string"
				// }
				
			},
			stopPrevent() {}
		},
		filters: {
			toFixed: function(value) {
				value = parseFloat(value)
				return value.toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
	$font-color-dark:#fefefe;

	.address-section {
		position: relative;

		.order-content {
			background: #fff;
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			padding: 30rpx 22rpx;
			image{
				width: 84rpx;
				height: 84rpx;
			}
		}

		// .icon-shouhuodizhi {
		// 	flex-shrink: 0;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	width: 90rpx;
		// 	color: #888;
		// 	font-size: 44rpx;
		// }

		.cen {
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28rpx;
		}

		.name {
			font-size: 32rpx;
			margin-right: 24rpx;
			color: #16202E;
		}

		.mobile {
			color: #A2A9BA;
			font-size: 28rpx;
		}

		.address {
			margin-top: 16rpx;
			margin-right: 20rpx;
			color: #434E5E;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5rpx;
		}
	}
    .jisuanbtn{
        width: 46upx;
        height: 46upx;
    }
    .jisuanbtn image{
        width: 46upx;
        height: 46upx;
    }
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
			border-bottom: 1px solid #EFF1F6;
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
					opacity: 0;

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
				.title {
					font-size: 30rpx;
					color: #2A3441;
					height: 40rpx;
					line-height: 40rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.price {
					font-size: 30rpx;
					color: #16202E;
					line-height: 40rpx;
                    display: flex;
                    flex-direction: row;
				}

				.attr {
					font-size: 26rpx;
					color: #A2A9BA;
					height: 50rpx;
					line-height: 50rpx;
				}

				.price {
					height: 50rpx;
					line-height: 50rpx;
				}

				.item-right-bottom {
					justify-content: space-between;
					align-items: center;
				}
			}

			.del-btn {
				padding: 4rpx 10rpx;
				font-size: 34rpx;
				height: 50rpx;
				color: #4cd964;
			}
		}
	}

	.yt-list {
		background: #fff;
	}
	.yt-list-cell {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 10rpx 30rpx 10rpx 40rpx;
		line-height: 70rpx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30rpx;
		}

		.cell-icon {
			height: 32rpx;
			width: 32rpx;
			font-size: 22rpx;
			color: #fff;
			text-align: center;
			line-height: 32rpx;
			background: #f85e52;
			border-radius: 4rpx;
			margin-right: 12rpx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24rpx;
			color: #4cd964;
			margin-left: 8rpx;
			margin-right: -10rpx;
		}

		.cell-tit {
			font-size: 26rpx;
			color: #2A3441;
			margin-right: 10rpx;
			.base {
				color: #03BE90;
			}
		}

		.cell-tip {
			font-size: 28rpx;
			color: #2A3441;
			&.base {
				color: #03BE90;
			}

			&.smalltip {
				color:#A2A9BA;
				font-size: 20rpx;
			}

			&.red {
				color: #4cd964;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90rpx;
			}
		}

		.desc {
			flex: 1;
			font-size: 24rpx;
			color: #fefefe;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40rpx;
		margin-top: 16rpx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20rpx;
			line-height: 1;
			height: 110rpx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80rpx;
			font-size: 40rpx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80rpx;
			font-size: 40rpx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;
			font-size: 40rpx;
			color: #4cd964;
		}

		.tit {
			font-size: 32rpx;
			color:#fefefe;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90rpx;
		justify-content: space-between;
		font-size: 30rpx;
		background-color: #fff;
		z-index: 998;
		color: #4cd964;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30rpx;
		}

		.price-tip {
			color: #4cd964;
			margin-left: 8rpx;
		}

		.price {
			font-size: 36rpx;
			color:#4cd964;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280rpx;
			height: 100%;
			color: #fff;
			font-size: 32rpx;
			flex: 1;
            opacity: 0.5;
			background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
		}
        .activation{
            opacity: 1;
        }
	}
</style>
