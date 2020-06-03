<template>
    <view :style="{ height: windowHeight + 'px'}" class="content">
        <view class="sssssss" @touchmove.stop.prevent="moveHandle" :style="{ height: screenHeight +'px' }">
            <view class="bgbox" :class="{zIndex : !activate}" :animation="animationData" :style="{background: boxbg}"></view>
            <view class="bgbox" :class="{zIndex : activate}" :animation="animationBgData" :style="{background: boxbg2}"></view>
            <view class="navigation" :style="{ height: statusBarHeight + 'px'}">
                <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
                <view class="titleNav">
                    智能辨证
                </view>
            </view>
            <view class="num">
                {{numStr}}
            </view>
            <view :style="{ height: cardHeight + 'px', top:contentTop +'px'}"  class="contentBox " :class="[isShow == 1 ? 'animationNext' : isShow == 0 ? 'animation' : isShow == 2 ? 'animationPre' : 'animationPrevious']" >
                <view  class="cardBox">
                    <view v-if="isFirst" class="hintBox">
                        <image src="../../../static/image/icon_jkxx_ts.png" mode=""></image>
                        <view class="hintText">
                            为更好的评估您的体质，我们需要了解您最近两周的身体状况，请认真填写以下信息。
                        </view>
                    </view>
                    <scroll-view>
                        <view class="question">
                            {{questionNow.question}}
                        </view>
                        <view class="answer">
                            <view v-if="questionNow.answer" v-for="(item,index) in questionNow.answer" :key = 'index' class="answerItem" @click="clickAnswer('now',index,item.value)" :class="{selectAnswer: questionNow.value.indexOf(item.value)>-1 }" >
                                {{item.label}}
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <view v-if="!isFirst" :style="{ height: cardHeight + 'px'}"  class="contentBox" :class="[isShow == 0 ? 'animationNext' : isShow == 1 ? 'animation' : isShow == 2 ? 'animationPrevious' : 'animationPre']" >
                <view  class="cardBox">
                    <scroll-view>
                        <view class="question">
                            {{questionNext.question}}
                        </view>
                        <view class="answer">
                            <view v-if="questionNow.answer" v-for="(item,index) in questionNext.answer" :key = 'index' class="answerItem" @click="clickAnswer('next',index,item.value)" :class="{selectAnswer: questionNext.value.indexOf(item.value)>-1 }" >
                                {{item.label}}
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <view @click="clickNext" class="nextBtn">{{nextText}}</view>
            <image @click="clickPrevious" class="previousBtn" src="../../../static/image/icon_jjxx_syg.png"></image>
        </view>
    </view>
