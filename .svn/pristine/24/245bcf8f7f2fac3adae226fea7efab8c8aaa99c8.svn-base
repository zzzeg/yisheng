<template>
	<view>
		<view class="mk-form">
			<view class="form-item-container">
				<view class="form-item-container_label showAsteriskRect">收件人：</view>
				<view class="form-item-container_main">
					<input class="uni-input" placeholder-style="color:#c6cad4" v-model="addressData.name" placeholder="请输入收件人姓名" />
				</view>
			</view>
			<view class="form-item-container">
				<view class="form-item-container_label showAsteriskRect">联系方式：</view>
				<view class="form-item-container_main">
					<input class="uni-input" type='number' placeholder-style="color:#c6cad4" v-model="addressData.mobile" placeholder="请输入收件人联系方式" />
				</view>
			</view>
			<view class="form-item-container">
				<view class="form-item-container_label showAsteriskRect">所在地区：</view>
				<view class="form-item-container_main">
					<view @tap="showRegionsPicker" :class="[addressData.regions==''?'form-input-placeholder':'']">{{addressData.regions==''?'-选择省市区-':addressData.regions}}</view>
					<pick-regions @onConfirm="confirm" @onCancel="cancel" ref="regions">
					</pick-regions>
				</view>
			</view>
			<view class="form-item-container">
				<view class="form-item-container_label showAsteriskRect">详细地址：</view>
				<view class="form-item-container_main">
					<textarea v-model="addressData.detailAddress" placeholder-style="color:#c6cad4" placeholder="请输入门牌号信息" auto-height />
					</view>
			</view>
		</view>
		
		<view class="btn-area">
			<text @tap="formSubmit()" type="primary" class="btnSave">保存</text>
		</view>
	</view>
</template>
   
<script>
	import pickRegions from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
    import util from '../../common/util.js'
	export default{
		components: {
			pickRegions
		},
		onLoad() {
			uni.getStorage({
				key: 'deliAddress',
				success: (e) => {
					this.addressData = e.data;
				}
			})
		},
		data() {
			return {
				genderIndex:0,
				addressData:{
					name:'',
					mobile:'',
					regions:'',
                    provinceName:'',
                    cityName:'',
                    areaName:'',
					detailAddress:''
				}
			}
		},
		methods: {
			formSubmit(){
				let data = this.addressData;
				if(!data.name){
					uni.showToast({
						title:'请填写收货人姓名',
						duration:1000,
						icon:'none'
					});
				}
				if(!util.verifyMobile(data.mobile) ){
					uni.showToast({
						title:'请输入正确的手机号码',
						duration:1000,
						icon:'none'
					});
					return;
				}
				if(!data.regions){
					uni.showToast({
						title:'请在选择所在地区',
						duration:1000,
						icon:'none'
					});
					return;
				}
				if(!data.detailAddress){
					uni.showToast({
						title:'请填写门牌号信息',
						duration:1000,
						icon:'none'
					});
					return;
				}
				let pages = getCurrentPages()
				let prePage = pages[pages.length - 2]
				prePage.setData({
					addressData: data
				})
				uni.showToast({
					title:'保存成功',
					duration:1000,
					icon:'none'
				});
				uni.setStorage({
					key:'deliAddress',
					data: this.addressData,
					success:()=> {
						uni.navigateBack()
					}
				})
			},
			showRegionsPicker(){
				this.$refs['regions'].showPickerView()
			},
			// 获取选择的地区
			confirm(value){
				console.log(value.label.split('-'));
                this.addressData.provinceName = value.label.split('-')[0],
                this.addressData.cityName = value.label.split('-')[1],
                this.addressData.areaName = value.label.split('-')[2],
				this.addressData.regions = value.label.split('-').join('')
			},
			cancel(value){
				console.log(value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mk-form{
		background-color: #FFFFFF;
		font-size: 28rpx;
	}
	.form-item-container{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		border-bottom: 1rpx solid #eee;
		padding: 0 32rpx;
		&_label{
			font-size: 30rpx;
			color: #16202E;
			line-height: 100rpx;
			width: 200rpx;
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
		&_main{
			font-size: 30rpx;
			flex: 1;
			min-height: 100rpx;
			display: flex;
			align-items: center;
			overflow: hidden;
		}
	}
	.column{
		flex-direction: column;
		.upload{
			align-self:stretch;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.upl-item{
				width:320rpx;
				height:200rpx;
				border-radius:8px;
				border:1px dashed rgba(187,187,187,1);
			}
		}
	}
	.uni-input {
		font-size: 30rpx;
		color: #434E5E;
		line-height: 80rpx;
		background:#FFF;
		flex: 1;
	}
	.form-input-placeholder{
		font-size:30rpx;
		color:#c6cad4;
	}
	.btn-area{
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		.btnSave{
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 32rpx;
			width: 650rpx;
			height: 100rpx;
			background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
			box-shadow:0px 3px 15px 0px rgba(3,190,144,0.3);
			border-radius:25px;
		}
		
	}
</style>
