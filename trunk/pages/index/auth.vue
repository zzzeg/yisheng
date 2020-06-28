<template>
	<!--我的明我-->
	<view class="cont" @click="clickHealth">
		<view class="mine_top" style="background:url('https://coffer.bainuo.cn/mdt-pub/mine_bg@2x.png') no-repeat top center; background-size: 100% 100%; background-position: 0 -4rpx;;">
			<view class="user-section">
				<view class="cu-avatar" style="line-height: 1.5;">
					<image src="../../static/image/fuhao@2x.png" mode="aspectFill"></image>
				</view>
				<view class="color_fff">
					点击登录
				</view>
			</view>
			<view class="items">
				<view class="item">
					<view class="text">--</view>
					<view class="text">报告数</view>
				</view>
				<view class="item">
					<view class="text">--</view>
					<view class="text">加入服务站数</view>
				</view>
				<view class="item">
					<view class="text">--</view>
					<view class="text">收藏数</view>
				</view>
			</view>
		</view>
		  
		<view class="waiper">
			<view class="title">
				数字健康档案<text style="font-size:28rpx;">（全周期生命账户）</text>
			</view>
			<view class="disinline items" @tap="clickReport('advisory_report','驻站医生报告',1)">
				<view class="iimg"><image src="../../static/image/icons@2x(5).png" style="width:50rpx; height:60rpx;"></image></view>
				<view>驻站医生报告</view>
			</view>
			<view class="disinline items" @tap="clickReport('TONGUE_QUES,QUES,TONGUE,face_check','智能医生报告',1)">
				<view class="iimg"><image src="../../static/image/icons@2x(3).png" style="width:60rpx; height:52rpx;"></image></view>
				<view>智能医生报告</view>
			</view>
			<view class="disinline items" @tap="clickHealth">
				<view class="iimg"><image src="../../static/image/icons@2x(4).png" style="width:46rpx; height:54rpx;"></image></view>
				<view>健康风险报告</view>
			</view>
		</view>
		
		<view class="waiper">

			<view class="disinline items" @tap="navigateTo('/pages/service-record/service-record')">
				<view class="iimg"><image src="../../static/image/icons@2x(1).png" style="width:60rpx; height:56rpx;"></image></view>
				<view>服务记录</view>
			</view>
			<view class="disinline items" @tap="navigateTo('/pages/serverStation/stationList')">
				<view class="iimg"><image src="../../static/image/icons@2x(2).png" style="width:60rpx; height:54rpx;"></image></view>
				<view>已加入服务站</view>
			</view>
			<view class="disinline items" @tap="navigateTo('/pages/mine/collectList')">
				<view class="iimg"><image src="../../static/image/icons@2x(6).png" style="width:60rpx; height:56rpx;"></image></view>
				<view>收藏</view>
			</view>
		</view>
        <view v-if="login != 0" class="cpt-mask"></view>
        <view v-if="login != 0" class="calendarBox">
            <image class="logoImage" src="../../static/image/logo_mw.png" mode=""></image>
            <image v-if="login == 1" style="width: 313upx; height: 313upx; margin-top: 17upx;" src="../../static/image/img_sy_dl.png" mode=""></image>
            <image v-if="login == 2" style="width: 121upx; height: 250upx; margin-top: 85upx; margin-bottom: 48upx;" src="../../static/image/mp@2x.png" mode=""></image>
            <view style="color: #2A3441;font-weight:500;">{{login == 2 ? '请绑定您的手机号码' : '您还未登录'}}</view>
            <view v-if="login == 1" class="">请先登录再进行操作</view>
            <view style="display: flex;flex-direction: row; margin-top: 48upx; font-size: 31upx;">
                <view v-if="login == 1" @click.stop="clickMask" class="calendarBtn" style="margin-right: 21upx; border:2upx solid rgba(1,172,130,1); color: #01AC82;">暂不登录</view>
                <button v-if="login == 1" open-type="getUserInfo" @getuserinfo="getUserList" class="calendarBtn" style="color: #FFFFFF;background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);">立即登录</button>
                <button v-if="login == 2" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="calendarBtn" style="color: #FFFFFF;background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);">立即绑定</button>
            </view>
            <button v-if="testCode !='' " style="margin-top: 20upx; margin-bottom: 40upx; background-color: #FFFFFF;color:rgba(3,190,144,1);font-size:32upx;font-family:PingFangSC-Regular;font-weight:400;"
                            @click="onPhoneLogin"> 账号密码登录 </button>
        </view>
	</view>
