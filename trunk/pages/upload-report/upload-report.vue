<template>
	<view class="upload">
		<view class="u-f-ac upload-header">
			<text>报告名称</text>
			<input type="text" v-model="reportName" placeholder="请输入报告名称" />
		</view>
		<view class="upload-content">
			<view class="upload-content-header">添加报告图片</view>
			<view class="upload-content-list">
				<view class="u-f-ajc add" @tap="addImage()">
					+
				</view>
				<view class="upload-img" v-for="(item,index) in imgList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
					<view class="delete" @tap="deletePic(item.url,index)">
						x
					</view>
				</view>
			</view>
		</view>
		<view class="tips">
			<template v-if="type=='doctorReport'">
				你可以上传与就医相关的报告，包括病历、化验单、其他检测报告等。
			</template>
			<template v-else>
				你可以上传与体检相关的各种报告。
			</template>
		</view>
		<view class="u-f-ajc done" @tap="submit()">
			完成
		</view>
		
		
		<uni-popup ref="deletetip" type="center" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-content">
					<text class="">确定删除该图片?</text>
				</view>
				<view class="uni-tip-img">
					<image :src="imgsrc" mode="aspectFit"></image>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="cancel()">取消</view>
					<view class="uni-tip-button" @tap="confirmDelete()">删除</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showtip" type="center" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-content">
					<text class="">{{tipsValue}}</text>
				</view>
				<view class="uni-tip-group-button center">
					<view class="uni-tip-button" @tap="confirm()">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportName:'',
				imgList: [],
				uploadParams:null,
				imgsrc:'',
				type:'',//doctorReport就医报告   checkupReport体检报告
				deleteIndex:'',
				tipsValue:'请至少保留一张图片'
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
				const data = {
					purpose: 'useravatar'
				}
				this.$api.getUploadParams({
					data: data
				}).then(res => {
					console.log('getUploadParams')
					console.log(res)
					this.uploadParams = res.data
				}).catch(err=>{
					console.log(err);
				})
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
			addImage() {
				uni.authorize({
					scope: 'scope.camera',
					success:(res)=> {
						if (res.errMsg == 'authorize:ok') {
							console.log('选择上传');
							this.uploadReport();
						}
					},
					fail:(err)=> {
						uni.showToast({
							icon: 'none',
							title: "请先允许小程序获取相机访问权限"
						})
					}
				})
			},
			deletePic(url,index){
				this.imgsrc = url
				this.deleteIndex = index
				this.$refs['deletetip'].open()
			},
			confirmDelete(){
				this.imgList.splice(this.deleteIndex,1)
				this.$refs['deletetip'].close()
			},
			cancel(){
				this.$refs['deletetip'].close()
			},
			uploadReport() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album','camera'],
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths);
						// 假设上传成功
						uni.showLoading({
							title:'上传中...'
						})
						uni.uploadFile({
							url: this.uploadParams.url,
							filePath: tempFilePaths[0],
							name: 'userAvatar',
							formData: {
								policy: this.uploadParams.policy,
								Signature: this.uploadParams.Signature
							},
							success:res=> {
								console.log(res);
								let data = JSON.parse(res.data)
								console.log(data.data);
								if (data.status === 'OK') {
									let url = data.data.location + data.data.filepath
									this.imgList.push({
										url:url
									})
									uni.hideLoading()
								} else {
									uni.showToast({
										title: res.message,
										icon: "none",
										duration: 2000
									})
								}
							},
							fail:(err)=> {
						        console.log(err); 
							},
						
						})
				    }
				});
			},
			submit(){
				if(this.reportName==''){
					this.tipsValue = '报告名称不能为空'
					this.$refs['showtip'].open();
					return
				}
				if(this.imgList<1){
					this.tipsValue = '请至少保留一张图片'
					this.$refs['showtip'].open();
					return
				}
				if(this.type=="doctorReport"){
					if(this.id!=''){
						// 修改 更新
						this.updateDoctorReport()
					}else{
						this.doctorReportAdd()
					}
				}else{
					if(this.id!=''){
						// 修改 更新
						this.updateCheckupReport()
					}else{
						this.checkupReportAdd()
					}
					
				}
				
			},
			confirm(){
				this.$refs['showtip'].close()
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
			doctorReportAdd(){
				this.$api.doctorReportAdd({
					files: JSON.stringify(this.imgList), 
					name: this.reportName,
				}).then(res=>{
					console.log(res);
					if (res.status === 'OK') {
						uni.navigateBack({
							delta:1
						})
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			updateDoctorReport(){
				this.$api.updateDoctorReport({
					files: JSON.stringify(this.imgList), 
					name: this.reportName,
					id:this.id
				}).then(res=>{
					console.log(res);
					if (res.status === 'OK') {
						uni.navigateBack({
							delta:1
						})
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
			checkupReportAdd(){
				this.$api.checkupReportAdd({
					files: JSON.stringify(this.imgList), 
					name: this.reportName,
				}).then(res=>{
					console.log(res);
					if (res.status === 'OK') {
						uni.navigateBack({
							delta:1
						})
					} 
				}).catch(err=>{
					console.log(err);
				})
			},
			updateCheckupReport(){
				this.$api.updateCheckupReport({
					files: JSON.stringify(this.imgList), 
					name: this.reportName,
					id:this.id
				}).then(res=>{
					console.log(res);
					if (res.status === 'OK') {
						uni.navigateBack({
							delta:1
						})
					} 
				}).catch(err=>{
					console.log(err);
				})
			}

		},
	}
</script>

<style lang="scss">
	.upload {
		padding-bottom: 124rpx;
		overflow: hidden;
		.upload-header {
			height: 83rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4px 21px 0px rgba(85, 112, 105, 0.1);
			margin-top: 31rpx;
			padding-left: 33rpx;
			font-size: 29rpx;

			text {
				font-family: PingFangSC-Regular, PingFang SC;
				margin-right: 81rpx;
				font-weight: 400;
				color: rgba(22, 32, 46, 1);
			}

		}

		.upload-content {
			margin-top: 31rpx;
			padding-top: 21rpx;
			padding-left: 33rpx;
			padding-right: 33rpx;
			padding-bottom: 70rpx;
			box-shadow: 0px 4px 21px 0px rgba(85, 112, 105, 0.1);
			background: rgba(255, 255, 255, 1);

			.upload-content-header {
				font-size: 29rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(22, 32, 46, 1);
				line-height: 42rpx;
			}

			.upload-content-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				&>view:nth-child(4n+1){
					margin-left: 0;
				};
				.upload-img {
					margin-top: 33rpx;
					margin-left: 32rpx;
					width: 146rpx;
					height: 146rpx;
					position: relative;
					overflow: hidden;
					image {
						width: 146rpx;
						height: 146rpx;
					}
					.delete {
						width: 31rpx;
						height: 31rpx;
						text-align: center;
						line-height: 26rpx;
						background: rgba(162, 169, 186, 1);
						position: absolute;
						top: 0;
						right: 0;
						color: #FFFFFF;
						font-size: 25rpx;
					}
				}

				.add {
					margin-top: 33rpx;
					width: 146rpx;
					height: 146rpx;
					background: rgba(255, 255, 255, 1);
					border: 2px dashed rgba(56, 62, 86, 1);
					color: #434E5E;
					font-size: 44rpx;
					box-sizing: border-box;
				}
			}
		}
	}

	.tips {
		width: 683rpx;
		margin: 0 auto;
		margin-top: 31rpx;
		font-size: 29rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(162, 169, 186, 1);
		line-height: 42rpx;
	}
	.done{
		width:750rpx;
		height:104rpx;
		background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
		font-size:33rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
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
</style>
