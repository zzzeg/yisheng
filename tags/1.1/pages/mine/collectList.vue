<template>
    <view>
    	<view class="segmented-control">
    		<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#03BE90" @clickItem="onClickItem" />
    	</view>
        <view class="content">
            <view v-if="current === 0">
                <view v-if="serverList && serverList.length > 0" style="padding: 40rpx 0 0 0;">
                	<view class="serverlists" v-for="(item, index) in serverList" :key="index" @click="clickServer(index)" @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)">
                		<view class="disinline" style="margin:10rpx 20rpx 0 0;">
                			<image :src="item.icon" style="width:166rpx; height:166rpx; border-radius: 20rpx;"></image>
                		</view>
                		<view class="disinline" style="width:calc(100% - 200rpx); font-size:20rpx; line-height:28rpx;color:#A2A9BA;">
                			<view class="title" style="color: #434E5E;">{{ item.name }}</view>
                			<view>服务站类型：<text class="color_gre">{{ item.tagPName?item.tagPName:'' }}</text></view>
                			<view class="disinline guanjianame" style="width:calc(100% - 9em); margin-right:20rpx">健康管家：{{item.mangerName?item.mangerName:''}}</view>
                			<view class="disinline">{{item.addr ? item.addr : ''}}</view>
                			<view class="disinline" style="width:calc(100% - 9em); margin-right:20rpx">
                				评价：
                				<image class="disinline" style="width:20rpx; height:20rpx; vertical-align: middle;" :src="item.score && $util.round(item.score) > xi?'../../static/image/img_star_14yellow.png':'../../static/image/img_star_14gray.png'" v-for="xi in 5" :key="xi"></image>
                			</view>
                			<view class="disinline">用户数：{{ item.joinCount }}</view>
                			<view class="color_gre"><view class="xiegang color_gre" v-for="(xx, x) in item.tags" :key="x">{{ xx }}</view></view>
                		</view>
                		<view class="disinline" style="font-size:25rpx; color:#A2A9BA; line-height: 2;">
                			站主：{{item.companyName?item.companyName:''}}
                		</view>
                	</view>
                </view>
				<view class="empty" v-else>
					<image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
					<view class="empty-tips">您还未收藏任何服务站~</view>
				</view>
            </view>
            <view v-if="current === 1" style="padding: 30rpx 36rpx;">
                <view class="u-f h-wrap" v-if="shareList && shareList.length > 0">
                	<block v-for="(item,index) in shareList" :key="index">
                		<h-share-list :item="item" @click="goDetail" @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)"></h-share-list>
                	</block>
                </view>
				<view class="empty" v-else>
					<image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
					<view class="empty-tips">您还未收藏任何管家分享~</view>
				</view>
            </view>
            <view v-if="current === 2">
                <view class="living" v-if="videoList && videoList.length > 0">
                    
                	<view class="box" v-for="(item, index) in videoList" :key="index">
                		<view class="disinline" style="font-weight: 500;" @tap="goInfo(item.id)"  @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)">
                			{{ item.title }}
                		</view>
                		<view class="videos">
                			<view>
                				<video class="myVideo" :src="item.videoUrl" @error="videoErrorCallback" controls></video>
                			</view>
                			<view class="time">{{ item.videoDuration }}</view>
                		</view>
                		<view class="disinline color_gray" style="font-size:24rpx; vertical-align: middle;">
                			{{ '来源：' + item.website }}
                		</view>
                		<view class="disinline color_gray nums">
                			<image src="../../static/image/eyes@2x.png" class="disinline"></image>
                			{{ item.viewNum }}
                		</view>
                		<view style="font-size:24rpx; float:right;">
                			<image src="../../static/image/zan@2x.png" class="disinline zanico" @tap="praiseAdd(item.id, index)" v-if="!item.praiseStatus"></image>
                			<image src="../../static/image/zangreen@2x.png" class="disinline zanico" @tap="praiseCancel(item.id, index)" v-if="item.praiseStatus"></image>
                			<image src="../../static/image/start@2x.png" class="disinline zanico" @tap="videoMarkAdd(item.id, index)" v-if="!item.markStatus"></image>
                			<image src="../../static/image/startgreen@2x.png" class="disinline zanico" @tap="videoMarkCancel(item.id, index)" v-if="item.markStatus"></image>
                			<button open-type="share" :data-item="item" class="disinline zanico"></button>
                		</view>
                	</view>
                </view>
				<view class="empty" v-else>
					<image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
					<view class="empty-tips">您还未收藏任何明医说~</view>
				</view>
            </view>
            <view v-if="current === 3">
                <view class="productBox" v-for="(item, index) in productList" :key="index" @click="clickProduct(item.productId,'community',item.communityId)"   @touchstart='touchstart' @touchend='touchend' @longtap="longtapServer(item,index)">
                    <image :src="item.communityProduct.pic" mode=""></image>
                    <view style="margin-left: 20upx; flex: 1;overflow: hidden; text-overflow: ellipsis; word-break: break-all;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
                        <view style="margin-top: 46upx; font-size: 33upx; color: #16202E;">
                            {{item.communityProduct.name}}
                        </view>
                        <view style="margin-top: 25upx; font-size: 25upx; color: #03BE90;">
                            <text>{{(item.communityProduct.price/item.communityProduct.originalPrice*10)|toFixed2}}折 ￥{{item.communityProduct.price/100|toFixed2}}</text><text style="color: #A0A8BC; margin-left: 40upx;">原价 ￥{{item.communityProduct.originalPrice/100|toFixed2}}</text>
                        </view>
                    </view>
                </view>
				<view class="empty" v-if="!productList || productList.length === 0">
					<image class="empty-img" src="../../static/image/img_zwnr@3x.png"></image>
					<view class="empty-tips">您还未收藏任何健康商品~</view>
				</view>
            </view>
        </view>    
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
        <view v-if="mask" @click="clickMask" class="cpt-mask"></view>
        <view v-if="mask" class="calendarBox">
            <view class="btnBox">
                <view v-if="current === 0" class="gkfxbtn" style="margin-left: 40rpx;margin-right: 46upx" @click="clickJoinBtn">{{joinBtnText}}</view>
                <view class="gkfxbtn" @click="clickMarkBtn" >取消收藏</view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
    export default{
        components: {uniLoadMore},
    	data() {
    		return {
                ismore:false,
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多',
                },
                
                serverList:null,
                shareList:null,
                videoList:null,
                productList:null,
    			items: ['服务站', '管家分享','明医说', '健康商品'],
    			current: 0,
                size:10,
                communityPage:1,
                sharePage:1,
                productPage:1,
                videoPage:1,
                mask:false,
                joinBtnText:'',
                touchT:null,
                touchE:null,
                selectItem:null,
                selectIndex:null
    		};
    	},
    	onLoad(options) {
    		this.getMyCommunity()
            this.getMyShare()
            this.getVideoList()
            this.getProductMarkList()
    	},
        onPullDownRefresh() {
            
            if(this.current == 0){
                this.communityPage = 1
                this.getMyCommunity()
            }else if(this.current == 1){
                this.sharePage = 1
                this.getMyShare()
            }else if(this.current == 2){
                this.videoPage = 1
                this.getVideoList()
            }else if(this.current == 3){
                this.productPage = 1
                this.getProductMarkList()
            }
        },
        onReachBottom() {
            console.log('onReachBottom')
            this.status = 'loading'
            uni.showNavigationBarLoading()
            
            if(this.current == 0){
                this.communityPage++
                this.getMyCommunity()
            }else if(this.current == 1){
                this.sharePage++
                this.getMyShare()
            }else if(this.current == 2){
                this.videoPage++
                this.getVideoList()
            }else if(this.current == 3){
                this.productPage++
                this.getProductMarkList()
            }
            
        },
    	filters: {
    		toFixed2: function(value) {
    			return Number(value).toFixed(2);
    		},
    	},
    	methods: {
            clickMask:function(){
                this.mask = !this.mask
            },
            clickJoinBtn:function(){
                if(this.selectItem.join){
                    this.$api.canceljoincommunity({
                        communityId: this.selectItem.id
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            uni.showToast({
                                title: "取消加入成功",
                                duration: 2000
                            })
                            this.serverList[this.selectIndex].join = false
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }else{
                    this.$api.joincommunity({
                        communityId: this.selectItem.id
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            uni.showToast({
                                title: "加入成功",
                                duration: 2000
                            })
                            this.serverList[this.selectIndex].join = true
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }    
            },
            clickMarkBtn:function(){
                if(this.current === 0){
                    this.$api.cancelCommunityMark({
                        data:{
                            communityId:this.selectItem.id
                        }
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            this.serverList.splice(this.selectIndex,1)
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }
                if(this.current === 1){
                    this.$api.marketMaterialCancelMark({
                        id:this.selectItem.id
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            this.shareList.splice(this.selectIndex,1)
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }
                if(this.current === 2){
                    this.$api.videoMarkCancel({
                        videoId: this.selectItem.id
                    }).then(res=>{
                        console.log(res)
                        if(res.status == 'OK'){
                            this.videoList.splice(this.selectIndex,1)
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }
                if(this.current === 3){
                    this.$api.productMarkDelete({
                    	productId:this.selectItem.id
                    }).then(res=>{
                    	if(res.status=="OK"){
                            this.productList.splice(this.selectIndex,1)
                            this.selectIndex = null
                            this.selectItem = null
                            this.mask = false
                        }
                    })
                }
            },
            touchend:function(){
                this.touchE = new Date().getTime();
            },
            touchstart:function(){
                this.touchT = new Date().getTime();
            },
            longtapServer:function(item,index){
                this.mask = true
                this.joinBtnText = item.join ? '取消加入' : '加入'
                
                this.selectItem = item
                this.selectIndex = index
            },
            
            onClickItem(e) {
            	if (this.current !== e.currentIndex) {
            		this.current = e.currentIndex
            	}
            },
            goDetail({id,type}){
                if(this.touchE-this.touchT<350){
                    if(type=='VIDEO'){
                        uni.navigateTo({
                            url: `/pages/housekeeper-sharing-video/housekeeper-sharing-video?id=${id}`,
                        });
                    }else{
                        uni.navigateTo({
                            url: `/pages/housekeeper-sharing-img/housekeeper-sharing-img?id=${id}`,
                        });
                    }
                }
            },
            goInfo:function(id) {
                if(this.touchE-this.touchT<350){
                    uni.navigateTo({
                    	url: `/pages/liveborad/liveInfo?id=${id}`
                    })
                }
            	
            },
            clickServer:function(index){
                if(this.touchE-this.touchT<350){
                    console.log(this.serverList[index])
                    uni.reLaunch({
                        url:'../index/index?communityid='+this.serverList[index].id
                    })
                }
            },
            clickProduct:function(id,type,communityId){
                if(this.touchE-this.touchT<350){
                    if(communityId){
                    	this.$store.state.communityId = communityId;
                    }
                    uni.navigateTo({
                    	url: `/pages/health-product-detail/health-product-detail?id=${id}&type=${type}`,
                    });
                }
            },
            getMyShare:function(){
                this.$api.findMyShareMark({
                    data:{
                        page:this.sharePage,
                        size:this.size
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status=="OK"){
                        if(this.sharePage == 1){
                            this.shareList = []
                            if(res.list.length>=this.size){
                                console.log('ismoreismoreismore')
                                this.ismore = true
                            }
                        }
                        
                    	this.shareList = this.shareList.concat(res.list) 
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
                })
            },
            getVideoList:function(){
                this.$api.getMarkVideoPage({
                    data:{
                        page:this.videoPage,
                        size:this.size
                    }
                }).then(res=>{
                    if(res.status == 'OK'){
                        if(this.videoPage == 1){
                            this.videoList = []
                            if(res.list.length>=this.size){
                                this.ismore = true
                            }
                        }
                        this.videoList = this.videoList.concat(res.list) 
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
                })
            },
            getProductMarkList:function(){
                this.$api.productMarkList({
                    data:{
                        page:this.productPage,
                        size:this.size
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        if(this.productPage == 1){
                            this.productList = []
                            if(res.list.length>=this.size){
                                console.log('ismoreismoreismore')
                                this.ismore = true
                            }
                        }
                        res.list.forEach(item=>{
                            if(item.communityProduct.icon && JSON.parse(item.communityProduct.icon).length>0){
                               item.communityProduct.pic = JSON.parse(item.communityProduct.icon)[0].url
                            }
                            this.productList.push(item);
                        })
                        
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
                })
            },
            getMyCommunity:function(){
                this.$api.findMyCommunityMark({
                    data:{
                        page:this.communityPage,
                        size:this.size
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status == 'OK'){
                        if(this.communityPage == 1){
                            this.serverList = []
                            if(res.list.length>=this.size){
                                console.log('ismoreismoreismore')
                                this.ismore = true
                            }
                        }
                        res.list.map(item=>{
                        	var update = false;
                        	if(item.province){
                        	    item.addr = item.province.substring(0, item.province.length - 1) 
                        		update = true
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
                            this.serverList .push(item) 
                        })
                        
                    }
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading()
                })
            },
			praiseAdd(id, index) {
				this.$api.praiseAdd({
					videoId: id
				}).then(res=>{
					// this.getMyhvideo()
					this.videoList[index].praiseStatus = !this.videoList[index].praiseStatus
				})
			},
			praiseCancel(id, index) {
				this.$api.praiseCancel({
					videoId: id
				}).then(res=>{
					// this.getMyhvideo()
					this.videoList[index].praiseStatus = !this.videoList[index].praiseStatus
				})
			},
			onShareAppMessage (options) {
				let item = options.target.dataset.item
				return {
					title: item.title,
					path: `pages/liveborad/share?id=${item.id}&communityId=${this.communityId}`,
					imageUrl: item.cover
				}
			},
			videoMarkCancel(id, index) {
				this.$api.videoMarkCancel({
					videoId: id
				}).then(res=>{
					this.videoPage = 1
					this.getVideoList()
				})
			}
        },
    }
</script>

<style scoped lang="scss">
    view{
        line-height: 1.7;
    }
	.empty{
		text-align: center;
		.empty-img{
			margin-top: 52rpx;
			width: 360rpx;
			height: 320rpx;
		}
		.empty-tips{
			color: #A2A9BA;
			font-size: 32rpx;
			line-height: 48rpx;
		}
	}
    .guanjianame{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .segmented-control {
    	background-color: #FFFFFF;
        position:fixed;
        width: 100%;
        height: 90upx;
        top: 0;
        z-index: 99;
    }
    .content{
        margin-top: 110upx;
    }
    .productBox{
        margin: 31upx 33upx 31upx;
        display: flex;
        flex-direction: row;
        background-color: #FFFFFF;
        border-radius:31upx;
    }
    .productBox image{
        width:167upx;
        height:167upx;
        margin: 21upx;
        background: #F8F8F8;
        border-radius: 15upx;
    }
    .segmented-control {
    	background-color: #FFFFFF;
    }
    .xiegang{
    	display:inline-block;vertical-align: middle;
    	&:after{ content: '/'; display:inline-block; }
    	&:last-child:after{ content: '';}
    }
    .disinline{ display:inline-block; vertical-align: top; }
    .serverlists{ height:218upx; padding:30rpx 0rpx 30rpx 26rpx;background:rgba(255,255,255,1);box-shadow:0px 2px 10px 0px rgba(85,112,105,0.1);border-radius:10px; margin: 0 30upx 40rpx 30upx;}
    
    .h-wrap {
    	display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
    	justify-content: space-between;
    }
    .title{ font-size:28rpx; font-weight: 500; }
    .color_gre{ color:#03BE90 }
    .living {
    	overflow: hidden;
    	.box{ background:rgba(255,255,255,1);box-shadow:0px 4rpx 20rpx 0px rgba(85,112,105,0.1);border-radius:20rpx; padding:24rpx;margin:20rpx 0 32rpx 0;
    	overflow: hidden;
    		> .disinline{ font-size:28rpx; line-height:1.8; }
    		.videos{ position: relative; z-index:1;  background:#ddd; margin:20rpx 0;font-size:24rpx; min-height:360rpx;
    			.myVideo{ width:100%; }
    			.time{ position:absolute; color:#fff; bottom:22rpx; right:16rpx; background:rgba(0,0,0,0.3);border-radius:40rpx; padding: 10rpx 20rpx; }
    		 }
    		 .nums{ vertical-align: middle; margin-left:20rpx; 
    			image{ width:40rpx; height:26rpx; vertical-align: middle; margin-bottom:8rpx; }
    		 }
			 button.zanico{ width:36rpx; height:36rpx; margin-left:26rpx; vertical-align: middle;padding: 0; background: url('../../static/image/share@2x.png') no-repeat center / 34rpx 34rpx;}
			 .zanico{ width:36rpx; height:36rpx; margin-left:26rpx; vertical-align: middle; }
    	}
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
