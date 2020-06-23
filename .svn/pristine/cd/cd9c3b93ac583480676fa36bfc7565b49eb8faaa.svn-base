<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-left">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left uni-tab__shop-cart" @click="onClick(index,item)">
					<button style="background: rgba(255,255,255,0); padding: 0;" open-type="getUserInfo" @getuserinfo="getUserList" class="uni-tab__icon">
						<!-- {{item.icon}} -->
                        <uni-icons v-if="item.icon != 'headphones'" :type="item.icon" size="20" :color="item.color?item.color:'#646566'"></uni-icons>
						<image style="margin-top:30upx" v-else class="image" src="../../static/image/guangjia_gj.png" mode="widthFix" />
					</button>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="flex uni-tab__dot-box">
						<text v-if="item.info" :class="{ 'uni-tab__dots': item.info > 9 }" class="uni-tab__dot ">{{ item.info }}</text>
					</view>
				</view>
			</view>
			<view :class="{'uni-tab__right':fill}" class="flex uni-tab__cart-sub-right ">
				<button v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.background,color:item.color,boxShadow:item.boxShadow,width:btnWidth}" class="flex uni-tab__cart-button-right btnW" open-type="getUserInfo" @getuserinfo="getUserList" @click="buttonClick(index,item)"><text class="uni-tab__cart-button-right-text">{{ item.text }}</text></button>
				<!-- <view class="flex uni-tab__cart-button-right uni-tab__color-y ">立即购买</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	/**
	 * GoodsNav 商品导航
	 * @description 商品加入购物车、立即购买等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=865
	 * @property {Array} options 组件参数
	 * @property {Array} buttonGroup 组件按钮组参数
	 * @property {Boolean} fill = [true | false] 组件按钮组参数
	 * @event {Function} click 左侧点击事件
	 * @event {Function} buttonClick 右侧按钮组点击事件
	 * @example <uni-goods-nav :fill="true"  options="" buttonGroup="buttonGroup"  @click="" @buttonClick="" />
	 */
	export default {
		name: 'UniGoodsNav',
		components: {
			uniIcons
		},
		props: {
			options: {
				type: Array,
				default () {
					return [{
						icon: 'shop',
						text: '店铺'
					}, {
						icon: 'cart',
						text: '购物车'
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [{
							text: '加入购物车',
							background: '#ffa200',
							color: '#fff'
						},
						{
							text: '立即购买',
							background: '#ff0000',
							color: '#fff'
						}
					]
				}
			},
			fill: {
				type: Boolean,
				default: false
			}
		},
        data(){
			return {
				btnWidth: uni.upx2px(218) + 'px'
			};
		},
        created() {
            console.log(uni.getSystemInfoSync().screenWidth)
            
            if(uni.getSystemInfoSync().screenWidth < 375){
                this.btnWidth = uni.upx2px(190) + 'px'
            }
        },
		methods: {
			onClick(index, item) {
                const sessionKey = uni.getStorageSync('sessionId');
                if (!sessionKey) {
                     return
                }
				this.$emit('click', {
					index,
					content: item,

				})
			},
            getUserList(res){
                const sessionKey = uni.getStorageSync('sessionId');
                if (sessionKey) {
                     return
                }
                if (res.detail.errMsg == "getUserInfo:ok") {
                    //授权
                    console.log(this.$conn) 
                
                    if (res.iv) {
                        getApp().wxlogin()
                       
                    } else {
                        getApp().wxlogin()
                    }
                
                } else {
                    //拒绝授权
                    uni.showModal({
                        title: '提示',
                        content: '允许授权后放可使用',
                        success: function(res) {
                            if (res.confirm) {
                                uni.openSetting({
                                    success(openRes) {
                                        console.log(res.authSetting)
                                    }
                                });
                            } else if (res.cancel) {
                
                            }
                        }
                    });
                
                }
            },
			buttonClick(index, item) {
                const sessionKey = uni.getStorageSync('sessionId');
                if (!sessionKey) {
                     return
                }
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}
		}
	}
</script>

<style scoped>
	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 50px;
		background-color: #fff;
		z-index: 900;
        justify-content: space-between;
	}

	.uni-tab__cart-sub-left {
		padding: 0 5px;
	}

	.uni-tab__cart-sub-right {
		/* flex: 1; */
        display: flex;
        justify-content: flex-end;
	}

	.uni-tab__right {
		margin: 5px 0;
		margin-right: 10px;
		border-radius: 100px;
		/* overflow: hidden; */
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* flex: 1;
 */
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 10px;
	}

	.uni-tab__icon {
		/* width: 18px; */
		/* height: 18px; */
	}

	.image {
		width: 18px;
		height: 18px;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: 24rpx;
		color: #646566;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		border-radius:38px;
		margin-right: 30rpx;
        width: 218upx;
	}

	.uni-tab__cart-button-right-text {
		font-size: 28rpx;
		/* color: #fff; */
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: -8px;
		top: 4px;
		justify-content: center;
		align-items: center;
		/* width: 0;
 */
		/* height: 0;
 */
	}

	.uni-tab__dot {
		/* width: 30rpx;
 */
		/* height: 30rpx;
 */
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #09C470;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		/* width: auto;
 */
		border-radius: 15px;
	}

	.uni-tab__color-y {
		background-color: #ffa200;
	}

	.uni-tab__color-r {
		background-color: #ff0000;
	}
    button{
        padding: 0;
    }
</style>