</template>
<script>
    var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44 
    
    import questionLadyData from '../../../common/questionnaireLady.js';
    import questionData from '../../../common/questionnaire.js';
    
    import questionData2 from '../../../common/questionnaire2.js';
    
    export default {
        
    	data() {
    		return {
                cardHeight:0,
                windowHeight:0,
                isShow:0,
                isFirst:true,
                questionnaireData:[],
                numStr:'',
                questionNow:null,
                questionNext:null,
                questionIndex:0,
                statusBarHeight:statusBarHeight,
                contentTop:0,
                boxbg:'#148973',
                boxbg2:'',
                activate:false,
                boxbgAry:[
                    '#148973',
                    '#0495BB',
                    '#4F5BA6',
                    '#D5447F',
                    '#E9BF00',
                    '#357FBD',
                ],
                animationData: {},
                animationBgData: {},
                nextText:'下一步',
                
                type:0
    		}
    	},
        onShow() {
            
        },
    	onLoad(options) {
            this.type = options.type
            console.log(this.type)
            console.log(questionData2)
            console.log(questionData)
            this.cardHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(88) - statusBarHeight
            // console.log(uni.getSystemInfoSync().windowHeight )
            this.windowHeight = uni.getSystemInfoSync().windowHeight
            
            this.contentTop = statusBarHeight + uni.upx2px(88)
            const alInfo = uni.getStorageSync('AlInfo');
            if(alInfo.question && alInfo.question.length > 0){
                this.questionnaireData = JSON.parse(alInfo.question)
            }else if(this.type == 2){
                if(alInfo.gender == 'MAN'){
                    this.questionnaireData = this.deepClone(questionData)
                }else{
                    this.questionnaireData = this.deepClone(questionLadyData)
                }
            }else{
                this.questionnaireData = this.deepClone(questionData2)
            } 
            console.log(this.questionnaireData)
            
            this.numStr = '1/'+this.questionnaireData.length
            this.questionNow = this.questionnaireData[this.questionIndex]
            
            this.questionNext = this.questionnaireData[this.questionIndex+1]
    	},
        onUnload() {
            
        },
        methods: {
            deepClone:function(data){
            　　if(!data || !(data instanceof Object) || (typeof data=="function"))
            　　{
            　　　　return data||null;
            　　}
            　　var constructor = data.constructor;
            　　var result = new constructor();
            　　for(var key in data){
            　　　　if(data.hasOwnProperty(key)){
            　　　　　　result[key]=this.deepClone(data[key]);
            　　　　}
            　　}
            　　return result;
            },
            moveHandle:function(){
                
            },
            clickBack:function(){
                uni.navigateBack({
                    delta:1
                })
            },
            clickAnswer:function(str,index,value){
                console.log(str,index,this.questionIndex)
                if(value == null){
                    this.questionnaireData[this.questionIndex].value = [null]
                }else{
                    var index = this.questionnaireData[this.questionIndex].value.indexOf(null); 
                    if (index > -1) {   //存在
                        this.questionnaireData[this.questionIndex].value.splice(index, 1); 
                    } 
                    var i = this.questionnaireData[this.questionIndex].value.indexOf(value)
                    if(i <= -1){      //未选择答案
                        this.questionnaireData[this.questionIndex].value.push(value)
                    }else{
                        this.questionnaireData[this.questionIndex].value.splice(i, 1); 
                    }
                }
                // console.log(this.questionnaireData)
            },
            clickNext:function(){
                // console.log(this.questionIndex)
                
                if(this.questionnaireData[this.questionIndex].value.length<1){
                    uni.showToast({
                        title: '请选择答案',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                var alInfo = uni.getStorageSync('AlInfo');
                
                alInfo.question = JSON.stringify(this.questionnaireData);
                
                uni.setStorageSync('AlInfo', alInfo)
                if(this.questionnaireData.length == (this.questionIndex+1)){
                    uni.setStorageSync('HealthInfo', "1")
                    
                    if(this.type == 2){
                        uni.navigateTo({
                            url:'questionnaireResult'
                        })
                    }else{
                        uni.navigateBack({
                            delta:1
                        })
                    }
                    return
                }
                this.isFirst = false
                if(this.isShow == 0){
                    this.isShow = 1
                }else{
                    this.isShow = 0
                }
                
                this.questionIndex = this.questionIndex + 1
                if(this.questionIndex>=1){
                    this.numStr = (this.questionIndex + 1) + '/'+this.questionnaireData.length
                    this.questionNow = this.questionnaireData[this.questionIndex-1]
                    
                    this.questionNext = this.questionnaireData[this.questionIndex]
                }
                
                this.overturnAnimation()
                if((this.questionIndex + 1)==this.questionnaireData.length){
                    if(this.type == 2){
                        this.nextText = '提交'
                    }else{
                        this.nextText = '完成'
                    }
                    
                }
            },
            clickPrevious:function(){
                if(this.questionIndex==0){
                    
                    uni.navigateBack({
                        delta:1
                    })
                    return
                }
                if(this.isShow == 0 || this.isShow == 1 || this.isShow == 3){
                    this.isShow = 2
                }else if(this.isShow == 2){
                    this.isShow = 3
                }
                console.log(this.questionIndex)
                this.questionIndex = this.questionIndex - 1
                if(this.questionIndex>=1){
                    this.numStr = (this.questionIndex + 1) + '/'+this.questionnaireData.length
                    this.questionNow = this.questionnaireData[this.questionIndex-1]
                    
                    this.questionNext = this.questionnaireData[this.questionIndex]
                }else{
                    this.numStr = '1/'+this.questionnaireData.length
                    this.questionNow = this.questionnaireData[this.questionIndex]
                    
                    this.questionNext = this.questionnaireData[this.questionIndex]
                }
                if((this.questionIndex + 1)==this.questionnaireData.length){
                    if(this.type == 2){
                        this.nextText = '提交'
                    }else{
                        this.nextText = '完成'
                    }
                }else{
                    this.nextText = '下一步'
                }
                this.overturnAnimation()
            },
            overturnAnimation:function(){
                this.activate = !this.activate
                var animation = uni.createAnimation({
                    duration: 1000,
                    timingFunction: 'ease',
                })
                var animationBg = uni.createAnimation({
                    duration: 1000,
                    timingFunction: 'ease',
                })
                if(!this.activate){
                    this.boxbg = this.boxbgAry[this.questionIndex%this.boxbgAry.length]
                    
                    animation.scale(400, 400).step()
                    this.animationData = animation.export()
                    setTimeout(function() {
                        animationBg.scale(0, 0).step()
                        this.animationBgData = animationBg.export()
                    }.bind(this), 1000)
                }else{
                    this.boxbg2 = this.boxbgAry[this.questionIndex%this.boxbgAry.length]
                    animationBg.scale(400, 400).step()
                    this.animationBgData = animationBg.export()
                    
                    setTimeout(function() {
                        animation.scale(0, 0).step()
                        this.animationData = animation.export()
                    }.bind(this), 1000)
                }
            }
        }
    }
</script>

<style>
    page{
        background: #148973;
    }
    .sssssss{
        overflow:overflow;
    }
    .bgbox{
        top: calc(50% - 2upx);
        left: calc(50% - 2upx);
        height: 10upx;
        width: 10upx;
        border-radius: 5upx;
        background: #148973;
        position: absolute;
        z-index: 10;
    }
    .zIndex{
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
    .content{
        text-align: center;
        position: relative;
        height: 100%;
    }
    .num{
        position: relative;
        z-index: 22;
        margin-top: 20upx;
        margin-bottom: 20upx;
        font-size:46upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:68upx;
    }
    .contentBox{
        width: 100%;
        position: absolute;
        z-index: 22;
        /* top: 88upx; */
        /* -webkit-transform:rotate(90deg);
        -webkit-transform-origin: right bottom; */
    }
    .animation{
        animation:turn 0.5s linear 1;
    }
    .animationNext{
        animation:turnNext 0.5s linear 1;
    }
    .animationPre{
        animation:turnPre 0.5s linear 1;
    }
    .animationPrevious{
        animation:turnPrevious 0.5s linear 1;
    }
    @keyframes turn{
      0%{-webkit-transform:rotate(90deg);-webkit-transform-origin: right bottom;}
      25%{-webkit-transform:rotate(67.5deg);-webkit-transform-origin: right bottom;}
      50%{-webkit-transform:rotate(45deg);-webkit-transform-origin: right bottom;}
      75%{-webkit-transform:rotate(22.5deg);-webkit-transform-origin: right bottom;}
      100%{-webkit-transform:rotate(0deg);-webkit-transform-origin: right bottom;}
    }
    @keyframes turnNext{
      0%{-webkit-transform:rotate(0deg);-webkit-transform-origin: right bottom;}
      25%{-webkit-transform:rotate(-22.5deg);-webkit-transform-origin: right bottom;}
      50%{-webkit-transform:rotate(-45deg);-webkit-transform-origin: right bottom;}
      75%{-webkit-transform:rotate(-67.5deg);-webkit-transform-origin: right bottom;}
      100%{-webkit-transform:rotate(-90deg);-webkit-transform-origin: right bottom;}
    }
    @keyframes turnPre{
      0%{-webkit-transform:rotate(0deg);-webkit-transform-origin: right bottom;}
      25%{-webkit-transform:rotate(22.5deg);-webkit-transform-origin: right bottom;}
      50%{-webkit-transform:rotate(45deg);-webkit-transform-origin: right bottom;}
      75%{-webkit-transform:rotate(67.5deg);-webkit-transform-origin: right bottom;}
      100%{-webkit-transform:rotate(90deg);-webkit-transform-origin: right bottom;}
    }
    @keyframes turnPrevious{
      0%{-webkit-transform:rotate(-90deg);-webkit-transform-origin: right bottom;}
      25%{-webkit-transform:rotate(-67.5deg);-webkit-transform-origin: right bottom;}
      50%{-webkit-transform:rotate(-45deg);-webkit-transform-origin: right bottom;}
      75%{-webkit-transform:rotate(-22.5deg);-webkit-transform-origin: right bottom;}
      100%{-webkit-transform:rotate(0deg);-webkit-transform-origin: right bottom;}
    }
    .cardBox{
        margin-left: 65upx;
        height: calc(100% - 330upx);
        width: calc(100% - 230upx);
        border-radius: 40upx;
        background: #FFFFFF;
        padding: 50upx;
    }
    .nextBtn{
        position: absolute;
        z-index: 22;
        bottom: 70upx;
        right: 65upx;
        width:260upx;
        height:90upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 5upx 20upx 0px rgba(0,0,0,0.1);
        border-radius:46upx;
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(3,190,144,1);
        line-height:90upx;
    }
    .previousBtn{
        position: absolute;
        z-index: 22;
        width: 88upx;
        height: 88upx;
        left: 0upx;
        bottom: 0upx;
        background-size: 100% 100%;
    }
    .hintBox{
        display: flex;
        flex-direction: row;
        margin-bottom: 30upx;
    }
    .hintBox image{
        width: 29upx;
        height: 29upx;
        margin-top: 8upx;
    }
    .hintText{
        font-size:24upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(134,142,157,1);
        line-height:42upx;
        flex: 1;
    }
    .question{
        text-align: left;
        font-size:46upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:68upx;
    }
    .answer{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .answerItem{
        margin-top: 40upx;
        margin-right: 30upx;
        padding: 25upx 40upx;
        background: #F6F7FA;
        border-radius: 44upx;
        /* height: 38upx; */
        font-size:26upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:38upx;
        
    }
    .selectAnswer{
        background: #03BE90;
        color:rgba(255,255,255,1);
    }
    button::after{ border: none;} 
</style>
