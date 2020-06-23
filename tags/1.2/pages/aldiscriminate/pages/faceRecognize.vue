<template>
    <view class="content"  :style="{ height: windowHeight + 'px'}" >
        <view class="navigation" :style="{ height: statusBarHeight + 'px'}">
            <image @click="clickBack" class="backBtn" src="../../../static/image/icon_left.png" mode=""></image>
        </view>
        <image class="facePic" :src="url" mode="widthFix"></image>
        <!-- <image class="facePic" :style="{top: facePicTop + 'px'}" :src="url" mode="widthFix"></image> -->
        <view v-if="recognizeState!=0" style="text-align: center; color: #FFFFFF;position: absolute;width: 100%;" :style="{top: animationBoxWidth/2 - 40 + 'px'}">{{recognizeText}}</view>
        <view v-if="recognizeState!=0" class="animationBox" :style="{height: animationBoxWidth + 'px', top: animationBoxWidth/2 + 'px'}">
            <image :class="{animationabb : recognizeState == 1}" class="aaa" src="https://coffer.bainuo.cn/mdt-pub/img_circle_fx.png" mode=""></image>
            <image :class="{animationaaa : recognizeState == 1}" class="bbb" src="https://coffer.bainuo.cn/mdt-pub/img_circle_zx.png" mode=""></image>
            <image v-if="type==1" :class="{animationaaa : recognizeState == 1}" class="ccc" src="/pages/aldiscriminate/static/img_sxsm_wzsm.png" mode=""></image>
            <image v-if="type==0" :class="{animationaaa : recognizeState == 1}" class="ccc" src="/pages/aldiscriminate/static/img_rlsm_wzsmoo.png" mode=""></image>
            <image v-if="type==2" :class="{animationaaa : recognizeState == 1}" class="ccc" src="/pages/aldiscriminate/static/img_sxsm_wzsmfm.png" mode=""></image>
            <image class="ddd" src="https://coffer.bainuo.cn/mdt-pub/icon_shizi.gif" mode=""></image>
            
            <view v-if="ligulate!='' && ligulate!=null" class="ligulateClass resultBox">{{ligulate}}</view>
            <view v-if="tongueColor!='' && tongueColor!=null" class="tongueColorClass resultBox">{{tongueColor}}</view>
            <view v-if="mossName!='' && mossName!=null" class="mossNameClass resultBox">{{mossName}}</view>
            <view v-if="fissureStatus!='' && fissureStatus!=null" class="fissureClass resultBox">{{fissureStatus}}</view>
            <view v-if="mossColor!='' && mossColor!=null" class="mossColorClass resultBox">{{mossColor}}</view>
            <view v-if="bodyfluidName!='' && bodyfluidName!=null" class="bodyfluidNameClass resultBox">{{bodyfluidName}}</view>
            <view v-if="indentationStatus!='' && indentationStatus!=null" class="indentationStatusClass resultBox">{{indentationStatus}}</view>
            <view v-if="prick!='' && prick!=null" class="prickClass resultBox">{{prick}}</view>
        </view>
        <button v-if="recognizeState == 2"  @click="clickDiscriminate" :style="{top: animationBoxWidth/2 + animationBoxWidth + 20 + 'px'}" class="discriminate-btn" >{{nextTitle}}</button>
        <view v-if="recognizeState!=0" class="circleBox" :style="{top: animationBoxWidth/2 - 40 + 'px'}">
            <image :class="{animationabb : recognizeState == 1}" class="aaa" src="/pages/aldiscriminate/static/img_xqcircle_fx.png" mode=""></image>
            <image :class="{animationaaa : recognizeState == 1}" class="bbb" src="/pages/aldiscriminate/static/img_xqcircle_zx.png" mode=""></image>
        </view>
        <view v-if="recognizeState == 0" class="nextBtn" @click="clickNext" >
            <image src="/pages/aldiscriminate/static/img_sxps_qr.png" mode=""></image>
        </view>
        <view v-if="recognizeState == 0" class="previousBtn" @click="clickBack" >
            <image src="/pages/aldiscriminate/static/img_sxps_fh.png" mode=""></image>
        </view>
        
    </view>
</template>

