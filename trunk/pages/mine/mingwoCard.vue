<template>
	<view class="content">
		<view v-if="type == 1" class="box">
			<view class="topBox">
				<image style="width: 100upx;height: 100upx;" :src="community.icon" mode=""></image>
				<view style="margin-left: 30upx;">
					<view style="font-size: 28upx;color: #16202E;">
						{{!community.name ? '' : community.name}}
					</view>
					<view style="font-size: 20upx;color: #A2A9BA;">
						{{!community.province ? '' : community.province}} | {{!community.city ? '' : community.city}}
					</view>
				</view>
			</view>
			<view style="padding-left: 95upx;">
				<tki-qrcode class="qqqrrrcode" ref="qrcode" cid="dddddd" :val="codeUrl" size="250" :unit="upx" onval loadMake
				 :usingComponents="true" @result="qrR" />
			</view>
			<view style="color: #A2A9BA;font-size: 24upx;padding-top: 10upx;margin:0 95upx;">
				扫一扫上面的二维码，加入我的健康服务站，为你开启智慧健康服务！
			</view>
		</view>
		<view v-if="type == 2" class="box box2">
			<canvas class="can" @click="clickCanvas" canvas-id="firstCanvas"></canvas>
			<tki-qrcode style="position: absolute; left: -500upx;background: #FFFFFF;" ref="qrcode" cid="dddddd" :val="codeUrl"
			 size="120" :unit="upx" onval loadMake :usingComponents="true" @result="qrR" />
			 
			 <button type="default" class="saveImgbtn" @click="saveImage">保存成图片</button>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				type: 0,
				community: {},
				codeUrl: '',
				codepicUrl: ''
			}
		},
		onLoad(options) {
			this.community = this.$store.getters.community
			this.type = options.type
			this.codeUrl = this.community.channelUrl;
		},
		methods: {
			qrR(res) {
				this.codepicUrl = res
				console.log('url is sssss', this.codepicUrl)
				console.log(res)
				if (this.type == 2) {
					this.toDrawCanvas()
				}
			},
			clickCanvas: function() {
				console.log('clickCanvas');
				if (this.saveUrl) {
					wx.previewImage({
						current: this.saveUrl,
						urls: [this.saveUrl]
					})
				}
			},
			saveImage: function() {
				var _self = this
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'firstCanvas',
					success: function(res) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(successRes) {
										_self.saveUrl = res.tempFilePath
										wx.previewImage({
											current: res.tempFilePath,
											urls: [res.tempFilePath]
										})
										uni.showToast({
											title: "保存成功",
											icon: "none"
										});
									},
									fail: function(failRes) {
										console.log(failRes)
										if (failRes.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
											uni.showToast({
												title: "保存失败，请授权保存到相册",
												icon: "none"
											});
											setTimeout(function() {
												console.log('openSetting')
												uni.openSetting({
													success(res) {
														console.log(res.authSetting)
													},
													fail(res) {
														console.log(res)
													}
												});
											}, 2000)
										}
									}
								});
							}
						})


					}
				})

			},
			toDrawCanvas() {
				let that = this
				let title = that.community.name
				let introduction = that.community.province + ' | ' + that.community.city
				let ctx = uni.createCanvasContext('firstCanvas')

				let canvaWidth = uni.upx2px(690)
				let canvaHight = uni.upx2px(820)

				ctx.setFillStyle('#FFFFFF'); //canvas背景颜色
				ctx.fillRect(0, 0, canvaWidth, canvaHight);


				let hg = uni.upx2px(34)
				// 位置
				let titleLocation = {
						x: uni.upx2px(244),
						y: uni.upx2px(170),
						font: uni.upx2px(34)
					},
					province = {
						x: uni.upx2px(260),
						y: uni.upx2px(224),
						font: uni.upx2px(24)
					},
					type = {
						x: uni.upx2px(214),
						y: uni.upx2px(272),
						font: uni.upx2px(26)
					},
					qrcode = {
						x: uni.upx2px(226),
						y: uni.upx2px(368)
					},
					tips = {
						x: uni.upx2px(106),
						y: uni.upx2px(678),
						font: uni.upx2px(24)
					},
					icon = {
						x: uni.upx2px(296),
						y: uni.upx2px(40)
					};



				ctx.setFillStyle('#16202E') //文字颜色
				ctx.setFontSize(titleLocation.font)
				ctx.setTextAlign('center')
				ctx.fillText(title, canvaWidth / 2, titleLocation.y + 10);

				ctx.setFillStyle('#A2A9BA') //文字颜色
				ctx.setFontSize(province.font)
				ctx.fillText(introduction, canvaWidth / 2, province.y);

				ctx.setFillStyle('#03BE90') //文字颜色
				ctx.setFontSize(type.font)
				ctx.fillText(`服务站类型：${that.community.tagPName}`, canvaWidth / 2, type.y);

				ctx.setFillStyle('#A2A9BA') //文字颜色
				ctx.setFontSize(tips.font)
				ctx.fillText(`扫一扫上面的二维码，加入我的健康服务站，`, canvaWidth / 2, tips.y);
				ctx.fillText(`为你开启智慧健康服务！`, canvaWidth / 2, tips.y + hg);





				//绘制二维码位置及icon
				let erweimaimg = that.codepicUrl
				// let towCodeX= canvaWidth - uni.upx2px((750-120-200)/2) -10
				// let towCodeY = fmCodeY + fmCodeW + 20
				let fengmianimg = that.community.icon
				let towCodeW = uni.upx2px(240)
				let towIconW = uni.upx2px(100)
				let towCodeX = canvaWidth / 2 - towCodeW / 2

				ctx.drawImage(erweimaimg, towCodeX, qrcode.y, towCodeW, towCodeW)
				uni.downloadFile({
					url: fengmianimg,
					success: (res) => {
						ctx.save();
						ctx.drawImage(res.tempFilePath, (canvaWidth-towIconW)/2, icon.y, towIconW, towIconW)
						ctx.draw();
					}
				})



				//结束绘画
			}

		}
	}
</script>

<style>
	page {
		background: #EFF1F6;
	}

	.box {
		margin: 126upx 30upx;
		background: #FFFFFF;
		border-radius: 16upx;
		box-shadow: 0upx 4upx 20upx 0upx rgba(85, 112, 105, 0.1);
		height: 840upx;
	}

	.box2 {
		margin-top: 80upx;
		height: 820upx;
	}

	.topBox {
		display: flex;
		flex-direction: row;
		padding: 40upx;
	}

	.qqqrrrcode {
		margin: 15upx 0upx;
	}

	.can {
		height: 100%;
		width: 100%;
	}
	.saveImgbtn{ background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
box-shadow:0px 6px 30px 0px rgba(3,190,144,0.3);
border-radius:86px; color:#FFFFFF!important; margin-top:60rpx; width:70%; font-size:30rpx; line-height:2.8;}
</style>
