<template>
	<view class="wrapper">
		<view class="header">
			智能问诊报告
		</view>
		<view class="u-f-jsb user-info">
			<text>名字：{{userInfo.name}}</text>
			<text>性别：{{userInfo.gender=="MAN"?'男':'女'}}</text>
			<text>年龄：{{userInfo.age}}</text>
		</view>
		<view class="section">
			<view class="top">智能问诊记录</view>
			<view class="record" :class="{'heightAuto':contentFlag}">
				<view v-for="(item, key) in msgList" :key="key">
					<view class="my" :class="{'other':item.type=='question'}">
						<view class="chat-list-content">
							<view class="bubble">
								<rich-text :nodes="item.value"></rich-text>
							</view>
						</view>
						<!-- 头像 -->
						<view class="chat-list-head">
							<image :src="item.type=='question'?'/static/healthy-mall/robot.png':avatar"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="u-f-ajc">
				<view class="u-f-ajc u-column" @tap="contentFlag=!contentFlag">
					<text class="consultation-record-status">{{contentFlag?'收起':'查看更多'}}</text>
					<uni-icons style="margin-top: -20rpx;" :type="contentFlag?'arrowup':'arrowdown'" size="16" color="#03BE90"></uni-icons>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="top">
				报告结论
			</view>
			<view class="maybe">可能患的病症</view>
			<view class="like">您的描述与如下疾病表现较为相似，本信息仅作相关参考，不能代替任何医疗诊断结果。</view>
			<block v-for="(item,index1) in resultArr" :key="index1">
				<view class="section-mod">
					<view class="section-mod-title">
						{{item.result}}<text>{{Math.floor(item.rate*1000)/10}}%</text>
					</view>
					<view class="section-mod-tips">{{item.info.short_desc}}</view>
					<template v-if="item.recordRecommends.length>0">
						<view class="section-mod-plan">
							<view class="plan-text">调理方案</view>
							<block v-for="(good, index) in item.recordRecommends" :key="index">
								<view class="cart-item" @click="productDetail(good.productId)">
									<view class="image-wrapper">
										<image :src="JSON.parse(good.info.icon)[0].url" mode="aspectFill"></image>
									</view>
									<view class="item-right">
										<view class="u-f-jsb clamp title">
											<text>{{good.info.name}}</text>
											
										</view>
										<text class="attr">{{good.info.description}}</text>
										<view class="u-f item-right-bottom">
											<text class="price">¥{{good.info.price/100}}</text>
											<text class="price">x{{good.num}}</text>
										</view>
									</view>
								</view>
							</block>
                            <view v-if="item.recordRecommends.length>0" class="u-f-ajc btn-buy" :class="{'disabled': item.recordRecommends[0].orderId}" @click.stop="topay(item.recordRecommends[0])">{{item.recordRecommends[0].orderId?'已购买':'购买'}}</view>
						</view>
                        
                    </template>
				</view>
			</block>
		</view>

	</view>
</template>



