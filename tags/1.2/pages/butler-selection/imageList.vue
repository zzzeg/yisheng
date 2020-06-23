<template>
	<view class="cont">
		<view v-if="load" class="model" v-for="(xx,xi) in info.pics" :key="xi">
			<uni-swiper-dot :info="xx.pics" class="swip" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in xx.pics" :key="index">
						<view class="swiper-item">
							<image class="image" :src="xx.pics.url" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
				
			<view class="name" style="text-align: center;">
				{{ xx.name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					pics: [{
						colorClass: 'none',
						url: ''
					}]
				},
				dotsStyles: {
					backgroundColor: 'rgba(249, 249, 251, 1)',
					border: 'none',
					color: '#fff',
					selectedBackgroundColor: 'rgba(3, 190, 144, 1)',
					selectedBorder: 'none'
				},
				mode: 'dot',
				current:0,
                load:false
			};
		},
		onLoad(option) {
			this.getData()
		},
		computed: {
			communityId(){
				return this.$store.getters.communityId
			}
		},
		watch: {
			info:{
				handler(val,oldVal){
					if(val && val.length>0){
						if(val.markStatus){
							this.options[2] = {icon: 'star-filled',color: '#F7CF41'}
						}else{
							this.options[2] = {icon: 'star',color: '#B7B7B7'}
						}
					}				
					
				},
				immediate: true, 
				deep: true
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			getData() {
				this.$api.findByCommunityId({
					communityId: this.communityId
				}).then(res=>{
					this.info.pics = res.data
					this.info.pics.map(item=>{
						item.pics = JSON.parse(item.pics)
					})
                    this.load = true
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.cont{ height:100vh; overflow:auto;
		.model{ margin:60rpx 0 0 0;
		&:first-child{ margin-top:120rpx; }
		 .name{ color:#2A3441; font-size:32rpx; font-weight: 400; margin-top:32rpx; }
		 }
	 }
    .list{
      margin-top: 10px;
      background: white;
      overflow: hidden;
      .item{
        .item-title2{
          padding: 30px 15px 0;
          color: #16202E;
          font-size: 18px;
          line-height: 25px;
        }
        .item-img{
          font-size: 0;
          padding: 0;
          img{
            width: 100%;
          }
        }
      }
    }
	.swiper-box {
		margin:0 134rpx;
	    height: 308rpx;
		// padding: 0 16rpx;
	}
	.swiper-item {
	    display: flex;
	    flex-direction: row;
		height: 100%;
		// border-radius: 20rpx;
		// overflow: hidden;
	}
	.image {
		width: 100%;
		height: 100%;
	}
	.desc{
		background-color: #FFFFFF;
		padding: 30rpx 20rpx;
	}
	.health-list-title {
		font-size: 36rpx;
		font-weight: 800;
		color: #16202E;
	}
	.health-list-price {
		font-weight: 500;
		color: #03BE90;
		display: flex;
		align-items: center;
		text {
			font-size: 30rpx;
			position: relative;
			margin-left: 10rpx;
			color: #03BE90;
		}
		text:nth-child(1) {
			font-size: 28rpx;
		}
		text:nth-child(2) {
			font-size: 34rpx;
			font-weight: 800;
		}
		text:nth-child(3) {
			font-size: 28rpx;
			color: #A0A8BC;
		}
		text:nth-child(4) {
			font-size: 32rpx;
			color: #A0A8BC;
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
	.detail-content{
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
