<template>
    <view class="content">
        <image src="../../../static/image/img_scsb.png" mode=""></image>
        <view class="title">
            {{message}}
        </view>
        <view class="ddd">
            请重新拍摄
        </view>
        <button @click="clickCamera" hover-class="button-hover" class="login-btn" >重新拍摄</button>
    </view>
</template>

<script>
    export default {
        
    	data() {
    		return {
    			type:0,
                message:"舌象拍摄不符合标准"
    		}
    	},
    	onLoad(op) {
            this.message = op.msg
    	},
        onUnload() {
            if(this.type==0){
                uni.navigateBack({
                    delta:1
                })
            }
            
        },
    	methods: {
            clickCamera:function(){
                this.type = 1
                uni.navigateBack({
                    delta:2
                })
            }
    	}
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }
    .content{
        text-align: center;
    }
    .content image{
        width: 100upx;
        height: 100upx;
        margin-top: 180upx;
    }
    .title{
        margin-top: 20upx;
        font-size:32upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(42,52,65,1);
        line-height:44upx;
    }
    .ddd{
        margin-top: 12upx;
        font-size:30upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(134,142,157,1);
        line-height:42upx;
    }
    .login-btn{
        margin-top: 80upx;
        height: 80upx;
        width: calc(100% - 300upx);
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
