<script>
    
    let msgStorage = require("comps/chat/msgstorage");
    let msgType = require("comps/chat/msgtype");
    let disp = require("utils/broadcast");
    
    const emedia = wx.emedia = require("./common/emedia/emedia_for_miniProgram") 
    
    let WxIM = require("utils/WebIM")["default"];
    
    import api from 'common/api.js';
    
	export default {
        globalData: {  
            pageUrl: null  ,
			scene: '',
            showIndex:false
        },
		onLaunch: function(options) {
			console.log('App Launch')
            
            
            this.globalData.scene = decodeURIComponent(options.scene)
            
            this.$im.conn.listen({
            	onOpened: (message)=>{
            		// this.$im.conn.setPresence();
            		console.log('登录成功登录成功');
            		
            	},
            	onReconnect: ()=>{
            		// this.$helper.toast('loading', '重连中...', 2000)
            	},
            	onSocketConnected: ()=>{
            		// this.$helper.toast('success', '登陆成功', 2000)
            	},
            	onClosed: ()=>{
            		
                    var userinfo = uni.getStorageSync('userinfo')
                    this.emchatLogin(userinfo.userId);
            		
            	},
                
            	onInviteMessage: (message)=>{
            		this.$options.globalData.saveGroupInvitedList.push(message);
            		disp.fire("em.xmpp.invite.joingroup", message);
            
            	},
            	onPresence: (message)=>{
            		
            	},
            
            	onRoster: (message)=>{
            		// let pages = getCurrentPages();
            		// if(pages[0]){
            		// 	pages[0].onShow();
            		// }
            	},
            
            	onVideoMessage: (message)=>{
            		console.log("onVideoMessage: ", message);
            		if(message){
            			msgStorage.saveReceiveMsg(message, msgType.VIDEO);
            		}
          
            	},
            
            	onAudioMessage: (message)=>{
            		console.log("onAudioMessage", message);
            		if(message){
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.AUDIO);
            			}
            		
            		}
            	},
            	
            	onCmdMessage: (message)=>{
            		console.log("onCmdMessage", message);
            		if(message){
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.CMD);
            			}
          
            		}
            	},
            
            	onTextMessage: (message)=>{
            		console.log("onTextMessage", message);
            		if(message){
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.TEXT);
            			}
            	
            		}
            	},
            
            	onEmojiMessage: (message)=>{
            		console.log("onEmojiMessage", message);
            		if(message){
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.EMOJI);
            			}
            	
            		}
            	},
            	onPictureMessage: (message)=>{
            		console.log("onPictureMessage", message);
            		if(message){
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.IMAGE);
            			}
            		
            		}
            	},
            	onFileMessage: (message)=>{
            		console.log('onFileMessage', message);
            		if (message) {
            			if(this.onMessageError(message)){
            				msgStorage.saveReceiveMsg(message, msgType.FILE);
            			}
            		}
            	},
            	// 各种异常
            	onError: (error)=>{
            		console.log(error)
            		// 16: server-side close the websocket connection
            		if(error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED ){
            			if(this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax){
            				return;
            			}
            			uni.showToast({
            				title: "server-side close the websocket connection",
            				duration: 1000
            			});
            		
            			return;
            		}
            		// 8: offline by multi login
            		if(error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR){
            			
            			var userinfo = uni.getStorageSync('userinfo')
            			// this.emchatLogin(userinfo.userId);
            		}
            		if(error.type ==  this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR){
            
            			
            		}
            		if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
            			disp.fire("em.xmpp.error.tokenErr");
            		}
            		if (error.type == 'socket_error') {///sendMsgError
            			console.log('socket_errorsocket_error', error)
            			uni.showToast({
            				title: "网络已断开",
            				icon: 'none',
            				duration: 2000
            			});
            		}
            	},
            });
            
            //以下界面不拦截
            const uncheckedPath = ['pages/housekeeper-sharing-img/housekeeper-sharing-img', 'pages/housekeeper-sharing-video/housekeeper-sharing-video', 'pages/liveborad/share']
            var action = true
            if(options.path){
				let checkPath = !uncheckedPath.find(path => options.path.indexOf(path) > -1) 
                if(options.path && (options.path.search('index/auth') != -1 || !checkPath)){
                    action = false
                    this.globalData.showIndex = true
                }
            }
            
            console.log('options.path:',options.path)
            if(action){
                
                this.globalData.pageUrl = options.path
                var _self = this
                uni.checkSession({
                    success() {
                        // session_key 未过期，并且在本生命周期一直有效
                        console.log("未过期");
                        _self.wxlogin()
                            
                    },
                    fail() {
                        console.log("过期");
                        _self.wxlogin()
                    }
                })
            }
		},
		onShow: function(options) {
			console.log('App Show')
            
		},
		onHide: function() {
			console.log('App Hide')
		},
        methods: {
            wxlogin:function(){
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
                            _self.checkAuth()
                        })
                    }
                });
            },
            checkAuth: function() {
                var _self = this
                uni.getUserInfo({
                    success(res) { //已经授权请求是否绑定信息
                        console.log("getUserInfo:",res)
                        _self.getAccount(res)
                    },
                    fail(res) { //没有授权直接跳转登录
                        console.log("没有授权")
                        _self.globalData.pageUrl = '../index/index'
                        uni.reLaunch({
                            url:"/pages/index/auth"
                        })
                    }
                })
            },
            getAccount: function(res) {
                const sessionKey = uni.getStorageSync('sk');
                // console.log("res.iv:")
                // console.log(res.iv)
                const data = {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    sessionKey: sessionKey,
					communityId:this.globalData.scene?this.globalData.scene:''
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
                    if(accountRes.data.wxUserInfo && accountRes.data.wxUserInfo.unionid ){
                        uni.setStorageSync('unionid', accountRes.data.wxUserInfo.unionid);
                    }
                    if(accountRes.data.bnUserInfo && accountRes.data.bnUserInfo.sessionId ){
                        const sessionId = accountRes.data.bnUserInfo.sessionId
                        uni.setStorageSync('sessionId', sessionId)
                    }
                    if (accountRes.data.bnUserInfo.phone == "" || accountRes.data.bnUserInfo.phone == null) { //未绑定
                        uni.reLaunch({
                            url:'/pages/index/auth?type=2'
                        })
                    }else{
                        // uni.reLaunch({
                        //     url:'/pages/index/auth?type=2'
                        // })
                        this.findUser(accountRes.data.bnUserInfo.id,accountRes.data.bnUserInfo.avatarPath);
                    }
                })
            },
            findUser:function(id,avatarPath){
                const userObj = {userId: id};
                api.findUserById({
                    data:userObj
                }).then(userRes => {
                    if(userRes.status == 'OK'){
                        var userInfo = userRes.data;
                        userInfo.avatarPath = avatarPath;
                        uni.setStorageSync('userinfo', userInfo);
                        this.emchatLogin(id);
                        this.getCurrentRoute()
                        if(this.globalData.pageUrl && this.globalData.pageUrl.search('index/index') == -1){
                            //是否有指定路径
                            console.log(this.globalData.pageUrl)
                            uni.navigateTo({
                                url:'/'+this.globalData.pageUrl
                            });
                            
                        }else{
                            //没有跳转index或者加入服务站
                            console.log(userRes.data.followCommunityId)
                            if( userRes.data && userRes.data.followCommunityId && userRes.data.followCommunityId.length > 3 ){
                                this.globalData.showIndex = true
                                uni.reLaunch({
                                    url:'/pages/index/index?communityid='+userRes.data.followCommunityId
                                });
                            }else{
                                uni.navigateTo({
                                    url:'../serverStation/main'
                                });
                            }
                        }
                    }
                });
            },
            emchatLogin:function(userid){
                var pwd = userid.substring(1,userid.length-1);
                if(this.$conn){
                    this.$conn.open({
                    	apiUrl: this.$im.config.apiURL,
                    	user: userid,
                    	pwd: pwd,
                    	grant_type: "password",
                    	appKey: this.$im.config.appkey
                    });
                }else{
                    var obj = {
                        	apiUrl: 'https://a1.easemob.com',
                            user: userid,
                            pwd: pwd,
                        	grant_type: "password",
                        	appKey: '1184170206115288#mingwo'
                        }
                    WxIM.conn.open(obj);
                }
            },
            getCurrentRoute(){
                let pages = getCurrentPages();
            	let currentPage = pages[pages.length - 1];
                console.log(currentPage)
            	return currentPage.route;
            },            
            onMessage: function(){
                console.log('onMessageonMessageonMessage')
            },
            onMessageError(err){
            	if(err.type === "error"){
            		uni.showToast({
            			title: err.errorText
            		});
            		return false;
            	}
            	return true;
            }
        }
	}