<script>
	export default {
		data() {
			return {
				msgList: [],
				contentFlag: false,
				id: '',
				userInfo: {
					name: '',
					age: '',
					gender: ''
				},
				resultArr: []
			};
		},
		onLoad(e) {
			console.log(e);
			this.id = e.rid
			
		},
        onShow() {
            this.getData()
        },
		computed: {
			avatar() {
				return uni.getStorageSync('userinfo').avatarPath
			}
		},
		methods: {
			getData() {
				this.$api.znwzRecord({
					id: this.id
				}).then(res => {
					if (res.status == "OK") {
						let data = res.data
						this.userInfo = {
							age: data.age,
							gender: data.gender,
							name: data.name
						}

						let arr = JSON.parse(data.znwzRecordMessage.content)
						this.msgList = arr
						this.resultArr = data.znwzRecordResults
						this.resultArr.forEach(item1 => {
							item1.info = JSON.parse(item1.info)
							if (item1.recordRecommends.length > 0) {
								item1.recordRecommends.forEach(item2 => {
									console.log(item2);
									item2.info = JSON.parse(item2.info)
								})
							}
						})
					}
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},
			productDetail(id) {
				uni.navigateTo({
					url: "/pages/health-product-detail/health-product-detail?id=" + id+'&showNav=false'
				})
			},
			topay(item) {
				console.log(item);
				if (!item.orderId) {
					// uni.removeStorageSync('community_cartList');
					let cartList = [];
					let obj = {
						id: item.productId,
						image: JSON.parse(item.info.icon)[0].url,
						title: item.info.name,
						
						price: item.info.price / 100,
						number: item.num
					};
                    console.log(obj)
					cartList.push(obj)
                    
					uni.setStorage({
						key: 'buylist',
						data: cartList,
						success: () => {
							uni.navigateTo({
								url: '/pages/pay/confirm/confirm?type=community&instanceId=' + item.id
							})
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		padding: 20rpx 65rpx;
		padding-bottom: 110rpx;
		.header {
			font-size:43rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:bold;
			color:rgba(22,32,46,1);
			line-height:61rpx;
			text-align: center;
			margin-bottom: 28rpx;
		}
		.user-info {
			padding: 25rpx 0;
			border-top: 1px solid #434E5E;
			border-bottom: 1px solid #434E5E;
		}
		.section {
			margin-top: 50rpx;
			.top {
				font-size:36rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:bold;
				color:rgba(22,32,46,1);
				padding-bottom: 21rpx;
				border-bottom: 1px solid #434E5E;
				line-height:50rpx;
				
			}

			.maybe {
				margin: 22rpx 0 14rpx 0;
				font-size:30rpx;
				font-family:PingFang-SC-Bold,PingFang-SC;
				font-weight:bold;
				color:rgba(67,78,94,1);
				line-height:42rpx;
			}

			.like {
				font-size:26rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(67,78,94,1);
				line-height:38rpx;
			}

			.record {
				height: 520rpx;
				overflow: hidden;
			}

			.section-mod {
				display: flex;
				flex-direction: column;
				margin-top: 58rpx;
				align-items: flex-start;
				
				.section-mod-title {
					font-size:34rpx;
					font-family:PingFang-SC-Bold,PingFang-SC;
					font-weight:bold;
					color:rgba(23,159,125,1);
					line-height:47rpx;
					text {
						margin-left: 5px;
						color: #F38E08;
					}
				}

				.section-mod-tips {
					font-size:26rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(67,78,94,1);
					line-height:38rpx;
					margin-top: 13rpx;
				}

				.section-mod-plan {
					margin-top: 38rpx;
					width: 100%;
					.plan-text{
						font-size:28rpx;
						font-family:PingFang-SC-Bold,PingFang-SC;
						font-weight:bold;
						color:rgba(67,78,94,1);
						line-height:39rpx;
					}
				}
			}

			.consultation-record-status {
				font-size:28rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(3,190,144,1);
				line-height:39rpx;
			}

			.heightAuto {
				height: auto;
			}
		}
	}


	.btn-buy {
		align-self: center;
		width: 262rpx;
		height: 76rpx;
        margin-left: 179upx;
		background: linear-gradient(233deg, rgba(136, 226, 150, 1) 0%, rgba(3, 190, 144, 1) 100%);
		border-radius: 38px;
		color: #FFFFFF;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 26rpx;
		&.disabled {
			background: #E4E7F2;
			color: #A2A9BA
		}
	}

	.my {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;

		.chat-list-content {
			margin-right: 25rpx;
			max-width: 70%;
			min-height: 75rpx;
			font-size: 26rpx;
			font-family:PingFangSC-Regular,PingFang SC;
		}

		.bubble {
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:38rpx;
			background-color: #179F7D;
			color: #fff;
			border-radius: 10rpx;
			padding: 15rpx 20rpx;
			display: flex;
			align-items: center;
			word-break: break-word;
			position: relative;
			&::after{
				content: '';
				width: 0;
				height: 0;
				border-width: 15rpx;
				border-style: solid;
				border-color: #179F7D transparent transparent transparent;
				position: absolute;
				right: -14rpx;
				top: 24rpx;
			}
		}
		
		.img {
			background-color: transparent;
			padding: 0;
			overflow: hidden;

			image {
				flex: 1;
				max-width: 350rpx;
				max-height: 350rpx;
			}
		}


		.chat-list-head {
			flex-shrink: 0;
			width: 75rpx;
			height: 75rpx;
			image {
				width: 75rpx;
				height: 75rpx;
				border-radius: 75rpx;
			}
		}
	}

	.other {
		flex-direction: row-reverse;

		.chat-list-content {
			margin-right: 0;
			margin-left: 25rpx;
		}

		.bubble {
			background-color: #fff;
			color:rgba(67,78,94,1);
			&::after{
				content: '';
				width: 0;
				height: 0;
				border-width: 15rpx;
				border-style: solid;
				border-color: #fff transparent transparent transparent;
				position: absolute;
				left: -14rpx;
				top: 24rpx;
			}
		}
	}

	.cart-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 30rpx 0;
		border-bottom: 1px solid #EFF1F6;
		// background-color: #FFFFFF;
		overflow: hidden;

		.image-wrapper {
			width: 128rpx;
			height: 128rpx;
			flex-shrink: 0;
			position: relative;
			image {
				border-radius: 8rpx;
				width: 100%;
				height: 100%;
				transition: .6s;
				opacity: 1;
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
				font-size:26rpx;
				font-family:PingFang-SC-Medium,PingFang-SC;
				font-weight:500;
				color:rgba(67,78,94,1);
				line-height:38rpx;
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
				margin: 8rpx 0 13rpx 0;
				font-size:23rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(162,169,186,1);
				line-height:31rpx;
			}

			
			.item-right-bottom {
				justify-content: space-between;
				align-items: center;
			}
			.price {
				font-size:26rpx;
				font-family:Helvetica;
				color:rgba(22,32,46,1);
				line-height:32rpx;
			}
			
		}

		.del-btn {
			padding: 4rpx 10rpx;
			font-size: 34rpx;
			height: 50rpx;
			color: #4cd964;
		}
	}
</style>
