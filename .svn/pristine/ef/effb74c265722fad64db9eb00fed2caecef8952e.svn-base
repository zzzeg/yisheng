<template>
	<view class="cont">
		<view style="text-align: right; background: #fff; line-height: 3; padding:0 40rpx;" @tap="gomain()">
			选择服务站
			<image class="disinline" style="vertical-align: middle; width:16px; height:16px;" src="../../static/image/icon_xyjt@2x.png" mode=""></image>
		</view>
		<view style="margin:30rpx;" v-if="serverList && serverList.length > 0">
			<block v-for="(item, index) in serverList" :key="index" >
				<h-station-list :item='item' :showDefault='true' @clickDefault="clickDefault" @tap="clickServer(index)" @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(index)" ></h-station-list>
			</block>
		</view>
		
		<view style="margin:80rpx 0 0 0; font-size:30rpx; color:#A2A9BA; font-weight: 400; text-align: center;" v-else>
			未搜索到相关服务站
		</view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
        
        <view v-if="mask" @click="clickMask" class="cpt-mask"></view>
        <view v-if="mask" class="calendarBox">
            <view class="btnBox">
                <view class="gkfxbtn" @click="clickMarkBtn" >取消加入</view>
            </view>
        </view>
	</view>
</template>

<script>
	
	import api from '../../common/api.js';
	export default {
		onLoad() {
			this.getserverList()
		},
		data() {
			return {
				serverList: [],
                
                ismore:false,
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多',
                },
                page:1,
                size:10,
                mask:false,
                touchT:null,
                touchE:null,
                selectIndex:null,
			}
		},
        onPullDownRefresh() {
            console.log('onPullDownRefresh')
            this.page = 1
            this.getserverList()
            
        },
        onReachBottom() {
            console.log('onReachBottom')
            this.status = 'loading'
            uni.showNavigationBarLoading()
            
            this.page++
            this.getserverList()
        },
		methods: {
            clickDefault:function(item){
				api.settingDefaultCommunity({
					communityId: item.id
				}).then(res=>{
					this.page = 1
					this.getserverList()
				})
            },
            longtapServer:function(index){
                this.selectIndex = index
                this.mask = true
            },
            clickMask:function(){
                this.mask = !this.mask
            },
            touchend:function(){
                this.touchE = new Date().getTime();
            },
            touchstart:function(){
                this.touchT = new Date().getTime();
            },
            clickServer(index){
                if(this.touchE-this.touchT<350){
                    console.log(this.serverList[index])
                    uni.reLaunch({
                        url:'../index/index?communityid='+this.serverList[index].id
                    })
                }
            },
			getserverList() {
				// 获取服务站列表
				api.getmyjoincommunity().then(res=>{
                    if(res.status == 'OK'){
                        if(this.page == 1){
                            this.serverList = []
                            if(res.list.length>=this.size){
                                console.log('ismoreismoreismore')
                                this.ismore = true
                            }
                        }
                        res.list.map(item=>{
                            var update = false;
                            if(item.province){
                                if(item.province.length>2){
                                    item.addr = item.province.substring(0, 2)
                                    update = true
                                }else{
                                    item.addr = item.province
                                    update = true
                                }
                            }
                            if(item.city){
                                item.addr = item.addr  + ' | ' + item.city.substring(0,item.city.length - 1)
                                   update = true
                            }
                            if(!update){
                                item.addr = ''
                            }
                            if(item.icon && JSON.parse(item.icon ).length > 0){
                                item.icon = JSON.parse(item.icon)[0].url
                            }
                            if(item.score){
                                item.score = Math.round(item.score)
                            }
                            this.serverList.push(item);
                        })
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
				})	
			},
			clickMarkBtn:function() {
                var item = this.serverList[this.selectIndex]
				api.canceljoincommunity({
					communityId: item.id 
				}).then(res=>{
                    this.mask = false
					this.getserverList()
				})
			},
			gomain: function () {
				uni.navigateTo({
					url: `/pages/serverStation/main`
				})
			},
			join(id) {
				api.joincommunity({
					communityId: id
				}).then(res=>{
					this.getserverList()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
    view{
        line-height: 1.7;
    }
	
	.cont{ background:rgba(239,241,246,1); height: 100vh;overflow: auto;box-sizing: border-box; }
	
	.btn{background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%); border-radius:40rpx; color:#fff; }

    .guanjianame{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
    .gkfxbtn{
        width:197upx;
        height:67upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
        border-radius:33upx;
        line-height: 67upx;
        text-align: center;
        color: #FFFFFF;
        // margin-right: 46upx;
    }
    .btnBox{
        display: flex;
        align-items: flex-start;
        margin: 23upx 33upx;
        width: calc(100% - 66upx);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 130rpx;
    }
    .calendarBox{
        background: #FFFFFF;
        opacity: 1;
        position:fixed;
        top: 25%;
        left: 94upx;
        height: 313upx;
        width: calc(100% - 188upx);
        z-index: 100;  
        border-radius: 30upx;
        color: #6D7480;
        font-size: 30upx;
    }
</style>
