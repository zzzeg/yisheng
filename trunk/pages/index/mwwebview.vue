<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
    import request from '../../common/request.js'; 
        export default {
            data() {
                return {
                    webviewStyles: {
                        progress: {
                            color: '#FF3333'
                        }
                    },
                    url:'',
                    type:0,
                    rid:null,
					communityId:'',
                }
            },
            onLoad(op) {
                this.type = op.type
                this.rid = op.recordid
				this.communityId = op.communityId
                var token = uni.getStorageSync('sessionId');
                var timestamp = Date.parse(new Date());
                
                if(this.type == 1){
                    this.url = request.reporthost + 'productDetail_v2?token='+token+'&id='+this.rid+'&scale=0.45'+ '&timestamp='+ timestamp
                }else{
                    this.url = request.reportqkyshost + "?timestamp="+ timestamp+ '&sskey='+ token+"&communityId="+this.communityId
                }
                
                
                console.log(this.url)
                
            },
            onShow() {
                
            },
            methods: {
                
            },
            onUnload() {
                
            }
        }
    
</script>

<style>
</style>
