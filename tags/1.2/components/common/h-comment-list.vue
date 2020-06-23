<template>
	<view class="comment-list">
		<view class="comment-list-img">
			<image :src="item.userAvatar" mode="aspectFit"></image>
		</view>
		<view class="u-f-jsa border-bottom">
			<view class="comment-list-cont">
				<text>{{item.userName?item.userName:'匿名'}}</text>
				<text style="word-break: break-all;">{{item.content}} <text style="margin-left: 10upx;">{{item.createTime|formatData}}</text></text>
			</view>
			<view class="comment-list-num">
				<uni-icons :type="item.praiseStatus?'hand-thumbsup-filled':'hand-thumbsup'" :color="item.praiseStatus?'#03BE90':'#434E5E' "
				 size="22" @tap="ding(item,index)"></uni-icons>
				<text>{{item.praiseCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
    import util from '../../common/util.js'
	export default {
		props: {
			item: Object,
			index:Number||String
		},
		data() {
			return {

			};
		},
		computed:{
			info(){
				return this.item
			}
		},
		methods: {
			ding(item,index) {
				// console.log('ding');
				this.$emit('ding',{item,index})
			}
		},
        filters: {
        	formatData: function(value) {
        		return util.formatTimestamp(value, 'MM-dd');
        	},
        }
	}
</script>

<style lang="scss" scoped>
	.comment-list {
		display: flex;
		justify-content: space-between;
		margin-left: 32rpx;
		padding-top:20rpx ;
		font-family: PingFang-SC-Medium, PingFang-SC;
		.comment-list-img {
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 60rpx;
			}
		}

		.comment-list-cont {
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			width: 520rpx;
			text:nth-child(1) {
				color: #9C9C9C;
				font-weight: bold;
			}

			text:nth-child(2) {
				color: #16202E;
				font-weight: 500;
			}
		}

		.comment-list-num {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 80rpx;
			&>text {
				color: #434E5E;
				font-size: 20rpx;
				font-weight: 500;
			}
		}
	}
	.border-bottom{
		flex: 1;
		border-bottom: 1px solid #F6F6F6;
		padding-bottom:30rpx ;
	}
</style>