<script>
    import api from '../../../common/api.js';
    
    var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44 
    var animationBoxWidth = uni.getSystemInfoSync().screenWidth - uni.upx2px(60)
    export default {
    	data() {
    		return {
    			statusBarHeight: statusBarHeight,
                windowHeight:0,
                animationBoxWidth:animationBoxWidth,
                uploadParams:null,
                facePicTop:0,
                url:null,
                recognizeText:'分析中...',
                recognizeState:0,
                facepic:'',
                nextTitle:'下一步',
                type:0,
                ligulate:"",
                tongueColor:"",
                mossName:"",
                fissureStatus:"",
                mossColor:"",
                bodyfluidName:"",
                indentationStatus:"",
                prick:"",
    		}
    	},
    	onLoad(op) {
            this.windowHeight = uni.getSystemInfoSync().windowHeight
            this.animationBoxWidth = animationBoxWidth
            const data = {
            	purpose: 'useravatar'
            }
            api.getUploadParams({
            	data: data
            }).then(res => {
            	console.log('getUploadParams')
            	console.log(res)
            	this.uploadParams = res.data
            })
            console.log(op.url)
            this.url = op.url
            this.type = op.type
            if(this.type==2){
                this.nextTitle = '完成'
            }
            var _self = this
            
            
    	},
    	methods: {
            clickNext:function(){
                if (this.uploadParams) {
                    this.recognizeState = 1
                	uni.showLoading({
                		title: '图片上传中'
                	})
                    var _self = this
                	uni.uploadFile({
                		url: this.uploadParams.url,
                		filePath: this.url,
                		name: 'userAvatar',
                		formData: {
                			policy: this.uploadParams.policy,
                			Signature: this.uploadParams.Signature
                		},
                        success(result) {
                			if (result.data) {
                                console.log(result.data);
                				let r = JSON.parse(result.data)
                				if (r.status === 'OK') {
                                    var pic = r.data.location + r.data.filepath
                                    _self.recognize(pic)
                                    
                        		} else {
                                    uni.showToast({
                                        title: r.message,
                                        icon: "none",
                                        duration: 2000
                                    })
                                }
                            }
                        },fail() {
                        		                
                        },complete(res) {
                        	uni.hideLoading()
                        	if (res.statusCode !== 200) {
                        		uni.showToast({
                        			title: res.errMsg,
                        			icon: "none",
                        			duration: 2000
                        		})
                        	}
                        }
                    })
                     // if(this.type == 0){
                     //     this.recognize('http://coffer.bainuo.cn//useravatar-pub/cf/cfdeaf874723f4ee066ba97f758c10c8.jpg')
                     // }
                     // if(this.type == 1){
                     //     this.recognize('http://coffer.bainuo.cn//useravatar-pub/35/35d0efbfe64c1df9db19a5f5715bcfd0.png')
                     // }
                     // if(this.type == 2){
                     //     this.recognize('https://coffer.bainuo.cn/doctorqualification-pub/23/2309e70f059510ec078ec51d36711a6f.jpg')
                     // }
                }else{
                    uni.showToast({
                        title: 'getUploadParams failed!',
                        icon: "none",
                        duration: 2000
                    })
                }
            },
            clickDiscriminate:function(){
                var alInfo = uni.getStorageSync('AlInfo');
                if(this.type == 0){
                    var tongueImages = {
                        "body":this.facepic
                    }
                    var info = {
                        "age": alInfo.age,
                        "gender": alInfo.gender,
                        "name": alInfo.name,
                        "phone": alInfo.phone,
                        "weight":alInfo.weight,
                        "height":alInfo.height,
                        "tongueImages":tongueImages
                    }
                    console.log(info)
                    uni.setStorageSync('AlInfo', info)
                    uni.navigateTo({
                        url:'tongueFront'
                    })
                }else if(this.type == 1){
                    var tongueImages = {
                        "body":alInfo.tongueImages.body,
                        "front":this.facepic
                    }
                    var info = {
                        "age": alInfo.age,
                        "gender": alInfo.gender,
                        "name": alInfo.name,
                        "phone": alInfo.phone,
                        "weight":alInfo.weight,
                        "height":alInfo.height,
                        "tongueImages":tongueImages
                    }
                    console.log(info)
                    uni.setStorageSync('AlInfo', info)
                    uni.navigateTo({
                        url:'tongueContrary'
                    })
                }else if(this.type == 2){
                    var tongueImages = {
                        "body":alInfo.tongueImages.body,
                        "front":alInfo.tongueImages.front,
                        "back":this.facepic,
                        "flag": false,
                    }
                    var info = {
                        "age": alInfo.age,
                        "gender": alInfo.gender,
                        "name": alInfo.name,
                        "phone": alInfo.phone,
                        "weight":alInfo.weight,
                        "height":alInfo.height,
                        "tongueImages":tongueImages
                    }
                    console.log(info)
                    uni.setStorageSync('AlInfo', info)
                    uni.navigateBack({
                        delta:6
                    })
                }
                
            },
            clickBack:function(){
                uni.navigateBack({
                    delta:1
                })
            },
            recognizeResult:function(key){
                setTimeout(function() {
                    
                    const getData = {
                    	key: key
                    }
                    if(this.type == 0){
                        api.getFaceImageResult({
                        	data: getData
                        }).then(faceRes => {
                            console.log(faceRes)
                            if(faceRes.status == 'OK'){
                                this.recognizeState = 2
                                this.recognizeText = '分析完成！'
                                // this.ligulate = "快快快"
                            }else if(faceRes.status == '30000'){
                                this.recognizeResult(key)
                            }else{
                                console.log("recognizeFailure")
                                uni.navigateTo({
                                    url:'recognizeFailure?msg=' + faceRes.message
                                })
                            }
                        })
                    }else{
                        api.getTongueBackImageResult({
                        	data: getData
                        }).then(backres => {
                            console.log(backres)
                            if(backres.status == 'OK'){
                                this.recognizeState = 2
                                this.recognizeText = '分析完成！'
                                // this.ligulate = "快快快"
                            }else if(backres.status == '30000'){
                                this.recognizeResult(key)
                            }else{
                                console.log("recognizeFailure")
                                uni.navigateTo({
                                    url:'recognizeFailure?msg=' + backres.message
                                })
                            }
                            
                        })
                    }
                    
                    
                    
                }.bind(this), 5000)
            },
            recognize:function(url){
                
                const data = {
                	url: url
                }
                if(this.type == 0){
                    api.analysisFaceImage({
                    	data: data
                    }).then(res => {
                    	console.log('analysisFaceImage')
                    	console.log(res)
                        if(res.status === 'OK'){
                            
                            this.facepic = url
                            
                            this.recognizeResult(res.data.key)
                            
                            
                        }else{
                            console.log("recognizeFailure")
                            uni.navigateTo({
                                url:'recognizeFailure'
                            })
                        }
                        
                    })
                }else if(this.type == 1){
                    api.cutTongueImage({
                        data:data
                    }).then(res =>{
                        console.log('analysisFaceImage')
                        console.log(res)
                        if(res.status === 'OK'){
                            this.recognizeState = 2
                            this.recognizeText = '分析完成！'
                            this.facepic = url
                            
                            this.ligulate = res.data.ligulate
                            this.tongueColor = res.data.tongueColor
                            
                            console.log(res.data.mossName)
                            var nnn = JSON.parse(res.data.mossName)
                            console.log(nnn)
                            if(nnn && nnn.length>0){
                                nnn.forEach((item,index)=>{
                                    if(index == 0){
                                        this.mossName = this.mossName + item
                                    }else{
                                        this.mossName = this.mossName + ',' +item
                                    }
                                })
                            }
                            // this.mossName = res.data.mossName
                            if(!res.data.fissureStatus){
                                this.fissureStatus = "无裂纹"
                            }else{
                                this.fissureStatus = "有裂纹"
                            }
                            this.fissure = res.data.fissure
                            this.mossColor = res.data.mossColor
                            this.bodyfluidName = res.data.bodyfluidName
                            if(!res.data.indentationStatus){
                                this.indentationStatus = "无齿痕"
                            }else{
                                this.indentationStatus = "有齿痕"
                            }
                            
                            if(!res.data.prickStatus){
                                this.prick = "无刺点"
                            }else{
                                this.prick = "有刺点"
                            }
                            
                            // const getData = {
                            // 	key: res.data
                            // }
                            // api.getTongueResult({
                            // 	data: getData
                            // }).then(res => {
                                
                            // })
                            
                        }else{
                            console.log("recognizeFailure")
                            uni.navigateTo({
                                url:'recognizeFailure'
                            })
                        }
                    })
                }else if(this.type == 2){
                    api.cutTongueBackImage({
                        data:data
                    }).then(res =>{
                        console.log('analysisFaceImage')
                        console.log(res)
                        if(res.status === 'OK'){
                            
                            this.facepic = url
                            this.recognizeResult(res.data.key)
                        }else{
                            console.log("recognizeFailure")
                            uni.navigateTo({
                                url:'recognizeFailure'
                            })
                        }
                    })
                }
                
            }
        }
    }
