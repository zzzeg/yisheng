<template>
	<view class="Box">
		<swiper class="swiper" :autoplay="true" :current='currentIndex' :interval="3000" :duration="1000" @change="change">
			<swiper-item  v-for="(item,index) in imgList" :key="index">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFit"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view class="indexBottom">
				{{currentIndex+1}}/{{imgList.length}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				reportName:'',
				currentIndex:0
			};
		},
		onLoad(e) {
			console.log();
			this.type = e.type
			this.id = e.id?e.id:''
			this.init()
			// doctorReportAdd
			// checkupReportAdd
		},
		methods: {
			init(){
				if(this.id){
					switch (this.type){
						case 'doctorReport':
							this.findDoctorReport()
							break;
						case 'checkupReport':
							this.findCheckupReport()
							break;
					}
				}
			},
			change(e){
				this.currentIndex = e.detail.current
			},
			findDoctorReport(){
				this.$api.findDoctorReport({
					id:this.id
				}).then(res=>{
					if (res.status === 'OK') {
						this.imgList =JSON.parse(res.data.files)
						this.reportName = res.data.name
					} 
				}).catch(err=>{
					console.log(err);
				})
			},
			findCheckupReport(){
				this.$api.findCheckupReport({
					id:this.id
				}).then(res=>{
					if (res.status === 'OK') {
						this.imgList =JSON.parse(res.data.files)
						this.reportName = res.data.name
					} 
				}).catch(err=>{
					console.log(err);
				})
			},
			

		},
	}
</script>

<style lang="scss">
	.Box{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.swiper{
			width:750rpx;
			height:708rpx;
			.swiper-item{
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.bottom{
		.indexBottom{
			margin-left: 33rpx;
			margin-top: 21rpx;
			width:96rpx;
			height:46rpx;
			background:rgba(162,169,186,1);
			border-radius:6rpx;
			font-size:29rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(246,246,246,1);
			line-height:42rpx;
			text-align: center;
		}
	}
</style>
