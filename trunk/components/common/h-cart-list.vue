<template>
	<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
		<uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#f7cf41' : '#eff1f6'" size="22"
		 @click="check('item', index)" />
		<view class="image-wrapper">
			<image :src="item.image" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
			 @error="onImageError('cartList', index)"></image>
		</view>
		<view class="item-right">
			<text class="clamp title">{{item.title}}</text>
			<text class="attr">{{item.attr_val}}</text>
			<view class="u-f item-right-bottom">
				<text class="price">¥{{item.price}}</text>
				<uni-number-box class="step" 
				:circleClass="true" 
				:min="1" 
				:max="item.stock" 
				:value="item.number>item.stock?item.stock:item.number"
				:isMax="item.number>=item.stock?true:false" 
				:isMin="item.number===1" 
				:index="index" @change="numberChange(index,$event)">
				</uni-number-box>
			</view>
		</view>
		<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
	</view>
</template>

<script>
	export default {
		props:{
			index:'',
			item:{
				type:Object,
				default:()=>{}
			},
		},
		data() {
			return {
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
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(index,value) {
				this.cartList[index].number = parseInt(value);
				this.calcTotal();
			},
		},
	}
</script>

<style lang="scss" scoped>
	/* 购物车列表项 */
	.cart-item {
		display: flex;
		align-items: center;
		position: relative;
		margin: 20rpx 20rpx;
		padding: 30rpx 20rpx;
		border-radius: 15px;
		background-color: #FFFFFF;
		overflow: hidden;
	
		.image-wrapper {
			margin-left: 20rpx;
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
	
		.checkbox {
			position: absolute;
			left: -16rpx;
			top: -16rpx;
			z-index: 8;
			font-size: 44rpx;
			line-height: 1;
			padding: 4rpx;
			color: #A2A9BA;
			background: #fff;
			border-radius: 50px;
		}
	
		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30rpx;
	
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
</style>
