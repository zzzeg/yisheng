<template>
    <view class="content">
        <view class="sssssss" @touchmove.stop.prevent="moveHandle" :style="{ height: screenHeight }">
            <view class="box" :animation="animationData" ></view>
            <view class="navigation" :style="{ height: statusBarHeight + 'px'}">
                <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
                <view class="titleNav">
                    体质辨识
                </view>
            </view>
            <view class="boxTop">
                <view class="topTitleBox">
                    <image src="../../../static/image/img_tx_hyy.png" mode=""></image>
                    <view class="topTitleText">
                        欢迎使用明我体质智能辨识
                    </view>
                </view>
                <view class="topContentText">
                    我们将采集您的舌象面相，以及近期的身体感受，来分析您的体质与脏腑情况：
                </view>
            </view>
            <view class="contentBox">
                <view v-if="isShowItem" :animation="contentItemBasic" @click="clickBasic" class="contentItem">
                    <view class="itemTop">
                        <image src="../../../static/image/icon_znbz_txxx.png" mode=""></image>
                        <view class="itemTopText">
                            第一步：填写基本信息
                        </view>
                        <view class="itemTopBtn" :class="{yellowBorder:firstStepState}">
                            <text v-if="firstStepState!=1" >未完成</text> 
                            <image v-if="firstStepState==1" src="../../../static/image/img_dg_yellow.png" mode=""></image>
                        </view>
                    </view>
                    <view class="itemContent">
                        性别，年龄等基本信息，会影响评估结果与食方制定。
                    </view>
                </view>
                <view v-if="isShowItem" :animation="contentItemTongue" @click="clickTongue" class="contentItem" style="top: 240upx;">
                    <view class="itemTop">
                        <image src="../../../static/image/icon_znbz_mxsx.png" mode=""></image>
                        <view class="itemTopText">
                            第二步：拍摄面相舌象
                        </view>
                        <view  :class="[theSecondState==1 ? 'yellowBorder' : theSecondState==2 ? 'grayBorder' : '']" class="itemTopBtn">
                            <text v-if="theSecondState!=1" >未完成</text>
                            <image v-if="theSecondState==1" src="../../../static/image/img_dg_yellow.png" mode=""></image>
                        </view>
                    </view>
                    <view class="itemContent">
                        通过面相，舌形、舌下络脉、苔质、舌色、津液、苔色以判断体质性质、气血盛衰、津液盈亏及脏腑虚实。
                    </view>
                </view>
                <view v-if="isShowItem" :animation="contentItemHealth" @click="clickHealth" class="contentItem" style="top: 480upx;">
                    <view class="itemTop">
                        <image src="../../../static/image/icon_znbz_jkxx.png" mode=""></image>
                        <view class="itemTopText">
                            第三步：填写健康信息
                        </view>
                        <view  :class="[theThirdState==1 ? 'yellowBorder' : theThirdState==2 ? 'grayBorder' : '']"  class="itemTopBtn">
                            <text v-if="theThirdState!=1" >未完成</text>
                            <image v-if="theThirdState==1" src="../../../static/image/img_dg_yellow.png" mode=""></image>
                        </view>
                    </view>
                    <view class="itemContent">
                        您近两周身体各部位的不适反应，结合面相舌象来做更精准详细的判断。
                    </view>
                </view>
                <button v-if="!showEnvelope" style="top: 780upx;" :animation="animationBtnData" @click="clickDiscriminate"  class="discriminate-btn" :class="{btnopacity:isActive}">提交辨识</button>
                <view v-if="showEnvelope" :animation="animationEnvelopeData" class="envelopeBox" >
                    <view :animation="animationEnvelopeCapData" class="envelopeCap" :class="{zIndex:showCap}">
                        <image src="../../../static/image/img_xf_g.png" mode=""></image>
                    </view>
                    <view class="envelopebg"></view>
                    <view class="envelopeContent">
                        <image src="../../../static/image/img_xf_fm.png" mode=""></image>
                    </view>
                </view>
                <view :animation="animationSucceesData" v-if="showSucceedBox" class="envelopeBox" style="top: 400upx;">
                    <image src="../../../static/image/img_znbz_tjcg.png" mode=""></image>
                    <view class="succeesText">
                        提交成功
                    </view>
                    <button @click="clickSuccees" hover-class="button-hover" class="login-btn" >查看报告</button>
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
    import util from '../../../common/util.js';
    
    import api from '../../../common/api.js';
    
    var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44
    
    var screenHeight = uni.getSystemInfoSync().screenHeight + 'px'
    
    export default {
        
    	data() {
    		return {
    			statusBarHeight: statusBarHeight,
                screenHeight:screenHeight,
                animationData: {},
                contentItemBasic:{},
                contentItemTongue:{},
                contentItemHealth:{},
                animationBtnData:{},
                animationEnvelopeCapData:{},
                animationEnvelopeData:{},
                animationSucceesData:{},
                showEnvelope:false,
                showCap:false,
                isShowItem:true,
                showSucceed:false,
                showSucceedBox:false,
                firstStepState:0,
                theSecondState:2,       //
                theThirdState:2,
                isActive:false,
                rid:null
    		}
    	},
    	onLoad() {
            this.startAnimation()
    	},
        onShow() {
            
            const alInfo = uni.getStorageSync('AlInfo');
            if(alInfo && alInfo.height){
                this.firstStepState = 1
                this.theSecondState = 0
                this.theThirdState = 2
            }
            if(alInfo && alInfo.tongueImages && alInfo.tongueImages.back && alInfo.tongueImages.back.length > 2){
                this.theSecondState = 1
                this.theThirdState = 0
            }
            
            if(alInfo && alInfo.question){
                var questionAry = JSON.parse(alInfo.question)
                var i = questionAry.length - 1
                if(questionAry[i] && questionAry[i].value.length>0){
                    this.theThirdState = 1
                    this.isActive = true
                }
            }
        },
        onUnload() {
            console.log("onUnload")
            uni.removeStorageSync("AlInfo")
        },
    	methods: {
            startAnimation:function(){
                var animation = uni.createAnimation({
                    duration: 1000,
                    timingFunction: 'ease',
                })
                
                var animationinfo = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var animationinTongue = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var animationinHealth = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var animationinBtn = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                
                this.animation = animation
                var screenWidth = uni.getSystemInfoSync().screenWidth
                var _self = this
                setTimeout(function() {
                    this.animation.scale(20, 20).step()
                    this.animationData = this.animation.export()
                    
                    animationinfo.translate(-screenWidth).step()
                    animationinfo.translate(-screenWidth + 60).step({ duration: 200 })
                    animationinfo.translate(-screenWidth + 10).step({ duration: 200 })
                    animationinfo.translate(-screenWidth + 50).step({ duration: 200 })
                    animationinfo.translate(-screenWidth + 20).step({ duration: 200 })
                    animationinfo.translate(-screenWidth + 25).step({ duration: 200 })
                    animationinfo.translate(-screenWidth + 15).step({ duration: 200 })
                    this.contentItemBasic = animationinfo.export()
                    
                }.bind(this), 800)
                setTimeout(function() {
                    animationinTongue.translate(-screenWidth).step()
                    animationinTongue.translate(-screenWidth + 60).step({ duration: 200 })
                    animationinTongue.translate(-screenWidth + 10).step({ duration: 200 })
                    animationinTongue.translate(-screenWidth + 50).step({ duration: 200 })
                    animationinTongue.translate(-screenWidth + 20).step({ duration: 200 })
                    animationinTongue.translate(-screenWidth + 25).step({ duration: 200 })
                    animationinTongue.translate(-screenWidth + 15).step({ duration: 200 })
                    this.contentItemTongue = animationinTongue.export()
                }.bind(this), 1600)
                setTimeout(function() {
                    animationinHealth.translate(-screenWidth).step()
                    animationinHealth.translate(-screenWidth + 60).step({ duration: 200 })
                    animationinHealth.translate(-screenWidth + 10).step({ duration: 200 })
                    animationinHealth.translate(-screenWidth + 50).step({ duration: 200 })
                    animationinHealth.translate(-screenWidth + 20).step({ duration: 200 })
                    animationinHealth.translate(-screenWidth + 25).step({ duration: 200 })
                    animationinHealth.translate(-screenWidth + 15).step({ duration: 200 })
                    this.contentItemHealth = animationinHealth.export()
                }.bind(this), 2400)
                setTimeout(function() {
                    animationinBtn.translate(-screenWidth + 70).step()
                    animationinBtn.translate(-screenWidth + 130).step({ duration: 200 })
                    animationinBtn.translate(-screenWidth + 80).step({ duration: 200 })
                    animationinBtn.translate(-screenWidth + 120).step({ duration: 200 })
                    animationinBtn.translate(-screenWidth + 90).step({ duration: 200 })
                    animationinBtn.translate(-screenWidth + 95).step({ duration: 200 })
                    animationinBtn.translate(-screenWidth + 80).step({ duration: 200 })
                    this.animationBtnData = animationinBtn.export()
                }.bind(this), 2400)
                setTimeout(function() {
                    this.animationData = {}
                }.bind(this), 2000)
            },
            moveHandle:function(){
                
            },
            clickStart:function(){
                uni.navigateTo({
                    url:'index'
                })
            },
            clickBack:function(){
                uni.removeStorageSync("AlInfo")
                uni.navigateBack({
                    delta:1
                })
            },
            clickBasic:function(){
                uni.navigateTo({
                    url:'basicInfo'
                })
            },
            clickTongue:function(){
                if(this.firstStepState!=1){
                    return
                }
                uni.navigateTo({
                    url:'faceCamera'
                })
            },
            clickHealth:function(){
                if(this.theSecondState!=1){
                    return
                }
                uni.navigateTo({
                    url:'healthInfo'
                })
            },
            clickSuccees:function(){
                uni.removeStorageSync("AlInfo")
                uni.navigateTo({
                    url:'../physicalReport2?reportType=1&reportId='+this.rid
                })
            },
            clickDiscriminate:function(){
         
                if(this.firstStepState && this.theSecondState && this.theThirdState){
                    var userinfo = uni.getStorageSync('userinfo')
					var alInfo = uni.getStorageSync('AlInfo');
                    alInfo.communityId =  this.$store.getters.communityId;
					alInfo.userId = userinfo.id;
					alInfo.phone =  userinfo.phone;
                    api.dialWithQuesTestWithTongue({
                        data:alInfo
                    }).then(res => {
                        console.log('dialWithQuesTestWithTongue')
                        console.log(res)
                        if(res.status === 'OK'){
                            uni.removeStorageSync("AlInfo")
                            this.envelopeAnimationin()
                            this.rid = res.data.id
                        }else{
                            uni.showToast({
                                title: res.message,
                                icon: "none",
                                duration: 2000
                            })
                        }
                    })
                }
            },
            envelopeAnimationin:function(){
                this.showEnvelope = true
                var animationinfo = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var animationinTongue = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var animationinHealth = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                
                var animationEnvelopeCap = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                
                var animationEnvelope = uni.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                var screenWidth = uni.getSystemInfoSync().screenWidth
                       
                var bili = 0.58
                
                animationinfo.translate(-screenWidth + 15,uni.upx2px(40)).step()
                animationinTongue.translate(-screenWidth + 15,uni.upx2px(-130)).step()
                animationinHealth.translate(-screenWidth + 15,uni.upx2px(-300)).step()
                animationinfo.scale(bili, bili).translate(-screenWidth + 15,uni.upx2px(300)).step()
                animationinTongue.scale(bili, bili).translate(-screenWidth + 15,uni.upx2px(60)).step()
                animationinHealth.scale(bili, bili).translate(-screenWidth + 15,uni.upx2px(-80)).step()
                animationinfo.translate(-screenWidth + 15,uni.upx2px(555)).step()
                animationinTongue.translate(-screenWidth + 15,uni.upx2px(350)).step()
                animationinHealth.translate(-screenWidth + 15,uni.upx2px(200)).step()
                
                this.contentItemBasic = animationinfo.export()
                this.contentItemTongue = animationinTongue.export()
                this.contentItemHealth = animationinHealth.export()
                
                setTimeout(function() {
                    this.showCap = true
                    animationEnvelopeCap.rotateX(180).step()
                    this.animationEnvelopeCapData = animationEnvelopeCap.export()
                    setTimeout(function() {
                        this.isShowItem = false
                        animationEnvelope.translate(-screenWidth,uni.upx2px(-1500)).step()
                        this.animationEnvelopeData = animationEnvelope.export()
                        setTimeout(function() {
                            this.isShowItem = false
                            this.showSucceedBox = true
                            setTimeout(function() {
                                this.isShowItem = false
                                var animationSuccees = uni.createAnimation({
                                    duration: 500,
                                    timingFunction: 'ease',
                                })
                                animationSuccees.translate(0,uni.upx2px(-250)).step()
                                this.animationSucceesData = animationSuccees.export()
                            }.bind(this), 200)
                        }.bind(this), 100)
                    }.bind(this), 500)
                }.bind(this), 1500)
            }
    	}
    }
