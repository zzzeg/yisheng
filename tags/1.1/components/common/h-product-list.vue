<template>
	<view class="u-f u-column health-list" @tap="click(info.id,'community')">
		<image :src="info.pic" mode="aspectFill" :class="[info.loaded]" lazy-load @load="onImageLoad()" @error="onImageError()"></image>
		<view class="health-list-title">{{info.name}}</view>
		<view class="health-list-realprice" style="display: flex;justify-content: space-between; width: 60%;" >
			<text style="line-height: 2.0; width: 200upx;">{{info.price/info.originalPrice*10|toFixed2}}折</text>
			<text style="margin-left: 10upx; ">￥{{info.price|toFixed2}}</text>
		</view>
		<view class="health-list-price" style="display: flex;justify-content: space-between; width: 60%;">
			原价<text style="margin-left: 10upx;">￥{{info.originalPrice|toFixed2}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
		},
		data() {
			return {
				info:{}
			};
		},
		mounted() {
			this.info = Object.assign({},this.item);
		},
		methods: {
			click(id,type) {
				this.$emit('click',id)
			},
			//监听image加载完成
			onImageLoad() {
				this.$set(this.info, 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError() {
				this.info.pic = '/static/healthy-mall/errorImage.jpg';
			},
		},
		filters: {
			toFixed2: function(value) {
				return Number(value).toFixed(2);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@mixin pad-left {
		padding-left: 20rpx;
	}
	.health-list{
		margin-bottom: 40rpx;
		padding-bottom: 16rpx;
		width: 330rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		overflow: hidden;
		image{
			width: 330rpx;
			height: 330rpx;
			transition: .6s;
			opacity: 0;
			&.loaded {
				opacity: 1;
			}
		}
		&-title{
			font-size: 30rpx;
			font-weight: 500;
			color: #16202E;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
           
			@include  pad-left
		}
		&-realprice{
			color: #03BE90;
			font-weight: 500;
			@include  pad-left
			text:nth-child(1){
				font-size: 20rpx;
			}
			text:nth-child(2){
				font-size: 24rpx;
			}
		}
		&-price{
			position: relative;
			font-size: 20rpx;
			font-weight: 500;
			color: #A0A8BC;
			@include  pad-left;
			text{
				position: relative;
				margin-left: 10rpx;
			}
			text::after{
				content: '';
				position: absolute;
				left:0;
				top:50%;
				width: 100%;
				height: 1px;
				background-color: #A0A8BC;
			}
		}
	}
</style>
