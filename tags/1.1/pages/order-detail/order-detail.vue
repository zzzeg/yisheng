<template>
	<view>
        <view v-if="order" class="">
            <view class="order-status shape">
            	<view class="header">
            		订单状态
            	</view>
            	<uni-steps :options="list1" active-color="#03BE90" :active="active" direction="column" />
            </view>
            
            <!-- 收货人信息 -->
            <view class="mk-form shape">
            	<view class="header">
            		收货人信息
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">收件人：</view>
            		<view class="form-item-container_main">
            			{{order.receivingName || order.name}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">联系方式：</view>
            		<view class="form-item-container_main">
            			{{order.receivingPhone || order.contcatPhone}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">所在地区：</view>
            		<view class="form-item-container_main">
            			{{order.receivingAddress.provinceName}}{{order.receivingAddress.cityName}}{{order.receivingAddress.areaName}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">详细地址：</view>
            		<view class="form-item-container_main">
            			{{order.receivingAddress.address}}
            		</view>
            	</view>
            </view>
            
            <!-- 商品列表 -->
            <view class="goods-section shape">
            	<view class="header">
            		商品信息
            	</view>
            	<block v-for="(item, index) in order.item" :key="item.id">
            		<view class="cart-item">
            			<view class="image-wrapper">
            				<image :src="item.icon"  mode="aspectFill" ></image>
            			</view>
            			<view class="item-right">
            				<text class="clamp title">{{item.name?item.name:''}}</text>
            				<!-- <text class="attr">{{item.attr_val}}</text> -->
            				<view class="u-f item-right-bottom">
            					<text class="price">¥{{item.price/100}}</text>
            					<text class="price">x{{item.num}}</text>
            				</view>
            			</view>
            		</view>
            	</block>
            </view>
            
            <!-- 付款信息 -->
            <view class="mk-form shape">
            	<view class="header">
            		付款信息
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">付款方式：</view>
            		<view class="form-item-container_main">
            			{{order.payWay == 'WECHAT' ? '微信' : '现金'}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">付款时间：</view>
            		<view class="form-item-container_main">
            			{{order.payTime}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">订单总额：</view>
            		<view class="form-item-container_main">
            			¥{{order.totalPrice ? order.totalPrice/100 : order.actualPrice/100}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">配送费用：</view>
            		<view class="form-item-container_main">
            			¥{{order.expenses/100}}
            		</view>
            	</view>
            	<view class="form-item-container">
            		<view class="form-item-container_label">应付金额：</view>
            		<view class="form-item-container_main" style="color: #03BE90;">
            			¥{{order.actualPrice/100}}
            		</view>
            	</view>
            </view>
        </view>
	</view>
</template>

<script>
    import util from '../../common/util.js'
	export default {
		data() {
			return {
                order:null,
				active:4,
				list1: [],
				from:0
			};
		},
        onLoad(options) {
            if(options.from){
                this.from = options.from
            }
            
            if(options.type == 'customer'){
                
                this.$api.findCustomerOrderById({
                    data:{
                        id:options.orderid
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        this.order = res.data
                        this.manageData()
                    }
                })
            }else{
                this.$api.constitutionOrderFindById({
                    data:{
                        id:options.orderid
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        this.order = res.data
                        this.manageData()
                    }
                })
            }
            
            
            
            
            
            // {{record.status=='GRIND_WAIT' ? '待处理' : record.status=='GRIND_DONIG' ? '处理中' : record.status=='GRIND_SUCCES' ? '处理完成' : record.status=='DELIVERY' ? '已发货' : record.status=='RECEIVED' ? '已收件' :
            // record.status=='GRIND_NOTPAY' ? '未支付' : 
            // record.status=='GRIND_WAIT' ? '待支付' : record.status=='GRIND_SUCCESS' ? '待处理' : record.status=='CANCLE' ? '已取消' : ''}}
        },
        onUnload() {
            if(this.from != 1){
                uni.navigateBack({
                    delta:1
                })
            }
        },
		methods: {
            manageData:function(){
                this.order.receivingAddress = JSON.parse(this.order.receivingAddress)
                this.order.payTime = util.formatTimestamp(this.order.payTime, 'yyyy-MM-dd hh:mm')
                this.order.orderTime = util.formatTimestamp(this.order.payTime, 'yyyy-MM-dd hh:mm')
                this.order.receiveTime = util.formatTimestamp(this.order.receiveTime, 'yyyy-MM-dd hh:mm')
                this.order.sendTime = util.formatTimestamp(this.order.sendTime, 'yyyy-MM-dd hh:mm')
                if(this.order.item){
                    this.order.item.forEach(it => {
                        
                        if(it.icon && JSON.parse(it.icon).length > 0){
                            it.icon = JSON.parse(it.icon)[0].url
                        }
                    })
                }
               
                if(this.order.newStatus){
                    this.order.status = this.order.newStatus
                }
                if(this.order.payType){
                    this.order.payWay = this.order.payType
                }
                if(this.order.status=='GRIND_WAIT' ){
                    this.list1=[{
                    	title: '买家下单',
                    	desc: this.order.orderTime
                    }]
                }
                if(this.order.status=='UNDELIVERY' || this.order.status=='GRIND_DONIG' || this.order.status=='GRIND_SUCCES' || this.order.status=='GRIND_SUCCESS'){
                    this.list1 = [{
                    	title: '买家下单',
                    	desc: this.order.orderTime
                    },{
                    	title: '待发货',
                    	// desc: '2018-11-11'
                    }]
                }
                if(this.order.status=='DELIVERY'){
                    this.list1 = [{
                    	title: '买家下单',
                    	desc: this.order.orderTime
                    },{
                    	title: '待发货',
                    	// desc: '2018-11-11'
                    },{
                        logisticsCompany:this.order.logisticsCompany,
                        logisticsNum:this.order.logisticsNum
                    },{
                    	title: '已发货',
                    	desc: this.order.sendTime,
                        
                    }]
                }
                if(this.order.status=='RECEIVED'){
                    this.list1 = [{
                    	title: '买家下单',
                    	desc: this.order.orderTime
                    },{
                    	title: '待发货',
                    	// desc: '2018-11-11'
                    },{
                        logisticsCompany:this.order.logisticsCompany,
                        logisticsNum:this.order.logisticsNum
                    },{
                    	title: '已发货',
                    	desc: this.order.sendTime,
                    },{
                    	title: '已收货',
                    	desc: this.order.receiveTime
                    }]
                }
                this.list1 = this.list1.reverse();
            },
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/healthy-mall/errorImage.jpg';
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
		},
		filters: {
			toFixed: function(value) {
				return value.toFixed(2);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mk-form {
		background-color: #FFFFFF;
		font-size: 28rpx;
	}
	.header{
		color: #2A3441;
		font-size: 32rpx;
		padding-left: 30rpx;
	}
	.shape{
		border-radius: 10px;
		margin: 30rpx;
		padding: 30rpx 0;
	}
	.order-status{
		background-color: #FFFFFF;
	}
	.form-item-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		// border-bottom: 1rpx solid #eee;
		padding: 0 32rpx;
		&_label {
			font-size: 28rpx;
			color: #A2A9BA;
			width: 150rpx;
			line-height: 2.5;
			&.showAsteriskRect::before {
				content: '';
				color: #E22B2B;
				width: 30rpx;
				display: inline-block;
			}

			&.isRequired::before {
				content: '*';
			}
		}

		&_main {
			font-size: 30rpx;
			flex: 1;
			display: flex;
			color: #434E5E;
			align-items: center;
			overflow: hidden;
			line-height: 2.5;
		}
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
				width: 156rpx;
				height: 156rpx;
				flex-shrink: 0;
				position: relative;
	
				image {
					border-radius: 8upx;
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
		}
	}
</style>
