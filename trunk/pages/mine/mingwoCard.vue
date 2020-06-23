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
                <tki-qrcode class="qqqrrrcode" ref="qrcode" cid="dddddd" :val="codeUrl" size="250" :unit="upx" onval loadMake :usingComponents="true" @result="qrR" />
            </view>
            <view style="color: #A2A9BA;font-size: 24upx;padding-top: 10upx;margin:0 95upx;">
                扫一扫上面的二维码，加入我的健康服务站，为你开启智慧健康服务！
            </view>
        </view>
        <view v-if="type == 2" class="box box2">
            <canvas class="can" @click="clickCanvas" canvas-id="firstCanvas" ></canvas>
            <tki-qrcode style="position: absolute; left: -500upx;background: #FFFFFF;" ref="qrcode" cid="dddddd" :val="codeUrl" size="120" :unit="upx" onval loadMake :usingComponents="true" @result="qrR" />
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
                type:0,
                community:{},
                codeUrl:'dfghjkl',
                codepicUrl:''
            }
        },
        onLoad(options) {
            this.community = this.$store.getters.community
            this.type = options.type
        },
        methods:{
            qrR(res) {
                this.codepicUrl = res
                console.log(res)
                if(this.type == 2){
                    this.toDrawCanvas()
                }
            },
            clickCanvas:function(){
                if(this.saveUrl){
                    wx.previewImage({
                      current: this.saveUrl,
                      urls: [this.saveUrl]
                    })
                }
            },
            saveImage:function(){
                var _self = this
                uni.canvasToTempFilePath({
                  x: 0,
                  y: 0,
                 
                  canvasId: 'firstCanvas',
                  success: function(res) {
                        uni.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success () {
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
                                        if(failRes.errMsg == 'saveImageToPhotosAlbum:fail auth deny'){
                                            uni.showToast({
                                                title: "保存失败，请授权保存到相册",
                                                icon: "none"
                                            });
                                            
                                            setTimeout(function() {
                                                console.log('openSetting')
                                                uni.openSetting({
                                                  success(res) {
                                                        console.log(res.authSetting)
                                                  },fail(res) {
                                                      console.log(res)
                                                  }
                                                });
                                            },2000)
                                        }
                                	}
                                });
                            }
                        })
                        
                    
                  } 
                })
                
            },
            toDrawCanvas() {
                let that=this
                let title = that.community.name
                let introduction = that.community.province + ' | ' + that.community.city 
                //'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简..'
                // console.log(title)
            	let ctx = uni.createCanvasContext('firstCanvas')
                
                let canvaWidth=uni.upx2px(690)
                let canvaHight=uni.upx2px(820)
                
                ctx.setFillStyle('#FFFFFF'); //canvas背景颜色
                ctx.fillRect(0, 0, canvaWidth, canvaHight);
                
            	//uni.upx2px()是尺寸单位转换方法，622为rpx单位，换成px为311，根据设计稿来编辑
            	
            	//绘制文字居中对齐使用，根据我的理解，这个数值是要为需要截图区域宽度的一半
            	let centerCode=uni.upx2px(311)	
            	let xx=uni.upx2px(64)
            	let yy=uni.upx2px(48)
            	let font=uni.upx2px(32)//字体大小
            	let yzmtop=uni.upx2px(80)
            	let yzmleft=uni.upx2px(232)
            	
            	//标题
            	ctx.setFillStyle('#434E5E')//文字颜色
            	ctx.setFontSize(font)
            	ctx.textAlign="start"//居中，而且这个需要放在ctx.setFontSize()后面，其他api就没去一一使用过
            	//绘制文字ctx.fillText(需要绘制的文字,x轴距离,y轴距离);
                let _strLastIndex = 0; //每次开始截取的字符串的索引
                let _strHeight = yzmtop; //绘制字体距离canvas顶部的初始高度
                let _num=1;
                let _strlineW = 0; //文本宽度
                let C_P = 10
                
                console.log(that.community.icon)
                let fengmianimg=that.community.icon
                
                let fmCodeX=10
                let fmCodeW= canvaWidth - fmCodeX*2
                let fmCodeY= canvaHight/2 - fmCodeW/2 - 20
                ctx.drawImage(fengmianimg,fmCodeX,fmCodeY,fmCodeW,fmCodeW)
                
                let titleW = ctx.measureText(title).width;
                               
                ctx.fillText(title,(canvaWidth - titleW)/2,yy + 10);
                
                // ctx.fillText(introduction,centerCode,yzmtop);img_1234567
            	
            	//绘制二维码位置
            	let erweimaimg=that.codepicUrl
                let towCodeW=uni.upx2px(200)
            	let towCodeX= canvaWidth - uni.upx2px((750-120-200)/2) -10
            	let towCodeY= fmCodeY + fmCodeW +20
            	
            	ctx.drawImage(erweimaimg,towCodeX,towCodeY,towCodeW,towCodeW)
            	
                ctx.setFillStyle('#434E5E')//文字颜色
                let fontff=uni.upx2px(20)//字体大小
                ctx.setFontSize(fontff)
                ctx.textAlign="start"
                ctx.fillText('扫一扫查看详情',towCodeX + 20 ,towCodeY + towCodeW + 10);
                
                ctx.setFillStyle('#16202E')//文字颜色
                let fontf=uni.upx2px(34)//字体大小
                ctx.setFontSize(fontf)
                ctx.textAlign="start"
                ctx.fillText(title,10,towCodeY + 10);
                
            	ctx.draw()//结束绘画
            }
        }
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }

    .box{
        margin: 126upx 30upx;
        background: #FFFFFF;
        border-radius:16upx;
        box-shadow:0upx 4upx 20upx 0upx rgba(85,112,105,0.1);
        height: 840upx;
    }
    .box2{
        margin-top: 80upx;
        height: 820upx;
    }
    .topBox{
        display: flex;
        flex-direction: row;
        padding: 40upx;
    }
    .qqqrrrcode{
        margin:15upx 0upx;
    }
    .can{
        height:100%;
        width:100%;
    }
</style>