</script>

<style>
    .login-btn {
        position: absolute;
        z-index: 25;
        margin-top: 40upx;
        height: 90upx;
        width: 100%;
        line-height: 90upx;
        border-radius: 45upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    .envelopeBox{
        position: absolute;
        bottom: 0upx;
        left: calc(50% - 210upx);
        width: 420upx;
        height: 440upx;
    }
    .succeesText{
        font-size:42upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:62upx;
    }
    .envelopeBox image{
        width: 96upx;
        height: 96upx;
    }
    .envelopebg{
        position: absolute;
        z-index: 23;
        top: 155upx;
        width: 100%;
        height: 285upx;
        border-radius: 0upx 0upx 40upx 40upx;
        background: #0D6E56;
    }
    .envelopeContent{
        position: absolute;
        z-index: 25;
        top: 155upx;
        width: 100%;
        height: 285upx;
    }
    .envelopeContent image{
        width: 100%;
        height: 285upx;
    }
    .envelopeCap{
        position:absolute;
        height: 310upx;
        width: 420upx;
        z-index: 23;
    }
    .envelopeCap image{
        height: 155upx;
        width: 100%;
    }
    .itemContent{
        font-size:24upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:40upx;
        text-align: left;
        
    }
    .itemTop{
        display: flex;
        flex-direction: row;
    }
    .itemTop image{
        width: 47upx;
        height: 46upx;
    }
    .itemTopText{
        text-align: left;
        margin-left: 20upx;
        font-size:36upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:54upx;
        flex: 1;
    }
    .itemTopBtn{
        border-radius:20upx;
        border:2upx solid rgba(3,190,144,1);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110upx;
        height: 40upx;
        font-size:24upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(3,190,144,1);
        /* line-height:36upx; */
    }
    .itemTopBtn image{
        width: 26upx;
        height: 26upx;
    }
    .contentBox{
        position: relative;
        z-index: 22;
        margin-top: 30upx;
        height: 880upx;
    }
    .contentItem{
        position:absolute;
        z-index: 24;
        height: 140upx;
        margin-left: 100%;
        width: calc(100% - 140upx);
        padding: 40upx;
        border-radius: 40upx;
        background: #FFFFFF;
        margin-bottom: 20upx;
    }
    .sssssss{
        overflow:overflow;
    }
    .topContentText{
        font-size:30upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:45upx;
        margin-top: 20upx;
    }
    .topTitleText{
        font-size:42upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:62upx;
        margin-left: 20upx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .topTitleBox{
        margin-top: 64upx;
        display: flex;
        flex-direction: row;
    }
    .topTitleBox image{
        width: 100upx;
        height: 100upx;
    }
    .boxTop{
        position: relative;
        z-index: 22;
        text-align: left;
        padding: 0 30upx;
    }
    .content{
        width: 100%;
        height: 100%;
        background: url('https://coffer.bainuo.cn/mdt-pub/ing_hyy_bg.png') no-repeat ;
        background-size: 100% ; 
        text-align: center;
        position: relative;
    }
    .box{
        top: calc(50% - 50upx);
        left: calc(50% - 50upx);
        height: 100upx;
        width: 100upx;
        border-radius: 50upx;
        background: #148973;
        position: absolute;
        z-index: 11;
    }
    .navigation{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: 22;
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
    .discriminate-btn{
        margin-left: 100%;
        width: calc(100% - 320upx);
        /* margin-top: 83upx; */
        height: 90upx;
        line-height: 90upx;
        border-radius: 45upx;
        /* opacity: 0.4; */
        color: #C6CAD4;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:#FFFFFF;
    }
    .zIndex{
        z-index: 26;
    }
    .yellowBorder{
        border:2upx solid #F7CF41;
    }
    .grayBorder{
        border:2upx solid #C6CAD4;
        color: #C6CAD4;
    }
    .btnopacity{
        color: #148973;
    }
</style>