</script>

<style>
    page{
        background: #808080;
    }
    .content{
       display: flex;
       align-items: center;
    }
    .navigation{
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        top: 0upx;
    }
    .backBtn{
        position: absolute;
        width: 50upx;
        height: 50upx;
        bottom: 21upx;
        left: 12upx;
    }
    .discriminate-btn{
        position: absolute;
        margin-left: 230upx;
        width: calc(100% - 460upx);
        /* margin-top: 83upx; */
        height: 90upx;
        line-height: 90upx;
        border-radius: 45upx;
        /* opacity: 0.4; */
        color: #03BE90;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:#FFFFFF;
    }
    .previousBtn{
        position: absolute;
        left: 0upx;
        bottom: 0upx;
        width: 120upx;
        height: 120upx;
        border-radius: 0upx 105upx 0upx 0upx ;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .previousBtn image{
        margin-top: 20upx;
        margin-right: 20upx;
        width: 34upx;
        height: 34upx;
    }
    .nextBtn{
        position: absolute;
        right: 0upx;
        bottom: 0upx;
        width: 120upx;
        height: 120upx;
        border-radius: 105upx 0upx 0upx 0upx;
        background: #148973;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nextBtn image{
        margin-top: 20upx;
        margin-left: 20upx;
        width: 34upx;
        height: 34upx;
    }
    .resultBox{
        position: absolute;
        background:rgba(255,255,255,1);
        box-shadow:0upx 3upx 30upx 0upx rgba(51,58,69,0.5);
        border-radius:14upx;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:33upx;
        padding: 10upx;
    }
    .ligulateClass{
        top:100upx;
        left:calc(50% - 50upx)
    }
    .tongueColorClass{
        top:200upx;
        /* right: 50upx; */
        left: calc(100% - 172upx);
    }
    .mossNameClass{
        top:calc(50% - 40upx);
        left: calc(100% - 152upx );
        max-width:160upx;
    }
    .fissureClass{
        bottom:200upx;
        /* left: 50upx; */
        right: calc(100% - 172upx);
    }
    .mossColorClass{
        bottom:100upx;
        left:calc(50% - 50upx)
    }
    .bodyfluidNameClass{
        top:calc(50% - 20upx);
        right: calc(100% - 152upx );
    }
    .indentationStatusClass{
        bottom:200upx;
        /* right: 50upx; */
        left: calc(100% - 172upx);
    }
    .prickClass{
        top:200upx;
        /* left: 50upx; */
        right: calc(100% - 172upx);
    }
    
    .animationBox{
        position: absolute;
        left: 30upx;
        width: calc(100% - 60upx);
        /* background: #007AFF; */
    }
    .animationBox .aaa{
        position: absolute;
        left: 56upx;
        top:56upx;
        width: calc(100% - 112upx);
        height: calc(100% - 112upx);
    }
    .animationBox .bbb{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .animationBox .ccc{
        position: absolute;
        left: 170upx;
        top: 170upx;
        width: calc(100% - 340upx);
        height: calc(100% - 340upx);
    }
    .animationBox .ddd{
        position: absolute;
        left: 228upx;
        top: 228upx;
        width: calc(100% - 456upx);
        height: calc(100% - 456upx);
    }
    .circleBox{
        position: absolute;
        right: 40upx;
        width: 146upx;
        height: 146upx;
    }
    .circleBox .aaa{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .circleBox .bbb{
        position: absolute;
        left: 14upx;
        top: 14upx;
        width: calc(100% - 28upx);
        height: calc(100% - 28upx);
    }
    .facePic{
        /* position: absolute; */
        width: 100%;
        
    }
    .animationabb{
        animation:turnbb 5s linear infinite; 
    }
    .animationaaa{
        animation:turnaa 5s linear infinite; 
    }
    @keyframes turnbb{
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
    }
    @keyframes turnaa{
        0%{-webkit-transform:rotate(360deg);}
        25%{-webkit-transform:rotate(270deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(90deg);}
        100%{-webkit-transform:rotate(odeg);}
    }
    
    button::after{ border: none;} 
</style>
