<template>
	<view style="padding-bottom:130rpx ;overflow: hidden;">
		<template v-if="reportList.length>0">
			<view class="u-f u-column record-item" v-for="(item, index) in reportList" :key="index" @tap="gotoDetail(item.id)" @longpress="deleteItem(item.id)">
				<view class="u-f-jsb" >
					<view class="u-f-ac time">
						<image src="/static/image/icon_dd_sj@2x.png" mode="aspectFit"></image>
						<text style="margin-left: 10rpx;">{{ item.createTime|formatDate }}</text>
					</view>
					<text class="edit" @tap.stop="editReport(item.id)">编辑</text>
				</view>
				<view class="name">
					{{ item.name}}
				</view>
				<view class="upload-content-list">
					<view class="upload-img" v-for="(img,index) in item.files" :key="index">
						<image :src="img.url" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view v-if="ismore">
				<uni-load-more :status="status"  :content-text="contentText" color="#dedede"  />
			</view>
		</template>
		<template v-else>
			<view class="u-f-ac u-column" style="margin:100rpx 0 40rpx 0;">
				<image src="/static/image/img_zwbzjl@2x.png" class="disinline" style="width:232rpx; height:232rpx;"></image>
				<text class="noreport">您还没有上传任何就医报告</text>
				<text class="please">请点击下方的上传报告按钮上传</text>
			</view>
		</template>
		
		
		
		<view class="u-f-ajc done" @tap.stop="gotoupload()">
			<text class="colorG">⊕</text>
			<text style="margin-top: 10rpx;margin-left: 10rpx;">上传新报告</text>
		</view>
		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-content">
					<text class="">确定删除整份报告?</text>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="cancel()">取消</view>
					<view class="uni-tip-button" @tap="confirmDelete()">删除</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import util from '../../common/util.js'
	export default {
		data() {
			return {
				reportList: [],
				page: 1,
				totalPages:1,
				contentText: {
				    contentdown: '查看更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多',
				},
				ismore:false,
				status:'',
				currentId:''
			}
		},
		onLoad() {
		},
		onShow() {
			this.init()
		},
		methods: {
			init(){
				this.reportList = [],
				this.page = 1,
				this.totalPages = 1,
				this.requestData(1)
			},
			requestData(page) {
				this.$api.doctorReport({
					size: 10,
					page: page
				}).then(res => {
					console.log(res);
					if (res.status == "OK") {
						let arr = this.reportList
						let data = res.list
						this.totalPages = res.totalPages
						if(res.totalPages>1){
							this.ismore = true
						}
						data.forEach(item => {
							item.files = JSON.parse(item.files)
						})
						this.reportList = arr.concat(data)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			gotoupload(){
				uni.navigateTo({
					url:'/pages/upload-report/upload-report?type=doctorReport'
				})
			},
			gotoDetail(id){
				uni.navigateTo({
					url:'/pages/look-report/look-report?type=doctorReport&id='+id
				})
			},
			deleteItem(id){
				this.currentId = id
				this.$refs['showtip'].open();
			},
			confirmDelete(){
				this.$api.deleteDoctorReport({
					id:this.currentId
				}).then(res=>{
					if(res.status == "OK"){
						this.page = 1
						this.reportList = []
						this.requestData(1)
						this.$refs['showtip'].close()
					}
				}).catch(err=>{
					console.log(err);
				})
				
			},
			cancel(){
				this.$refs['showtip'].close()
			},
			editReport(id){
				uni.navigateTo({
					url:'/pages/upload-report/upload-report?type=doctorReport&id='+id
				})
			},
		},
		onReachBottom() {
			console.log('onReachBottom')
			if(this.page<this.totalPages){
				this.status = 'loading'
				this.page++
				this.requestData(this.page)
			}else{
				this.status = ''
			}
			
		},
		filters: {
			formatDate: function(value) {
				return util.formatTimestamp(value, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style lang="scss">
	.record-item {
		margin: 30rpx;
		font-size: 28rpx;
		padding: 30rpx;
		border-radius: 10px;
		background-color: #FFFFFF;
		overflow: hidden;
		.name {
			font-size:33rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(22,32,46,1);
			line-height:46rpx;
		}

		.doctor {
			color: #434E5E;
		}
		.time {
			color: #A2A9BA;
			// margin-top: 20rpx;
			margin-bottom: 12rpx;
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
		.edit{
			ont-size:29rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(3,190,144,1);
			line-height:42rpx;
		}

		.status {
			margin-top: 20rpx;
			// color: #03BE90;

			view:nth-child(2) {
				font-size: 24rpx;
				color: #FFFFFF;
				padding: 0 20rpx;
				background: linear-gradient(315deg, rgba(136, 226, 150, 1) 0%, rgba(3, 190, 144, 1) 100%);
				border-radius: 14px;
			}

		}
	}

	.upload-content-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;

		&>view:nth-child(4n+1) {
			margin-left: 0;
		}

		.upload-img {
			margin-top: 33rpx;
			margin-left: 15rpx;
			width: 146rpx;
			height: 146rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 146rpx;
				height: 146rpx;
			}
		}
	}
	.colorG{
		color: rgba(3,190,144,1);
		font-size: 50rpx;
	}
	.done{
		width:750rpx;
		height:104rpx;
		background:#FFFFFF;
		font-size:33rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#16202E;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.uni-tip{
		padding: 44rpx 65rpx;
		min-height:250rpx;
		width:563rpx;
		background:rgba(255,255,255,1);
		border-radius:31rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.uni-tip-content{
			font-size:31rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(109,116,128,1);
			line-height:46rpx;
		}
		.uni-tip-img{
			margin: 27rpx 0;
			image{
				width:138rpx;
				height:129rpx;
			}
		}
		.uni-tip-group-button{
			display: flex;
			justify-content: space-between;
			align-self: stretch;
			&.center{
				justify-content: center;
			}
			.uni-tip-button{
				width:208rpx;
				height:75rpx;
				line-height: 75rpx;
				background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
				box-shadow:0px 6px 31px 0px rgba(3,190,144,0.3);
				border-radius:38rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
	.noreport{
		font-size:33rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(67,78,94,1);
		line-height:46rpx;
	}
	.please{
		margin-top: 12rpx;
		font-size:29rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(162,169,186,1);
		line-height:42rpx;
	}
</style>