</script>

<style>
    
	/*每个页面公共css */
    button::after{ border: none;} 
    .line{
        width:100%;
        height:2upx;
    }
	page{
		height: 100%;
		background-color: #EFF1F6;
		line-height:1.8;
		font-family:PingFang-SC-Medium,PingFang-SC;
	}
	view{
		line-height:1.8;
        font-family:PingFang-SC-Medium,PingFang-SC;
	}
    text{
        font-family:PingFang-SC-Medium,PingFang-SC;
    }
	.f1{
	    flex:1
	}
	.u-f{
	    display: flex;
	    flex-direction: row;
	}
	.u-f-ac{
	    display: flex;
	    flex-direction: row;
	    align-items:center ;
	}
	.u-f-jsb{
	    display: flex;
	    justify-content: space-between;
	}
	.u-f-jsa{
	    display: flex;
	    justify-content: space-around;
	}
	.u-f-ajc{
	    display: flex;
	    flex-direction: row;
	    align-items:center;
	    justify-content: center;
	}
	.u-column{
	    flex-direction: column;
	}
	.u-row{
	    flex-direction: row;
	}
    .cpt-mask {
        position: fixed;  
        top: 0;  
        left: 0;  
        width: 100%; 
        height: 100%;  
        background-color: #000000;  
        opacity: 0.5;
        z-index: 99;  
    }  
</style>
