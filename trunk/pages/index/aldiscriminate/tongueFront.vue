<template>
    <view class="content">
        <view class="sssssss" @touchmove.stop.prevent="moveHandle" :style="{ height: screenHeight }">
            <view class="navigation" :style="{ height: statusBarHeight }">
                <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
                <view class="titleNav">
                    面像舌象
                </view>
            </view>
            <view class="titleText">
                拍摄舌象正面
            </view>
            <view class="hint">
                <p>1.正常自然光线，避免过亮过暗或有其他外光线照射；</p>
                <p>2.舌体自然伸出，不用力外伸；</p>
                <p>3.吃过带颜色食物后和饭后半小时之内不可拍摄；</p>
                <p>4.拍照时请关闭美颜，滤镜以及其他特效功能；</p>
            </view>
            <image class="faceImage" src="https://coffer.bainuo.cn/mdt-pub/img_stzm.png" mode=""></image>
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
                		console.log(res.tempFilePaths)
                        uni.navigateTo({
                            url:'faceRecognize?url='+res.tempFilePaths[0] + '&type=1'
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
        width: 387upx;
        height: 343upx;
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
    .hint{
        margin-top: 30upx;
        margin-left: 190upx;
        width: calc(100% - 380upx);
        color: #FFFFFF;
        text-align: left;
        font-size:26upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:38upx;
    }
    p{margin:0 auto; padding:5upx 0} 
</style>