</template>

<script>
	import api from '../../common/api.js';
    import util from '../../common/util.js'
	export default{
		data() {
			return {
				formData: {},
				login:0,
				testCode:'',
                avatarPath:""
			}
		},
		onLoad(option) {
			this.getTestCode()
            if(option.type){
                this.login = option.type
            }
            
            var _self = this
            uni.checkSession({
                success() {
                    // session_key 未过期，并且在本生命周期一直有效
                    console.log("未过期");
                    _self.wxlogin('')
                },
                fail() {
                    console.log("过期");
                    _self.wxlogin('')
                }
            })
            
		},
		methods: {
            clickMask:function(){
                this.login = 0
            },
            wxlogin:function(e){
                var _self = this
                uni.login({
                    provider: 'weixin',
                    success: function(loginRes) {
                        console.log(loginRes)
                        const obj = {
                            code: loginRes.code
                        }
                        api.getUnionid({
                            data: obj
                        }).then(res => {
                            console.log(res)
                            console.log('sk:' + res.data.session_key)
                            uni.setStorageSync('sk', res.data.session_key);
                            uni.setStorageSync('openid', res.data.openid);
                            uni.setStorageSync('unionid', res.data.unionid);
                            if(e != ''){
                                _self.bingPhone(e)
                            }
                            
                        })
                    }
                });
            },
            bingPhone:function(e){
                var sk = uni.getStorageSync('sk');
                if(sk){
                    api.getPhone({
                        data:{
                            sessionKey:sk,
                            iv:e.detail.iv,
                            encryptedData:e.detail.encryptedData
                        }
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            var timestamp = Date.parse(new Date());
                            var date = util.formatTimestamp(timestamp,'yyMMdd')
                            date = date.split("").reverse().join("")
                            console.log(date)
                            var week = new Date().getDay(); 
                            console.log(week)
                            
                            var unionid = uni.getStorageSync('unionid');
                            var obj = {
                                'verifycode': date - week,
                                'phone': res.data.phoneNumber,
                                'unionid':unionid
                            }
                            api.createUser({
                                data: obj,
                                showHud:true
                            }).then(userRes => {
                                console.log('userRes:')
                                console.log(userRes)
                                if (userRes.status == "OK") {
                                    uni.showToast({
                                        title: '绑定成功',
                                        icon: "success",
                                        duration: 2000
                                    })
                                }else{
                                    this.tips = userRes.message
                                    return
                                }
                                const sessionKey = uni.getStorageSync('sessionId');
                                if(!sessionKey){
                                    api.getTempAccount({
                                        data: {
                                            code: unionid
                                        }
                                    }).then(aes => {
                                        console.log("getTempAccount:",aes)
                                        if (aes.status == 'OK') {
											console.log('xxxxxxxxxxxxxxxxxxxxxxxxx')
                                            uni.setStorageSync('sessionId', aes.data.sessionId)
                                            this.getUserById(userRes.data.id,this.avatarPath)
                                        }
                                    })
                                }else{
                                    this.getUserById(userRes.data.id,this.avatarPath)
                                }
                                
                            })
                        }else{
                            uni.showToast({
                                title:res.message
                            })
                        }
                        
                        
                    })
                }else{
                    this.wxlogin(e)
                }
            },
            getUserById:function(id,avatarPath){
                const userObj = {
                    userId: id,
                }
                api.findUserById({
                    data:userObj
                }).then(res => {
                    console.log(res)
                    if(res.status == 'OK'){
                        if(avatarPath){
                            var userInfo = res.data;
                            userInfo.avatarPath = avatarPath;
                            uni.setStorageSync('userinfo', userInfo);
                        }
                        
                        if(getApp().globalData.pageUrl && getApp().globalData.pageUrl.search('index/index') == -1){
                            //是否有指定路径
                            console.log(getApp().globalData.pageUrl)
                            var qu = ''
                            var index = 0
                            for(var key in getApp().globalData.param){
                            	console.log(key+":"+getApp().globalData.param[key]);//json对象中属性的名字：对象中属性的值
                                if(index==0){
                                    qu = qu + '?' +key + '=' + getApp().globalData.param[key]
                                }else{
                                    qu = qu +'&' + key + '=' + getApp().globalData.param[key]
                                }
                                
                                index++
                            }
                            if(getApp().getCurrentRoute() != getApp().globalData.pageUrl){
                                uni.navigateTo({
                                    url:'/'+getApp().globalData.pageUrl + qu + "&backHome=1"
                                });
                            }
                        }else{
                            if( res.data && res.data.followCommunityId && res.data.followCommunityId.length > 3 ){
                                this.emchatLogin(id)
                                
                                uni.reLaunch({
                                    url:'index?communityid='+res.data.followCommunityId
                                })
                                
                            }else{      //跳转加入服务站
                                this.login = 0
                                uni.navigateTo({
                                	url: '/pages/serverStation/main'
                                })
                            }
                        }
                        
                    }
                })
            },
            getphonenumber:function(e){
                console.log("phone:",e)
                
                this.bingPhone(e)
                
            },
            clickReport:function(type,title,bought){
				// this.login = true;
            },
            clickHealth:function(){
                if(this.login == 0){
                    this.login = 1;
                }
            },
			userstatisticsInfo() {
				// this.login = true;
			},
			navigateTo(url) {
				// this.login = true;
			},
            getAccount: function(res) {
                const sessionKey = uni.getStorageSync('sk');
                // if(!sessionKey){
                //     this.wxlogin('')
                //     return
                // }
                var communityId = ''
                
                if(getApp().globalData.param['communityId']){
                    
                    communityId = getApp().globalData.param['communityId']
                }else if(getApp().globalData.scene){
                    communityId = getApp().globalData.scene
                }
                console.log("communityId:",communityId)
                const data = {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    sessionKey: sessionKey,
            		communityId:communityId
                }
                var _self = this
                api.getAccountInfo({
                    data: data
                }).then(accountRes => {
                    console.log("accountRes:")
                    console.log(accountRes)
                    if (!accountRes.data.bnUserInfo) {
                        uni.removeStorageSync('sk');
                        return;
                    }
                    if(accountRes.data.wxUserInfo && accountRes.data.wxUserInfo.unionId ){
                        uni.setStorageSync('unionid', accountRes.data.wxUserInfo.unionId);
                    }
                    if(accountRes.data.bnUserInfo && accountRes.data.bnUserInfo.sessionId ){
                        const sessionId = accountRes.data.bnUserInfo.sessionId
                        uni.setStorageSync('sessionId', sessionId)
                    }
                    // this.login = 2
                    if (accountRes.data.bnUserInfo.phone == "" || accountRes.data.bnUserInfo.phone == null) { //未绑定
                        this.login = 2
                    }else{
                        this.avatarPath = accountRes.data.bnUserInfo.avatarPath
                        this.getUserById(accountRes.data.bnUserInfo.id,accountRes.data.bnUserInfo.avatarPath);
                        // this.findUser(accountRes.data.bnUserInfo.id,accountRes.data.bnUserInfo.avatarPath);
                    }
                })
            },
			getTestCode: function() {
                api.getTestCode().then(res => {
                    console.log(res)
                    if (res.data == '' || res.data == null) {
                        this.testCode = ''
                    } else {
                        this.testCode = res.data
                        getApp().globalData.testCode = res.data
                    }
                })
            },
            onPhoneLogin: function(){
                uni.reLaunch({
                    url: '../index/login?from=phone&testCode=' + this.testCode
                });
            },
            emchatLogin:function(userid){
                
                var pwd = userid.substring(1,userid.length-1)
                this.$conn.open({
                	apiUrl: this.$im.config.apiURL,
                	user: userid,
                	pwd: pwd,
                	grant_type: "password",
                	appKey: this.$im.config.appkey
                });
            },
            getUserList: function(res) {
                console.log(res)
                
                if (res.detail.errMsg == "getUserInfo:ok") {
                    //授权
                    console.log(this.$conn) 
                    if (res.iv) {
                        this.getAccount(res)
                       
                        // this.getAccount(res)
                    } else {
                        this.getAccount(res.target)
                        // this.getAccount(res.target)
                    }
                
                } else {
                    //拒绝授权
                    uni.showModal({
                        title: '提示',
                        content: '允许授权后放可使用',
                        success: function(res) {
                            if (res.confirm) {
                                uni.openSetting({
                                    success(openRes) {
                                        console.log(res.authSetting)
                                    }
                                });
                            } else if (res.cancel) {
                
                            }
                        }
                    });
                
                }
            }
		}
	}
