<template>
	<view class="uni-steps">
		<view :class="[direction==='column'?'uni-steps__column':'uni-steps__row']">
			<view :class="[direction==='column'?'uni-steps__column-text-container':'uni-steps__row-text-container']">
				<view v-for="(item,index) in options" :key="index" :class="[direction==='column'?'uni-steps__column-text':'uni-steps__row-text']">
					<text :style="{color:index === 0 ?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-title':'uni-steps__row-title']">{{item.title}}</text>
					<text :style="{color:item.active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">{{item.desc}}</text>
                    <view v-if="item.logisticsCompany" :style="{color:item.active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">
                        快递公司:{{item.logisticsCompany}}
                    </view>
                    <view v-if="item.logisticsCompany" style="display: flex;flex-direction: row;line-height: 50upx;" :style="{color:item.active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">
                        运单号:{{item.logisticsNum}} 
                        <view @click="clickCopy(item.logisticsNum)" style="color: #03BE90; margin-left: 10upx; border: #03BE90 2upx solid; border-radius: 25upx; height: 50upx; text-align: center;line-height: 50upx;width: 150upx;">复制单号</view>
                    </view>
				</view>
			</view>
			<view :class="[direction==='column'?'uni-steps__column-container':'uni-steps__row-container']">
				<view :class="[direction==='column'?'uni-steps__column-line-item':'uni-steps__row-line-item']" v-for="(item,index) in options" :key="index" >
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--before':'uni-steps__row-line--before']" ></view>
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__column-line']" v-if="index === 2">
						<!-- <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons> -->
					</view>
					<view :class="[direction==='column' ?'uni-steps__column-circle':'uni-steps__row-circle']" v-else :style="{backgroundColor:index === 0?activeColor:deactiveColor}"></view>
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--after':'uni-steps__row-line--after']" :style="{borderLeft:index===options.length-1?'none':''}"></view>
					<!-- index<active&&index!==options.length-1?deactiveColor:index===options.length-1?'transparent':deactiveColor -->
             
                </view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'

	/**
	 * Steps 步骤条
	 * @description 评分组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=34
	 * @property {Number} active 当前步骤
	 * @property {String} direction = [row|column] 当前步骤
	 * 	@value row 横向
	 * 	@value column 纵向
	 * @property {String} activeColor 选中状态的颜色
	 * @property {Array} options 数据源，格式为：[{title:'xxx',desc:'xxx'},{title:'xxx',desc:'xxx'}]
	 */

	export default {
		name: 'UniSteps',
		components: {
			uniIcons
		},
		props: {
			direction: {
				// 排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: {
				// 激活状态颜色
				type: String,
				default: '#1aad19'
			},
			deactiveColor: {
				// 未激活状态颜色
				type: String,
				default: '#999999'
			},
			active: {
				// 当前步骤
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {}
		},
        methods:{
            clickCopy:function(data){
                uni.setClipboardData({
                    data: data,
                    success: function () {
                        console.log('success');
                    }
                });
            }
        }
        
	}
</script>

<style scoped>
	.uni-steps {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__row {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__column {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row-reverse;
	}

	.uni-steps__row-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
	}

	.uni-steps__row-text {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
	}

	.uni-steps__column-text {
		padding: 6px 0px;
	/* 	border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #e5e5e5; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__row-title {
		font-size: 28rpx;
		line-height: 16px;
		text-align: center;
	}

	.uni-steps__column-title {
		font-size: 28rpx;
		text-align: left;
		line-height: 18px;
	}

	.uni-steps__row-desc {
		font-size: 12px;
		line-height: 14px;
		text-align: center;
	}

	.uni-steps__column-desc {
		font-size: 24rpx;
		text-align: left;
		line-height: 18px;
	}

	.uni-steps__row-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-container {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		width: 30px;
		flex-direction: column;
	}

	.uni-steps__row-line-item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		height: 14px;
		line-height: 14px;
		align-items: center;
		justify-content: center;
	}

	.uni-steps__column-line-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.uni-steps__row-line {
		flex: 1;
		height: 1px;
		background-color: #999;
	}

	.uni-steps__column-line {
		/* width: 1px; */
		border-left:1px dashed #C6CAD4 ;
		/* background-color: #999; */
	}

	.uni-steps__row-line--after {
		transform: translateX(1px);
	}

	.uni-steps__column-line--after {
		flex: 1;
		transform: translate(0px, 1px);
	}

	.uni-steps__row-line--before {
		transform: translateX(-1px);
	}

	.uni-steps__column-line--before {
		height: 6px;
		border: none;
		transform: translate(0px, -1px);
	}

	.uni-steps__row-circle {
		width: 6px;
		height: 6px;
		border-radius: 100px;
		background-color: #999;
		margin: 0px 3px;
	}

	.uni-steps__column-circle {
		width: 6px;
		height: 6px;
		border-radius: 100px;
		background-color: #999;
		margin: 4px 0px 5px 0px;
	}

	.uni-steps__row-check {
		margin: 0px 6px;
	}

	.uni-steps__column-check {
		height: 14px;
		line-height: 14px;
		margin: 2px 0px;
	}
</style>