<template>
    <view class="content">
        <view class="sssssss" @touchmove.stop.prevent="moveHandle" :style="{ height: screenHeight }">
            <view class="navigation" :style="{ height: statusBarHeight }">
                <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
                <view class="titleNav">
                    面相舌象
                </view>
            </view>
            
            <view class="titleText">
                请按照示意图进行拍摄！
            </view>
            <view style="color:#FFFFFF; font-size: 30upx; width: 480upx; margin-top: 40upx; margin-left: calc(50% - 240upx); text-align: left;">
                1.正脸面向摄像头并确保拍摄完整的面部；<br>
                2.拍摄时请关闭手机美颜，滤镜等特效。
            </view>
            <image class="faceImage" src="../../../static/image/img_mxsx_rxsytss.png" mode=""></image>
            <button @click="clickCamera" hover-class="button-hover" class="login-btn" >开始拍摄</button>
        </view>
    </view>
</template>

<script>
    var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44 + 'px'
    var screenHeight = uni.getSystemInfoSync().screenHeight + 'px'
    export default {
        
    	data() {
    		return {
    			statusBarHeight: statusBarHeight,
                screenHeight:screenHeight,
                
    		}
    	},
    	onLoad() {
            
            
    	},
        
    	methods: {
            clickCamera:function(){
                var _self = this
                uni.showActionSheet({
                    itemList: ['拍摄', '从手机相册选择'],
                    success: function (res) {
                        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                        if(res.tapIndex==0){
                            _self.chooseImage('camera')
                        }else{
                            _self.chooseImage('album')
                        }
                        
                    },
                    fail: function (res) {
                        console.log(res.errMsg);
                    }
                });
            },
            moveHandle:function(){
                
            },
            clickBack:function(){
                uni.navigateBack({
                    delta:1
                })
            },
            chooseImage: async function(sourceType) {
                uni.chooseImage({
                	sourceType: [sourceType],
                	sizeType: ['original', 'compressed'],
                	count: 1,
                	success: (res) => {
                		console.log(res.tempFilePaths[0]);
                		
                		uni.navigateTo({
                		    url:'faceRecognize?url='+res.tempFilePaths[0] + '&type=0'
                		})
                				
                	},
                	fail: (err) => {
                        
                    }
                })
            }
    	}
    }
</script>

<style>
    .content{
        width: 100%;
        height: 100%;
        background: url('https://coffer.bainuo.cn/mdt-pub/img_syt_bg.png') no-repeat ;
        background-size: 100% ; 
        text-align: center;
    }
    .navigation{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .titleNav{
        width:152upx;
        height:56upx;
        font-size:38upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:56upx;
        position: absolute;
        bottom: 12upx;
        left: calc(50% - 76upx);
    }
    .backBtn{
        position: absolute;
        width: 50upx;
        height: 50upx;
        bottom: 21upx;
        left: 12upx;
    }
    .titleText{
        margin-top: 20upx;
        font-size:46upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:68upx;
    }
    .faceImage{
        margin-top: 50upx;
        width: 350upx;
        height: 400upx;
    }
    .login-btn{
        margin-top: 40upx;
        height: 80upx;
        width: calc(100% - 380upx);
        border-radius: 45upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
</style>
