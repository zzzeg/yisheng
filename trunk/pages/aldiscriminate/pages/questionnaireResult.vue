<template>
    <view class="content">
        <image v-if="recognizeState != 0" :src="url" mode=""></image>
        <view v-if="recognizeState != 0" style="color: #FFFFFF;font-size:32upx;margin: 20upx 0upx; ">
            {{title}}
        </view>
        <view v-if="recognizeState != 0" @click="clickBtn" class="login-btn">{{btnTitle}}</view>
    </view>
</template>

<script>
    import api from '../../../common/api.js'
    
    export default {
        
    	data() {
    		return {
    			url:'',
                title:'',
                btnTitle:'',
                recognizeState:0,
                report:null
    		}
    	},
    	onLoad() {
            
            this.submitDiscriminate()
    	},
    	methods: {
            clickBtn:function(){
                if(this.recognizeState == 1){       //跳转查看报告
                    uni.removeStorageSync("AlInfo")
                  
                    uni.navigateTo({
                        url:"/pages/index/physicalReport?reportId="+this.report.id +"&reportType=0"
                    })
                }
                if(this.recognizeState == -1){
                    this.submitDiscriminate()
                }
            },
            submitDiscriminate:function(){
				var userinfo = uni.getStorageSync('userinfo')
                var alInfo = uni.getStorageSync('AlInfo');
				alInfo.communityId =  this.$store.getters.communityId;
				alInfo.userId = userinfo.id;
				alInfo.phone =  userinfo.phone;
                api.dialWithQuesTestWithQues({
                    data:alInfo
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        uni.removeStorageSync("AlInfo")
                        this.report = res.data
                        this.recognizeState = 1
                        this.url = '/pages/aldiscriminate/static/img_zfcg.png'
                        this.title = '提交成功'
                        this.btnTitle = '查看报告'
                    }else{
                        this.recognizeState = -1
                        this.url = '/pages/aldiscriminate/static/img_scsb.png'
                        this.title = '提交失败，请再次提交~'
                        this.btnTitle = '再次提交'
                    }
                })
            }
    	}
    }
</script>

<style>
    page{
        background: #008A67;
    }
    .content{
        text-align: center;
    }
    .content image{
        margin-top: 200upx;
        width: 108upx;
        height: 106upx;
        
    }
    .login-btn {
        margin-left: 136upx;
        margin-right: 136upx;
        margin-top: 83upx;
        height: 104upx;
        line-height: 104upx;
        border-radius: 52upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
</style>