</script>

<style scoped lang="scss">
	.cont{ height:100vh; background:#EFF1F6; overflow: auto; }
	.mine_top{ min-height:266rpx; }
	.user-section {	padding: 40rpx 0 0 0;font-size:24rpx;text-align: center;}
	.cu-avatar {
		image {
			width: 74rpx;
			height: 74rpx;
			border-radius: 74rpx;
		}
	}
   
    .calendarBox{
        background: #FFFFFF;
        opacity: 1;
        position:fixed;
        top: 25%;
        left: calc((100% - 563upx)/2);
        width:563upx;
        height:750upx;
        z-index: 100;  
        border-radius: 30upx;
        color: #6D7480;
        font-size: 30upx;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .calendarBox .logoImage{
        width: 219upx;
        height: 56upx;
        margin-top: 52upx;
    }
	.color_fff {color: #FFFFFF;}
	.items{
		.item{
			display:inline-block; text-align:center;  vertical-align: middle;
			width:33%; position: relative;
			&:before{ content: ''; height:30rpx; width:1px; background:#fff; position: absolute; right:1px; top:calc(50% - 16rpx); }
			&:last-child:before{ background: none; }
			.text{ font-size:28rpx; line-height:40rpx; color:#fff;}
			.text+.text{ font-size:22rpx; }
		}
	}
	.waiper{ background:rgba(255,255,255,1);box-shadow:0px 4rpx 20rpx 0px rgba(85,112,105,0.1);border-radius:20rpx;
		margin:64rpx 32rpx 0 32rpx;
		.title{ font-size:32rpx; line-height:44rpx; padding:30rpx 28rpx 14rpx 28rpx; 
			border-bottom:solid 1px #EFF1F6; font-weight: 400;
		 }
		.items{ display:inline-block; width:33.333%; vertical-align: top; text-align: center; padding:50rpx 0 50rpx 0;
		font-size:24rpx; line-height:60rpx;
			.iimg{display: flex; align-items: center; height:60rpx; justify-content:center; }
		}
	}
    .content {
    	display: flex;
    	flex-direction: column;
    }
    .logo{
        margin-top: 250upx;
        width: 220upx;
        height: 56upx;
    }
    .sydl{
        margin-top: 30upx;
        width: 500upx;
        height: 500upx;
    }
    .calendarBtn{
        width: 208upx;
        height: 75upx;
        border-radius: 38upx;
        line-height: 75upx;
        text-align: center;
        font-size: 31upx;
        font-weight: 400upx;
    }
    .login-btn {
        margin-left: 125upx;
        margin-right: 125upx;
        margin-top: 83upx;
        height: 104upx;
        line-height: 104upx;
        border-radius: 52upx;
        width: calc(100% - 250upx);
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
</style>
