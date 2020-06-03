<template>
    <view class="content">
        <view class="sssssss" :style="{ height: screenHeight }">
            <view class="navigation" :style="{ height: statusBarHeight }">
                <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
                <view class="titleNav">
                    智能辨证
                </view>
            </view>
            <view class="logo" >
                <image src="../../../static/image/img_tx_hyy.png" mode=""></image>
            </view>
            <view class="hello">
                您好！
            </view>
            <view class="welcomeText">
                欢迎使用明我智能辨证
            </view>
            <view class="descriptionText">
                我们将采集您的舌象面相，以及近期的身体感受，来分析您的体质与脏腑情况
            </view>
            <view @click="clickStart" hover-class="button-hover" class="login-btn" >
                <view style="margin-left: 40upx;">
                    立即开始
                </view>
                <view style="flex: 1;" ></view>
                <image  src="../../../static/image/icon_hyy_xyjt.png" mode=""></image>
            </view>
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
            clickStart:function(){
                uni.navigateTo({
                    url:'index'
                })
            },
            clickBack:function(){
                uni.navigateBack({
                    delta:1
                })
            }
    	}
    }
</script>

<style>
    .login-btn image{
        width: 26upx;
        height: 26upx;
        margin-right: 40upx;
    }
    .login-btn {
        margin-left: 163upx;
        margin-right: 163upx;
        margin-top: 180upx;
        height: 90upx;
        line-height: 104upx;
        border-radius: 52upx;
        /* opacity: 0.4; */
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    
    .descriptionText{
        width: 70%;
        margin-left: 15%;
        font-size:28upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:41upx;
    }
    .welcomeText{
        font-size:36upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:54upx;
        margin-top: 20upx;
        margin-bottom: 13upx;
    }
    .hello{
        font-size:46upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(255,255,255,0.9);
        line-height:68upx;
    }
    .content{
        width: 100%;
        height: 100%;
        background: url('https://coffer.bainuo.cn/mdt-pub/ing_hyy_bg.png') no-repeat ;
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
        bottom: 21upx;
        left: calc(50% - 76upx);
    }
    .backBtn{
        position: absolute;
        width: 50upx;
        height: 50upx;
        bottom: 21upx;
        left: 21upx;
    }
    .logo{
        padding-top: 180upx;
    }
    .logo image{
        width: 150upx;
        height: 150upx;
        
    }
</style>
